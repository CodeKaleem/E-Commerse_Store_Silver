"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, parseISO } from "date-fns";
import { DollarSign, ShoppingBag, Package, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  openInquiries: number;
  totalProducts: number;
}

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, openInquiries: 0, totalProducts: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    // 1. Fetch Orders
    const { data: orders } = await supabase.from("orders").select("created_at, total_amount, status");
    // 2. Fetch Inquiries
    const { count: inquiriesCount } = await supabase.from("service_inquiries").select("*", { count: 'exact', head: true }).eq('status', 'pending');
    // 3. Fetch Products
    const { count: productsCount } = await supabase.from("products").select("*", { count: 'exact', head: true });

    if (orders) {
      // Calculate Stats
      const revenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + Number(o.total_amount), 0);
      
      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        openInquiries: inquiriesCount || 0,
        totalProducts: productsCount || 0
      });

      // Group chart data by day for the last 7 days
      const days = Array.from({length: 7}).map((_, i) => {
        const date = subDays(new Date(), i);
        return format(date, 'yyyy-MM-dd');
      }).reverse();

      const salesByDay = days.map(day => {
        const dayOrders = orders.filter(o => o.created_at.startsWith(day) && o.status !== 'cancelled');
        const dayRevenue = dayOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        return {
          name: format(parseISO(day), 'MMM dd'),
          revenue: dayRevenue
        };
      });

      setChartData(salesByDay);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent stroke-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-2">Executive Overview</h1>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Laraib Silver's Business Analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-[#D4AF37]/10 group-hover:scale-110 transition-transform"><DollarSign size={100} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Gross Revenue</p>
          <p className="text-4xl font-serif text-white">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-white/5 group-hover:scale-110 transition-transform"><ShoppingBag size={100} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Total Orders</p>
          <p className="text-4xl font-serif text-[#D4AF37]">{stats.totalOrders}</p>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-white/5 group-hover:scale-110 transition-transform"><MessageCircle size={100} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Pending Inquiries</p>
          <div className="flex items-center gap-4">
             <p className="text-4xl font-serif text-white">{stats.openInquiries}</p>
             {stats.openInquiries > 0 && <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-widest font-sans">Action Required</span>}
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-white/5 group-hover:scale-110 transition-transform"><Package size={100} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Vault Items</p>
          <p className="text-4xl font-serif text-white">{stats.totalProducts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 p-6 rounded-3xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Revenue Past 7 Days</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
                />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col">
           <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Actions</h2>
           
           <div className="space-y-4 flex-1">
             <Link href="/admin/orders" className="block bg-black border border-white/10 hover:border-[#D4AF37]/50 p-4 rounded-xl transition-all group">
               <h3 className="font-bold text-white mb-1 group-hover:text-[#D4AF37] flex justify-between items-center">
                 Fulfill Orders <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </h3>
               <p className="text-xs text-slate-500 font-medium">Review and package new purchases</p>
             </Link>

             <Link href="/admin/inquiries" className="block bg-black border border-white/10 hover:border-[#D4AF37]/50 p-4 rounded-xl transition-all group">
               <h3 className="font-bold text-white mb-1 group-hover:text-[#D4AF37] flex justify-between items-center">
                 Reply to Clients <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </h3>
               <p className="text-xs text-slate-500 font-medium">Clear out pending service emails</p>
             </Link>

             <Link href="/admin/products/new" className="block bg-black border border-[#D4AF37]/20 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 p-4 rounded-xl transition-all group">
               <h3 className="font-bold text-[#D4AF37] mb-1 flex justify-between items-center">
                 Add New Jewelry <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
               </h3>
               <p className="text-xs text-[#D4AF37]/60 font-medium">Expand the collection</p>
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
