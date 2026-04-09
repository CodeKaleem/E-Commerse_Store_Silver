import { baseCardData } from "@/lib/pinboard/data";
import { supabase } from "@/lib/supabase";
import HeroTransition from "@/components/HeroTransition";
import Navbar from "@/components/nav/navbar";
import RotationViewer from "@/components/RotationViewer";


export default async function TilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // 1. Try fetching from Supabase
  const { data: dbProduct } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  // 2. Fallback to baseCardData
  const mockProduct = baseCardData.find(d => d.id === id);
  
  const product = dbProduct ? {
    id: dbProduct.id,
    title: dbProduct.title,
    subtitle: dbProduct.subtitle,
    description: dbProduct.description,
    image: dbProduct.image_url,
    badge: dbProduct.badge,
    price: dbProduct.price,
    rotation_images: dbProduct.rotation_images || []
  } : mockProduct;

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="p-12 text-center bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md mx-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Piece not found</h2>
          <p className="text-slate-500 font-light mb-8">
            The jewelry piece you are looking for is no longer in our current vault.
          </p>
          <a href="/" className="inline-block px-8 py-3 bg-slate-900 text-white rounded-full text-sm font-bold tracking-widest hover:scale-105 transition-transform">
            BACK TO COLLECTION
          </a>
        </div>
      </div>
    );
  }

  const hasRotation = product.rotation_images && product.rotation_images.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroTransition />
      
      <div className="max-w-[1440px] mx-auto pt-24 pb-32 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Media Section */}
          <div className="space-y-8 sticky top-24">
            {hasRotation ? (
              <div className="rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] border border-[#D4AF37]/20">
                <RotationViewer images={product.rotation_images} autoRotate={true} />
              </div>
            ) : (
              <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] bg-[#111] border border-white/5">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover grayscale-[0.2]"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-12 pt-4">
            <header className="space-y-6">
              <div className="flex items-center gap-6">
                {product.badge && (
                  <span className="bg-[#D4AF37] text-black text-[11px] font-bold px-5 py-1.5 tracking-[0.2em] uppercase rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    {product.badge}
                  </span>
                )}
                {product.subtitle && (
                  <span className="text-[14px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">
                    {product.subtitle}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tighter">
                  {product.title}
                </h1>
              </div>
              {product.price && (
                <p className="text-4xl font-light text-white font-serif tracking-tight">
                  <span className="text-[#D4AF37] mr-2">$</span>
                  {product.price}
                </p>
              )}
            </header>

            <div className="space-y-10">
              <p className="text-2xl text-slate-400 leading-relaxed font-medium italic border-l-2 border-[#D4AF37] pl-8">
                {product.description}
              </p>

              <div className="prose prose-invert max-w-none text-slate-300 leading-[1.8] font-medium text-lg">
                <p>
                  Handcrafted from the finest 925 sterling silver, this <strong>{product.title}</strong> is a testament to timeless elegance and modern craftsmanship. Each detail is meticulously finished to ensure a lasting shine and a perfect fit.
                </p>
                <p>
                  Part of our Signature Collection, this piece embodies the subtle luxury and brilliant craftsmanship that defines <span className="text-[#D4AF37] font-bold">LARAIB SILVER'S</span>.
                </p>
                <ul className="grid grid-cols-2 gap-8 list-none p-0 mt-12">
                  <li className="flex flex-col border-l border-[#D4AF37]/30 pl-6 py-3 bg-white/5 rounded-r-xl">
                    <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">Material</span>
                    <span className="text-base text-white">925 Sterling Silver / 24K Gold Plating</span>
                  </li>
                  <li className="flex flex-col border-l border-[#D4AF37]/30 pl-6 py-3 bg-white/5 rounded-r-xl">
                    <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">Weight</span>
                    <span className="text-base text-white">Approx. 4.2g (Certified)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-12">
              <button className="w-full h-20 bg-[#D4AF37] text-black rounded-2xl text-xl font-bold tracking-[0.2em] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                ADD TO COLLECTION
              </button>
              <button className="w-full h-20 border-2 border-[#D4AF37]/30 text-white rounded-2xl text-xl font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                REQUEST CUSTOMIZATION
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


