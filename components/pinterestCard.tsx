import { memo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface PinterestCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  badge?: string;
  price?: number;
  onClick?: () => void;
}

const PinterestCard = memo(function PinterestCard({
  id,
  title,
  subtitle,
  description,
  image,
  badge,
  price,
  onClick,
}: PinterestCardProps) {
  const isDragging = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = () => { isDragging.current = false; };
  const handleMouseMove = () => { isDragging.current = true; };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      title,
      price: price || 0,
      image: image || "/placeholder.svg?height=400&width=320",
      quantity: 1
    });
    alert("Added to Cart!");
  };

  const CardContent = (
    <div
      ref={cardRef}
      className={`relative h-full w-full overflow-hidden bg-white border border-slate-100 shadow-sm cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-700 group
       ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase rounded-full shadow-md">
            {badge}
          </span>
        </div>
      )}

      {/* Add To Cart BTN */}
      <button 
        onClick={handleAddToCart}
        className="absolute top-4 right-4 z-20 bg-white/90 text-black p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-[#D4AF37] hover:text-white shadow-xl hover:scale-110 active:scale-95"
      >
        <ShoppingCart size={16} className="pointer-events-none" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <img
          src={image || "/placeholder.svg?height=400&width=320"}
          alt={title}
          draggable={false}
          className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col space-y-2 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex-1 mr-4">
            {subtitle && <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">{subtitle}</p>}
            <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-black transition-colors">{title}</h3>
          </div>
          {price && (
            <div className="flex flex-col items-end">
              <span className="text-sm font-serif font-bold text-slate-900">${price}</span>
              <span className="text-[9px] text-[#D4AF37] uppercase tracking-tighter font-bold">In Stock</span>
            </div>
          )}
        </div>
        
        <p className="text-[11px] text-slate-500 line-clamp-2 font-medium leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          {description}
        </p>
      </div>

      {/* Gold Border Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-700" />
    </div>
  );

  return onClick ? (
    CardContent
  ) : (
    <Link href={`/tile/${id}`} className="block h-full no-underline">
      {CardContent}
    </Link>
  );
});

export default PinterestCard;

