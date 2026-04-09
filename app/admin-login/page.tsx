"use client";

import { useTransition, useState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_left,#1a1a1a,#000)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-[#262626] p-10 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter text-white mb-2 uppercase">LARAIB SILVER'S</h1>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <Input 
              name="email"
              type="email"
              required
              placeholder="admin@laraibsilver.com"
              className="bg-black border-[#262626] text-white h-12 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <Input 
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="bg-black border-[#262626] text-white h-12 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          {error && <p className="text-xs text-red-500 text-center font-medium">{error}</p>}

          <Button 
            disabled={isPending}
            type="submit"
            className="w-full bg-[#D4AF37] text-black h-12 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            {isPending ? "AUTHENTICATING..." : "SIGN IN"}
          </Button>
        </form>

        <p className="text-[10px] text-center text-slate-600 mt-10 uppercase tracking-widest">
          Authorized personnel only. All access is logged.
        </p>
      </motion.div>
    </div>
  );
}
