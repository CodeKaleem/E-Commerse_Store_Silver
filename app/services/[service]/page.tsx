"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import Navbar from "@/components/nav/navbar";
import { submitInquiry } from "@/app/actions/inquiry";

const SERVICE_TITLES: Record<string, string> = {
  custom: "Custom Design",
  repair: "Jewelry Repair",
  gifts: "Gift Wrapping",
  engraving: "Engraving",
};

export default function ServiceInquiryPage() {
  const params = useParams();
  const rawService = params.service as string;
  const serviceName = SERVICE_TITLES[rawService] || "General Inquiry";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("service", serviceName); // force the route service

    const result = await submitInquiry(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setErrorMsg(result.error || "Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen pt-20">
        {/* Left Side: Aesthetics */}
        <div className="relative w-full md:w-1/2 min-h-[30vh] md:min-h-full overflow-hidden border-r border-[#D4AF37]/20 hidden md:block">
           <Image
            src="https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&q=80"
            alt="Service Aesthetics"
            fill
            className="object-cover opacity-60 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-12 bottom-24">
             <h1 className="text-5xl font-bold uppercase tracking-tighter mb-2">{serviceName}</h1>
             <div className="h-1 w-24 bg-[#D4AF37] mb-4" />
             <p className="text-white/70 max-w-sm text-sm leading-relaxed">
               Allow our master silversmiths to assist you with your personalized {serviceName.toLowerCase()} requirements. We ensure precision and certified quality.
             </p>
          </div>
        </div>

        {/* Right Side: Shared Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
            
            <div className="mb-12 md:hidden">
               <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">{serviceName}</h1>
               <div className="h-1 w-24 bg-[#D4AF37]" />
            </div>

            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">Service Request</h2>
            <p className="text-white/60 text-sm mb-8">
              Fill out the form below. Our dedicated team will review your request and get back to you promptly.
            </p>

            {success ? (
               <div className="bg-[#D4AF37]/10 border border-[#D4AF37] rounded-2xl p-8 text-center">
                 <h3 className="text-[#D4AF37] text-xl font-bold mb-2 uppercase tracking-wide">Request Received</h3>
                 <p className="text-white/70 text-sm">Thank you. We have received your inquiry for <strong>{serviceName}</strong>. Our team will contact you shortly.</p>
                 <button onClick={() => setSuccess(false)} className="mt-6 text-xs text-[#D4AF37] uppercase tracking-widest hover:underline">Submit another request</button>
               </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input type="text" name="name" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input type="email" name="email" required placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                        </div>
                        <div className="relative flex-1">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input type="tel" name="phone" placeholder="Phone (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                        </div>
                    </div>

                    <div className="relative">
                       <MessageSquare className="absolute left-4 top-6 text-white/30" size={18} />
                       <textarea name="message" required rows={5} placeholder={`Please describe your ${serviceName.toLowerCase()} requirements in detail...`} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"></textarea>
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
}
