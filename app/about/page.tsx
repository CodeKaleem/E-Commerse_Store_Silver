"use client";

import Image from "next/image";
import { Star, ShieldCheck, Gem, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/nav/navbar";
import Link from "next/link";
import HeroTransition from "@/components/HeroTransition";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <HeroTransition />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&q=80"
            alt="Silversmith crafting jewelry"
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-6 drop-shadow-2xl">
            A Legacy of <br />
            <span className="text-[#D4AF37]">Purity & Craft</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
          <p className="text-sm md:text-lg text-white/80 font-light tracking-wide uppercase">
            Master Silversmiths • Established 2014
          </p>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="relative z-20 -mt-12 md:-mt-16 px-4 max-w-6xl mx-auto">
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 justify-around items-center backdrop-blur-xl">
          <div className="text-center group">
            <h4 className="text-[#D4AF37] font-bold text-4xl md:text-5xl tracking-tighter mb-2 group-hover:scale-105 transition-transform">10+</h4>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400">Years Experience</p>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block"></div>
          <div className="text-center group">
            <h4 className="text-[#D4AF37] font-bold text-4xl md:text-5xl tracking-tighter mb-2 group-hover:scale-105 transition-transform">10k+</h4>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400">Clients Worldwide</p>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block"></div>
          <div className="text-center group">
            <h4 className="text-[#D4AF37] font-bold text-4xl md:text-5xl tracking-tighter mb-2 group-hover:scale-105 transition-transform">100%</h4>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400">Certified Authentic</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-700" />
            <Image 
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80"
              alt="Premium silver necklace"
              width={600}
              height={800}
              className="rounded-3xl border border-white/5 shadow-2xl relative z-10"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Heritage</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase leading-tight">Forged with <br/>Uncompromising Quality</h2>
            </div>
            
            <div className="space-y-4 text-white/70 leading-relaxed font-light text-sm md:text-base">
              <p>
                Founded over a decade ago, Laraib Silver's was built on a singular vision: to preserve the ancient art of silversmithing while bringing it into the modern era of luxury jewelry. 
              </p>
              <p>
                Every piece in our collection is painstakingly crafted by master artisans who have dedicated their lives to the trade. We do not mass-produce; we create heirlooms. From the initial sketch to the final polish, our process ensures that every angle reflects perfection.
              </p>
              <p>
                We exclusively source ethically mined, premium-grade pure silver and gold. Our strict quality control means you are wearing certified, authentic masterpiece that will stand the test of time.
              </p>
            </div>
            
            <Link href="/contact" className="inline-flex items-center gap-2 group text-[#D4AF37] font-bold text-xs uppercase tracking-widest mt-4">
              Speak with an Artisan 
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">The Laraib Promise</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto font-light">
              We understand that buying fine jewelry is an investment of trust. We honor that trust with unyielding guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#030303] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-colors group">
              <ShieldCheck className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Lifetime Warranty</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                We stand strictly behind the quality of our craftsmanship. Every piece comes with a comprehensive lifetime warranty against any manufacturing defects.
              </p>
            </div>
            
            <div className="bg-[#030303] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-colors group">
              <Gem className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Certified Purity</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                All metals and stones used are laboratory tested and fully certified. You receive a verifiable authenticity certificate with every purchase.
              </p>
            </div>

            <div className="bg-[#030303] border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-colors group">
              <Award className="text-[#D4AF37] mb-6" size={40} />
              <h3 className="text-lg font-bold uppercase tracking-widest mb-3">Master Artisans</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                We employ only generation-trained silversmiths. The intricate detailing on our rings and necklaces simply cannot be replicated by machinery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">Voices of Trust</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Client Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Review 1 */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl relative">
            <div className="flex gap-1 mb-6 text-[#D4AF37]">
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
            </div>
            <p className="text-white/80 italic font-light leading-relaxed mb-6">
              "Laraib Silver's designed my custom engagement ring. Over the last 10 years, I've bought jewelry from everywhere, but the sheer weight and perfection of the silver here is completely unmatched. They have earned a customer for life."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm">SA</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Sarah Ahmed</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl relative">
            <div className="flex gap-1 mb-6 text-[#D4AF37]">
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
               <Star size={14} fill="currentColor" />
            </div>
            <p className="text-white/80 italic font-light leading-relaxed mb-6">
              "I ordered a vintage heritage necklace for my anniversary. Not only was the packaging exquisite, but the certificate of authenticity gave me absolute peace of mind. Truly a premium traditional boutique."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm">HR</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Hassan Raza</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
