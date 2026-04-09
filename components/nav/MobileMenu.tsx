"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Info, ShoppingBag, Diamond, Sparkles, Heart, Mail, Rocket } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenu({ isOpen, onOpenChange }: Props) {
  const menuItems = [
    { title: "Rings", icon: <Diamond size={18} />, href: "/?cat=Rings" },
    { title: "Necklaces", icon: <Sparkles size={18} />, href: "/?cat=Necklaces" },
    { title: "Earrings", icon: <Heart size={18} />, href: "/?cat=Earrings" },
    { title: "Bracelets", icon: <ShoppingBag size={18} />, href: "/?cat=Bracelets" },
    { title: "Our Story", icon: <Info size={18} />, href: "/about" },
    { title: "Contact", icon: <Mail size={18} />, href: "/contact" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#D4AF37] hover:bg-[#D4AF37]/10">
          <Menu className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-black border-l border-[#D4AF37]/20 text-white">
        <div className="p-8 border-b border-[#D4AF37]/10">
          <SheetTitle className="text-2xl font-bold tracking-tighter text-white mb-1 uppercase">LARAIB SILVER'S</SheetTitle>
        </div>
        
        <div className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-white/80 hover:text-[#D4AF37] hover:bg-white/5 transition-all group"
                  onClick={() => onOpenChange(false)}
                >
                  <span className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">{item.icon}</span>
                  <span className="text-base font-bold uppercase tracking-widest">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link href="/shop" onClick={() => onOpenChange(false)}>
              <Button className="w-full h-16 bg-[#D4AF37] text-black font-bold text-lg tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}