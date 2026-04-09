"use server";

import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "YOUR_API_KEY_HERE");

export async function submitOrder(formData: FormData, cartItems: any[], totalAmount: number) {
  try {
    const customer_name = formData.get("name") as string;
    const customer_email = formData.get("email") as string;
    const customer_phone = formData.get("phone") as string;
    const shipping_address = formData.get("address") as string;

    if (!customer_name || !customer_email || !shipping_address || !cartItems.length) {
      return { success: false, error: "Missing required details or empty cart." };
    }

    // Insert Order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          shipping_address,
          total_amount: totalAmount,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError || !orderData) {
      console.error(orderError);
      return { success: false, error: "Failed to place order." };
    }

    const orderId = orderData.id;

    // Insert Items
    const itemsToInsert = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      product_title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
    
    if (itemsError) {
      console.error(itemsError);
    }

    // Try notify via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Laraib Silvers Orders <onboarding@resend.dev>",
          to: ["admin@laraibsilver.com"],
          subject: `New Store Order Details - ${customer_name}`,
          html: `
            <h2>New Order Placed (${totalAmount}$)</h2>
            <p><strong>Name:</strong> ${customer_name}</p>
            <p><strong>Email:</strong> ${customer_email}</p>
            <p><strong>Phone:</strong> ${customer_phone}</p>
            <p><strong>Address:</strong> ${shipping_address}</p>
            <h3>Cart Items:</h3>
            <ul>
              ${cartItems.map((i) => `<li>${i.quantity}x ${i.title} ($${i.price})</li>`).join("")}
            </ul>
          `,
        });
      } catch (err) {
        console.error("Resend error:", err);
      }
    }

    return { success: true, orderId };
  } catch (err) {
    console.error("Order error:", err);
    return { success: false, error: "Unexpected error placing order." };
  }
}
