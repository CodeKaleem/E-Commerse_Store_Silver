"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Edit, Plus, ArrowLeft, Package, LogOut } from "lucide-react";
import { logout } from "../actions";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this exquisite piece from the collection?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
    else alert("Error deleting product");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 bg-[radial-gradient(circle_at_top_right,#111,#000)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="text-[#D4AF37]" size={24} />
              <h1 className="text-4xl font-bold tracking-tighter uppercase">Vault Management</h1>
            </div>
            <p className="text-slate-500 font-medium tracking-widest text-[10px] uppercase">LARAIB SILVER'S &mdash; MASTER COLLECTION</p>
          </div>
          
          <div className="flex gap-4">
            <Link href="/admin/products/new">
              <Button className="bg-[#D4AF37] text-black font-bold px-6 h-12 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center gap-2">
                <Plus size={20} /> ADD PIECE
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Accessing Records...</p>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/5 bg-white/[0.02]">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Masterpiece</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Collection</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Value</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Inventory Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                            <img src={p.image_url} alt={p.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">{p.title}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">ID: {p.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-white/5 text-slate-300 text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/5 shadow-inner">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-serif text-xl text-white">${p.price}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/products/${p.id}/edit`}>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl">
                              <Edit size={18} />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteProduct(p.id)}
                            className="text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="py-32 text-center">
                  <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">The vault is currently empty.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
