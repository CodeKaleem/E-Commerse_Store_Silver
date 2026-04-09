"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownProps } from "./types";

const menuVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.14 } },
};

export default function NavDropdown({ title, links, isOpen, onOpenChange }: DropdownProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-[#D4AF37] transition-colors font-semibold tracking-wide uppercase text-sm cursor-pointer outline-none">
        {title} <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="start"
            sideOffset={14}
            className="w-52 p-0 border-none rounded-xl shadow-2xl overflow-visible bg-transparent"
            asChild
            forceMount
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden rounded-xl"
              style={{ background: "#ffffff", boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)" }}
            >
              {/* Category header */}
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gray-400">
                  {title}
                </p>
              </div>

              {/* Links */}
              <div className="p-2">
                {links.map((link) => (
                  <DropdownMenuItem key={link.title} className="p-0 focus:bg-transparent">
                    {link.showAll ? (
                      <Link
                        href={link.href}
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-2 w-full py-2.5 px-3 mt-1 rounded-lg text-[#B8960C] font-bold text-sm border-t border-gray-100 hover:bg-amber-50 transition-all duration-150"
                      >
                        <span className="text-[10px] leading-none">▶</span>
                        {link.title}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => onOpenChange(false)}
                        className="block w-full py-2.5 px-3 rounded-lg text-gray-800 font-medium text-sm hover:text-[#B8960C] hover:bg-gray-50 transition-all duration-150"
                      >
                        {link.title}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}