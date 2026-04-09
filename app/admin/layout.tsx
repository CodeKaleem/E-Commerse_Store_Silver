"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, MessageSquare, Package, LogOut, Code, Compass, HeartHandshake } from "lucide-react";
import { logout } from "./actions";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Orders Desk", href: "/admin/orders", icon: ShoppingBag },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Products Vault", href: "/admin/products", icon: Package },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-bold tracking-[0.2em] text-white uppercase flex items-center gap-2">
              Laraib
              <span className="text-[#D4AF37] font-light text-xs tracking-widest block mt-1">Admin</span>
            </h1>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] font-bold shadow-[inset_2px_0_0_#D4AF37]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm tracking-widest uppercase">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors tracking-widest uppercase font-bold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#0a0a0a] to-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
