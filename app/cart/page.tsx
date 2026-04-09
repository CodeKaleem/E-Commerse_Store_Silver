"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/nav/navbar";
import { useCartStore } from "@/lib/store";
import { submitOrder } from "@/app/actions/order";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const total = getTotal();

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const result = await submitOrder(formData, items, total);
    if (result.success) { setSuccess(true); clearCart(); }
    else { setErrorMsg(result.error || "Order failed."); }
    setIsSubmitting(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-28 md:pt-32 px-4 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-2 text-white">Your Cart</h1>
        <div className="h-1 w-24 bg-[#D4AF37] mb-10 md:mb-12" />

        {success ? (
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/50 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <ShoppingBag className="mx-auto text-[#D4AF37] mb-6" size={64} />
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Order Confirmed!</h2>
            <p className="text-white/70 max-w-md mx-auto mb-8 text-sm md:text-base">
              Thank you for shopping with Laraib Silver's. Your order has been placed successfully and will be processed for Cash on Delivery.
            </p>
            <Link href="/" className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-colors inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-3xl bg-[#0a0a0a]">
            <ShoppingBag className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/50 mb-6 text-sm">Your cart is entirely empty.</p>
            <Link href="/" className="text-[#D4AF37] hover:text-white font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-sm">
              <ArrowLeft size={16} /> Browse Jewelry
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="w-full lg:w-3/5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 md:gap-6 bg-[#0a0a0a] border border-white/5 p-3 md:p-4 rounded-2xl relative">
                  <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-xl overflow-hidden bg-white shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-lg leading-tight mb-1 md:mb-2 pr-6">{item.title}</h3>
                    <p className="text-[#D4AF37] font-serif font-bold text-sm md:text-base">${item.price}</p>
                  </div>
                  <div className="flex items-center bg-black border border-white/10 rounded-lg overflow-hidden h-9 md:h-10 shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 md:px-3 hover:text-[#D4AF37]"><Minus size={12} /></button>
                    <span className="w-7 md:w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 md:px-3 hover:text-[#D4AF37]"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="absolute top-3 right-3 md:top-4 md:right-4 text-white/30 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center px-4 pt-6 border-t border-white/10">
                <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Subtotal</span>
                <span className="text-2xl md:text-3xl font-bold font-serif">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="w-full lg:w-2/5">
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8 lg:sticky lg:top-24">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Shipping Details</h3>
                {errorMsg && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded">{errorMsg}</p>}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2 font-bold">Full Name</label>
                    <input required type="text" name="name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2 font-bold">Email</label>
                      <input required type="email" name="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2 font-bold">Phone No.</label>
                      <input required type="tel" name="phone" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2 font-bold">Full Delivery Address</label>
                    <textarea required name="address" rows={3} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"></textarea>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/10">
                    <button disabled={isSubmitting} type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 text-sm">
                      {isSubmitting ? "Processing..." : "Place Order (Cash on Delivery)"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
