"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

import NavDropdown from "./NavDropdown";
import SearchSheet from "./SearchSheet";
import MobileMenu from "./MobileMenu";
import type { NavLink } from "./types";


const logoText = "LARAIB SILVER'S";


export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["About"]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const cartCount = useCartStore((state) => state.getItemCount());

  const handleOpenChange = (title: string, isOpen: boolean) => setOpenDropdown(isOpen ? title : openDropdown === title ? null : openDropdown);

  const filters = [
    "Silver",
    "Gold",
    "Rings",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "New Arrivals",
    "Best Sellers",
    "About Us",
  ];


  const navDropdowns: { title: string; links: NavLink[] }[] = [
    {
      title: "Categories",
      links: [
        { title: "Rings", href: "/?cat=Rings" },
        { title: "Necklaces", href: "/?cat=Necklaces" },
        { title: "Earrings", href: "/?cat=Earrings" },
        { title: "Bracelets", href: "/?cat=Bracelets" },
        { title: "Show All", href: "/", showAll: true },
      ],
    },
    {
      title: "Services",
      links: [
        { title: "Custom Design", href: "/services/custom" },
        { title: "Jewelry Repair", href: "/services/repair" },
        { title: "Gift Wrapping", href: "/services/gifts" },
        { title: "Engraving", href: "/services/engraving" },
        { title: "About us", href: "/about" },
        { title: "Show all", href: "/services", showAll: true },
      ],
    },
  ];



  const onToggleFilter = (filter: string) =>
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));

  const onSearch = (query: string, filters: string[]) => {
    // TODO: wire your search route
    console.log("Searching for:", query, "in filters:", filters);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Navbar */}
      <div className="flex lg:hidden bg-black/80 backdrop-blur-xl w-full px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5 justify-between items-center">
        <Link href="/" className="flex flex-col items-start">
          <span className="text-xl font-bold tracking-tighter text-white leading-none">{logoText}</span>
        </Link>

        <div className="flex gap-2 items-center">
          {/* Mobile Search (reuse SearchSheet trigger) */}
          <SearchSheet
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            filters={filters}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
            onSearch={onSearch}
          />
          {/* Mobile Menu */}
          <MobileMenu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex px-4 py-3 justify-between items-center mt-4">
        {/* Search */}
        <SearchSheet
          isOpen={isSearchOpen}
          onOpenChange={setIsSearchOpen}
          filters={filters}
          selectedFilters={selectedFilters}
          onToggleFilter={onToggleFilter}
          onSearch={onSearch}
        />

        {/* Center group */}
        <div className="bg-black/90 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.15)] px-8 py-3 flex items-center space-x-12 border border-[#D4AF37]/30">
          <Link href="/about" className="text-white hover:text-[#D4AF37] transition-all font-semibold tracking-wide uppercase text-sm">
            About
          </Link>

          {navDropdowns.slice(0, 1).map((dropdown) => (
            <NavDropdown
              key={dropdown.title}
              {...dropdown}
              isOpen={openDropdown === dropdown.title}
              onOpenChange={(isOpen) => handleOpenChange(dropdown.title, isOpen)}
            />
          ))}

          {/* Center logo */}
          <Link href="/" className="hover:scale-105 transition-transform flex flex-col items-center px-6 border-x border-[#D4AF37]/20">
            <span className="text-2xl font-bold tracking-tighter text-white">{logoText}</span>
          </Link>

          {navDropdowns.slice(1).map((dropdown) => (
            <NavDropdown
              key={dropdown.title}
              {...dropdown}
              isOpen={openDropdown === dropdown.title}
              onOpenChange={(isOpen) => handleOpenChange(dropdown.title, isOpen)}
            />
          ))}

          <Link href="/contact" className="text-white hover:text-[#D4AF37] transition-all font-semibold tracking-wide uppercase text-sm">
            Contact
          </Link>
        </div>

        <Link href="/cart" className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 hover:bg-white transition-all shadow-lg text-sm tracking-widest shadow-[#D4AF37]/20 flex items-center space-x-2" >
          <ShoppingCart size={18} />
          <span>CART {mounted && cartCount > 0 ? `(${cartCount})` : ""}</span>
        </Link>


      </div>
    </nav>
  );
}

