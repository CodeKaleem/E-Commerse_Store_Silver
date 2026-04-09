"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: string[];
  selectedFilters: string[];
  onToggleFilter: (filter: string) => void;
  onSearch: (query: string, filters: string[]) => void;
}

export default function SearchSheet({ isOpen, onOpenChange, filters, selectedFilters, onToggleFilter, onSearch }: Props) {
  const [q, setQ] = useState("");

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="bg-black text-[#D4AF37] rounded-xl w-[120px] px-4 py-2 shadow-[0_0_20px_rgba(212,175,55,0.1)] border border-[#D4AF37]/30 hover:scale-105 transition-all h-14 hover:bg-[#111]">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full sm:w-96 p-0 bg-black border-[#D4AF37]/20 text-white">
        <SheetTitle>
          <VisuallyHidden>Search</VisuallyHidden>
        </SheetTitle>
        <div className="flex items-center gap-3 p-6 border-b border-[#D4AF37]/20">
          <Search className="h-5 w-5 text-[#D4AF37]" />
          <span className="text-lg font-bold tracking-widest text-white uppercase">Vault Search</span>
        </div>

        <div className="p-6 space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(q, selectedFilters);
            }}
          >
            <Input
              placeholder="Finding a masterpiece..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-[#111] border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-xl"
            />
          </form>

          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Explore Categories</h4>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFilter(filter)}
                  className={`text-[10px] px-4 py-1.5 rounded-full border transition-all uppercase tracking-widest ${
                    selectedFilters.includes(filter)
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                      : "border-white/10 text-white/60 hover:border-[#D4AF37]/50 hover:text-white"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>


          {selectedFilters.length > 0 && (
            <div>
              <h5 className="text-[10px] font-bold text-slate-600 mb-2 uppercase tracking-widest">Active Filters ({selectedFilters.length}):</h5>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <span key={filter} className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold rounded-full border border-[#D4AF37]/20 uppercase tracking-widest">
                    {filter}
                    <button onClick={() => onToggleFilter(filter)} className="hover:scale-125 transition-transform">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}