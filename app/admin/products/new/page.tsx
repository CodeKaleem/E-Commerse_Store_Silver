"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Loader2, Gem } from "lucide-react";

const CATEGORIES = ["Rings", "Necklaces", "Earrings", "Bracelets", "Custom Pieces"];
const BADGES = ["NEW", "POPULAR", "FEATURED", "BEST SELLER", "TRENDING", "LIMITED", "CUSTOM"];

export default function AddNewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: CATEGORIES[0],
    description: "",
    image_url: "",
    badge: BADGES[0],
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.price || !form.image_url) {
      setError("Title, Price, and Image URL are required.");
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase.from("products").insert([
      {
        title: form.title,
        subtitle: form.subtitle || form.category,
        category: form.category,
        description: form.description,
        image_url: form.image_url,
        badge: form.badge,
        price: parseFloat(form.price),
      },
    ]);

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push("/admin/products");
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-slate-600";
  const labelClass = "block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Gem className="text-[#D4AF37]" size={20} />
            <h1 className="text-2xl font-bold tracking-tighter uppercase">Add New Piece</h1>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Expand the Laraib Silver's Collection
          </p>
        </div>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className={labelClass}>Piece Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Sterling Silver Zenith Ring"
            className={inputClass}
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className={labelClass}>Subtitle</label>
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="e.g. Rings (defaults to Category if blank)"
            className={inputClass}
          />
        </div>

        {/* Category + Badge row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Badge</label>
            <select
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className={inputClass}
            >
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className={labelClass}>Price (USD) *</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 129.00"
            className={inputClass}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className={labelClass}>Image URL *</label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className={inputClass}
            required
          />
          {form.image_url && (
            <div className="mt-3 w-20 h-20 rounded-xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image_url}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="A brief description of this piece..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm tracking-widest uppercase"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Adding to Vault...</>
          ) : (
            <><Plus size={16} /> Add to Collection</>
          )}
        </button>
      </form>
    </div>
  );
}
