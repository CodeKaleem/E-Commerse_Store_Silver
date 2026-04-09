import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY || "YOUR_API_KEY");

export async function POST(req: Request) {
  try {
    const { id, customer_email, subject, message } = await req.json();

    if (!id || !customer_email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let emailSent = false;
    
    if (process.env.RESEND_API_KEY) {
       try {
         await resend.emails.send({
            from: "Laraib Silvers <onboarding@resend.dev>", // replace with verified domain
            to: [customer_email],
            subject: subject || "Reply regarding your Service Inquiry",
            html: `<div style="font-family:sans-serif;color:#333;">${message.replace(/\n/g, '<br/>')}</div>`,
         });
         emailSent = true;
       } catch (err) {
         console.error("Resend send error:", err);
         return NextResponse.json({ error: "Failed to send email via Resend" }, { status: 500 });
       }
    } else {
       console.warn("No RESEND_API_KEY. Simulated send.");
    }

    // Update DB
    const { error: dbError } = await supabase
      .from("service_inquiries")
      .update({ status: "replied" })
      .eq("id", id);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, emailSent });
  } catch (error: any) {
    console.error("Reply API Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
