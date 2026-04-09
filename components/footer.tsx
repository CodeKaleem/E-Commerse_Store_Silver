import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer
    className="relative bg-black border-t border-[#D4AF37]/20 pt-16 pb-24 overflow-hidden"
  >
    {/* Decorative background element */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

    <div className="max-w-[1440px] px-12 mx-auto w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-bold tracking-tighter text-white">LARAIB SILVER'S</span>
          </Link>
          <p className="text-slate-400 max-w-sm text-sm leading-relaxed font-medium">
            Exquisite silver and gold jewelry handcrafted for those who appreciate the finer details of artisanal craftsmanship. Elevating your style since 1998.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h4 className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.3em]">Collections</h4>
          <nav className="flex flex-col gap-3">
            <Link href="/?cat=Signature" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Signature Silver</Link>
            <Link href="/?cat=Vintage" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Vintage Heritage</Link>
            <Link href="/?cat=Modern" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Modern Minimalist</Link>
            <Link href="/?cat=Bridal" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Bridal Suite</Link>
          </nav>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h4 className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.3em]">Customer Care</h4>
          <nav className="flex flex-col gap-3">
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Our Story</Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Contact Us</Link>
            <Link href="/shipping" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Shipping & Returns</Link>
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
          </nav>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} LARAIB SILVER'S &mdash; ALL RIGHTS RESERVED
        </div>
        <div className="flex gap-8">
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">Instagram</span>
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">Facebook</span>
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">WhatsApp</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;