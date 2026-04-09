"use server";

import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "YOUR_API_KEY_HERE");

export async function submitInquiry(formData: FormData) {
  try {
    const customer_name = formData.get("name") as string;
    const customer_email = formData.get("email") as string;
    const customer_phone = formData.get("phone") as string;
    const service_type = formData.get("service") as string;
    const message = formData.get("message") as string;

    if (!customer_name || !customer_email || !message || !service_type) {
      return { success: false, error: "Missing required fields." };
    }

    // 1. Insert into Supabase
    const { error: dbError } = await supabase
      .from("service_inquiries")
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          service_type,
          message,
          status: "pending",
        },
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return { success: false, error: "Failed to save inquiry to database." };
    }

    // 2. Send Email via Resend to Admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Laraib Silvers <onboarding@resend.dev>", // Change this when domain is verified
          to: ["admin@laraibsilver.com"], // Change this to your admin email
          subject: `New Service Inquiry: ${service_type}`,
          html: `
            <h2>New Inquiry Received</h2>
            <p><strong>Service:</strong> ${service_type}</p>
            <p><strong>Name:</strong> ${customer_name}</p>
            <p><strong>Email:</strong> ${customer_email}</p>
            <p><strong>Phone:</strong> ${customer_phone || "Not provided"}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        // We still return success: true because the DB save worked
        console.error("Resend Email Error:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not found. Email notification skipped.");
    }

    return { success: true };
  } catch (err: any) {
    console.error("Inquiry Submission Error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
