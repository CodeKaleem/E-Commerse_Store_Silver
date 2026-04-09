"use client";

import Image from "next/image";
import { Mail, Instagram, Phone, MapPin, MessageCircle } from "lucide-react";
import Navbar from "@/components/nav/navbar";

export default function ContactPage() {
  const logoText = "LARAIB SILVER'S";

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <Navbar />

      <div className="flex flex-col md:flex-row flex-grow pt-20">
        {/* Left side - Branded Image */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-[calc(100vh-80px)] group overflow-hidden border-b md:border-b-0 md:border-r border-[#D4AF37]/10">
          <Image
            src="https://images.unsplash.com/photo-1543204938-27b311fc6611?auto=format&fit=crop&q=80"
            alt="Laraib Silver's Premium Boutique"
            fill
            className="object-cover transition-transform duration-[5s] ease-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20" />
          <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white uppercase mb-4 opacity-90 drop-shadow-2xl">The Boutique</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>
        </div>

        {/* Right side - Contact info */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-24 flex flex-col justify-center relative bg-[#030303]">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-bold uppercase tracking-[0.3em] mb-12 text-slate-500">
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <span className="mx-3 text-white/20">/</span>
            <span className="text-[#D4AF37]">Contact Us</span>
          </nav>

          {/* Branding */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-2">{logoText}</h1>
            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-1 shadow-[#D4AF37]/50 drop-shadow-sm">Artisanal Silver Mastery</p>
            <p className="mt-4 text-white/60 leading-relaxed max-w-md text-sm">
                Reach out to us to craft your bespoke silver piece or to inquire about our curated premium collection.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="space-y-10 max-w-md">
            {/* Address */}
            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] flex items-center justify-center border border-white/5 group-hover:border-[#D4AF37]/30 transition-all duration-300">
                  <MapPin className="text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity" size={20} />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 group-hover:text-slate-400 transition-colors">Flagship Location</h3>
                <p className="text-base font-light text-white/90 leading-relaxed">
                  Signature Square, Boutique 7A<br />
                  LMK Road, Karachi, Pakistan
                </p>
              </div>
            </div>

            {/* Connect */}
            <div className="flex gap-6 items-start group">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] flex items-center justify-center border border-white/5 group-hover:border-[#D4AF37]/30 transition-all duration-300">
                  <Phone className="text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity" size={20} />
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 group-hover:text-slate-400 transition-colors">Direct Line</h3>
                <p className="text-base font-light text-white/90">+92 300 1234567</p>
                <p className="text-sm text-slate-500 mt-1">Mon-Sat, 10am - 8pm</p>
              </div>
            </div>

            {/* Socials / Links */}
            <div className="pt-8 flex gap-4">
                <a
                  href="mailto:info@laraibsilver.com"
                  className="flex-1 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300 group shadow-lg"
                >
                  <Mail size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Email Us</span>
                </a>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 group shadow-lg"
                >
                  <MessageCircle size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
                </a>
            </div>

            <div className="pt-10 mt-6 border-t border-white/5 flex justify-between items-center">
               <p className="text-[9px] font-bold text-[#aaaaaa] uppercase tracking-widest leading-loose">
                 © {new Date().getFullYear()} LARAIB SILVER'S<br />
                 Certified Purity.
               </p>
               <div className="flex gap-4">
                   <Instagram className="text-slate-500 hover:text-[#D4AF37] cursor-pointer transition-colors duration-300" size={20} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
