"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, X, Image as ImageIcon, Box } from "lucide-react";
import Link from "next/link";

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "Rings",
    price: "",
    image_url: "",
    badge: "",
    rotation_images: "",
  });

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/admin-login");
    }
    checkAuth();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const rotation_array = formData.rotation_images
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const { error } = await supabase.from("products").insert([
      {
        ...formData,
        price: parseFloat(formData.price),
        rotation_images: rotation_array,
      },
    ]);

    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 bg-[radial-gradient(circle_at_top_right,#111,#000)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-xl">
                <ArrowLeft size={24} />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Add New Masterpiece</h1>
              <p className="text-slate-500 font-medium tracking-widest text-[10px] uppercase">ENROLLING IN THE MASTER COLLECTION</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/5">
             <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <Box className="text-[#D4AF37]" size={20} />
             </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Exquisite Title</label>
                <Input 
                  required 
                  placeholder="e.g. Signature Solitaire" 
                  className="bg-black border-white/10 text-white h-14 rounded-2xl focus:border-[#D4AF37] focus:ring-[#D4AF37] shadow-inner"
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Material Signature</label>
                <Input 
                  placeholder="e.g. 925 Sterling Silver" 
                  className="bg-black border-white/10 text-white h-14 rounded-2xl focus:border-white/20 focus:ring-slate-800"
                  value={formData.subtitle} 
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">About the Piece</label>
                <Textarea 
                  placeholder="The story behind the creation..." 
                  rows={5}
                  className="bg-black border-white/10 text-white rounded-2xl focus:border-[#D4AF37] focus:ring-[#D4AF37] resize-none"
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    className="w-full h-14 px-4 bg-black border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-inner font-bold text-sm tracking-widest uppercase transition-all"
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                  >
                    <option className="bg-black">Rings</option>
                    <option className="bg-black">Necklaces</option>
                    <option className="bg-black">Bracelets</option>
                    <option className="bg-black">Earrings</option>
                    <option className="bg-black">Custom Pieces</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Investment ($)</label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    required 
                    placeholder="0.00" 
                    className="bg-black border-white/10 text-white h-14 rounded-2xl text-xl font-serif"
                    value={formData.price} 
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Exclusive Badge</label>
                <Input 
                  placeholder="e.g. LIMITED or RARE" 
                  className="bg-black border-white/10 text-white h-14 rounded-2xl tracking-[0.2em] font-bold uppercase placeholder:tracking-normal"
                  value={formData.badge} 
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <ImageIcon size={12} /> Master Image URL
                </label>
                <Input 
                  required 
                  placeholder="https://..." 
                  className="bg-black border-white/10 text-slate-400 h-14 rounded-2xl font-mono text-xs"
                  value={formData.image_url} 
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} 
                />
              </div>
            </div>
          </div>

          <div className="p-10 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-xl space-y-4">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Box size={12} /> 360 Degree View Frames (Comma separated URLs)
             </label>
             <Textarea 
                placeholder="https://img1.jpg, https://img2.jpg, ..." 
                rows={3}
                className="bg-black border-white/10 text-slate-500 rounded-2xl font-mono text-xs focus:text-white"
                value={formData.rotation_images} 
                onChange={(e) => setFormData({ ...formData, rotation_images: e.target.value })} 
             />
             <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic flex items-center gap-2">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full" /> Requires at least 24 frames for smooth rotation.
             </p>
          </div>

          <div className="flex gap-6 pt-4">
            <Button 
              disabled={loading} 
              type="submit" 
              className="flex-1 bg-[#D4AF37] text-black h-16 rounded-2xl text-lg font-bold shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Save size={20} /> {loading ? "ENROLLING..." : "PUBLISH TO THE VAULT"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/admin")} 
              className="px-10 h-16 border-white/5 bg-white/5 text-slate-400 font-bold tracking-widest uppercase hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all flex items-center gap-2"
            >
              <X size={20} /> ABORT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
