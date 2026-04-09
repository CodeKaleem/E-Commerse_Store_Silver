"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CheckCircle2, Clock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Assumes admin is logged in (middleware check usually)

type Inquiry = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service_type: string;
  message: string;
  status: string;
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (!error && data) {
      setInquiries(data);
    }
    setLoading(false);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    
    setIsReplying(true);
    try {
      const res = await fetch("/api/reply-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedInquiry.id,
          customer_email: selectedInquiry.customer_email,
          subject: `Re: Your ${selectedInquiry.service_type} Request - Laraib Silver's`,
          message: replyMessage,
        })
      });
      
      const data = await res.json();
      if (data.success) {
         alert("Reply sent successfully via Resend!");
         setSelectedInquiry(null);
         setReplyMessage("");
         fetchInquiries(); // refresh list
      } else {
         alert("Failed: " + data.error);
      }
    } catch (err) {
      alert("An error occurred");
    }
    setIsReplying(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black font-sans p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase text-slate-800">Inquiries Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and reply to customer service requests directly.</p>
          </div>
          <button 
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} /> Back to Admin
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          
          {/* List */}
          <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden shrink-0 h-[70vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-xs uppercase tracking-widest text-slate-500">
               Recent Inquiries
            </div>
            <div className="overflow-y-auto flex-2 p-2 space-y-2">
              {loading ? (
                <p className="p-4 text-sm text-slate-500 text-center">Loading...</p>
              ) : inquiries.length === 0 ? (
                <p className="p-4 text-sm text-slate-500 text-center">No inquiries found.</p>
              ) : inquiries.map(inq => (
                <button 
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedInquiry?.id === inq.id ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">{inq.customer_name}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mb-2 truncate bg-slate-100 inline-block px-2 py-1 rounded">
                    {inq.service_type}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {inq.status === 'replied' ? (
                       <span className="text-emerald-500 flex items-center gap-1 text-xs"><CheckCircle2 size={12}/> Replied</span>
                    ) : (
                       <span className="text-amber-500 flex items-center gap-1 text-xs"><Clock size={12}/> Pending</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details / Reply Form */}
          <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-[70vh] overflow-y-auto">
             {selectedInquiry ? (
               <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedInquiry.service_type}</h2>
                  <div className="flex gap-4 text-sm text-slate-500 mb-6 border-b pb-4">
                     <span className="flex items-center gap-1"><User size={14}/> {selectedInquiry.customer_name}</span>
                     <span className="flex items-center gap-1"><Mail size={14}/> {selectedInquiry.customer_email}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl text-sm leading-relaxed text-slate-700 mb-6 border border-slate-100">
                    "{selectedInquiry.message}"
                  </div>

                  {selectedInquiry.status === "replied" ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
                       <CheckCircle2 size={16} />
                       You have already replied to this inquiry.
                    </div>
                  ) : (
                    <form onSubmit={handleReplySubmit} className="space-y-4">
                      <h3 className="font-bold uppercase text-xs tracking-widest text-slate-500">Reply to Customer via Email</h3>
                      <textarea 
                        required
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        placeholder="Type your response here... (Will be sent via Resend)"
                        className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37] resize-none h-32"
                      ></textarea>
                      <button 
                        type="submit" 
                        disabled={isReplying}
                        className="bg-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#D4AF37] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                         <Mail size={16} /> {isReplying ? "Sending..." : "Send Reply"}
                      </button>
                    </form>
                  )}
               </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                 Select an inquiry from the left to view details and reply
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}
