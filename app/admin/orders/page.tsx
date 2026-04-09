"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone, Mail, User, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  status: string;
};

type OrderItem = {
  id: string;
  product_id: string;
  product_title: string;
  price: number;
  quantity: number;
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  const loadOrderItems = async (orderId: string) => {
    setItemsLoading(true);
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);
    if (data) setOrderItems(data);
    setItemsLoading(false);
  };

  const handleSelect = (ord: Order) => {
    setSelectedOrder(ord);
    loadOrderItems(ord.id);
  };

  const updateStatus = async (newStatus: string) => {
    if (!selectedOrder) return;
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", selectedOrder.id);
    if (!error) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase text-slate-800">Orders Desk</h1>
            <p className="text-slate-500 text-sm mt-1">Manage physical product e-commerce orders.</p>
          </div>
          <button onClick={() => router.push('/admin')} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-black">
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* List */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden shrink-0 h-[40vh] lg:h-[75vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-widest text-slate-500">Orders List</div>
            <div className="overflow-y-auto flex-2 p-2 space-y-2">
              {loading ? <p className="p-4 text-sm text-slate-500 text-center">Loading...</p> : 
               orders.map(ord => (
                <button 
                  key={ord.id}
                  onClick={() => handleSelect(ord)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedOrder?.id === ord.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white border-transparent hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm truncate pr-2">{ord.customer_name}</span>
                    <span className="font-serif font-bold">${ord.total_amount}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded-full uppercase tracking-widest font-bold text-[8px] ${
                      ord.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      ord.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ord.status}
                    </span>
                    <span className="text-slate-400 ml-auto uppercase tracking-tighter text-[9px]">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed View */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8 min-h-[50vh] lg:h-[75vh] overflow-y-auto">
             {selectedOrder ? (
               <div>
                 <div className="flex justify-between items-start mb-6 border-b pb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Order #{selectedOrder.id.split('-')[0].toUpperCase()}</h2>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-bold">Update Status</p>
                       <select 
                         value={selectedOrder.status} 
                         onChange={(e) => updateStatus(e.target.value)}
                         className="border border-slate-200 bg-slate-50 px-3 py-2 rounded-lg text-sm font-bold uppercase"
                       >
                         <option value="pending">Pending (Unfulfilled)</option>
                         <option value="processing">Processing</option>
                         <option value="shipped">Shipped</option>
                         <option value="delivered">Delivered</option>
                         <option value="cancelled">Cancelled</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4 text-sm">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-[#D4AF37]">Customer Details</h3>
                      <p className="flex items-center gap-3 text-slate-700"><User size={16} className="text-slate-400"/> {selectedOrder.customer_name}</p>
                      <p className="flex items-center gap-3 text-slate-700"><Mail size={16} className="text-slate-400"/> {selectedOrder.customer_email}</p>
                      <p className="flex items-center gap-3 text-slate-700"><Phone size={16} className="text-slate-400"/> {selectedOrder.customer_phone}</p>
                    </div>
                    <div className="space-y-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-[#D4AF37] mb-2 flex items-center gap-2"><MapPin size={14}/> Shipping Address</h3>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedOrder.shipping_address}</p>
                    </div>
                 </div>

                 {/* Order Items */}
                 <div>
                   <h3 className="font-bold uppercase text-xs tracking-widest text-slate-500 mb-4 border-b pb-2 flex items-center gap-2"><PackageOpen size={16}/> Purchased Items</h3>
                   {itemsLoading ? <p className="text-xs text-slate-400">Loading items...</p> : (
                     <div className="space-y-3">
                       {orderItems.map(item => (
                         <div key={item.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl shadow-sm hover:shadow transition-shadow">
                            <div>
                               <p className="font-bold text-sm text-slate-800">{item.product_title}</p>
                               <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Product ID: {item.product_id?.split('-')[0]}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-xs text-slate-500 mb-1">Qty: <span className="font-bold text-slate-800">{item.quantity}</span></p>
                               <p className="font-serif font-bold text-[#D4AF37]">${item.price}</p>
                            </div>
                         </div>
                       ))}
                       <div className="flex justify-between items-center bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-4 py-4 rounded-xl mt-4">
                          <span className="font-bold uppercase tracking-widest text-sm text-slate-800">Total Purchase</span>
                          <span className="font-serif font-bold text-2xl text-[#D4AF37]">${selectedOrder.total_amount}</span>
                       </div>
                     </div>
                   )}
                 </div>

               </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                 Select an order from the list to view full details
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
