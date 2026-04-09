"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface RotationViewerProps {
  images: string[];
  autoRotate?: boolean;
}

export default function RotationViewer({ images, autoRotate = false }: RotationViewerProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const lastIndex = useRef(0);

  const totalFrames = images.length;

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalFrames);
    }, 100);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging, totalFrames]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    lastIndex.current = index;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX.current;
    
    // Sensitivty: 10px move = 1 frame change
    const frameChange = Math.floor(diff / 10);
    let newIndex = (lastIndex.current - frameChange) % totalFrames;
    if (newIndex < 0) newIndex += totalFrames;
    
    setIndex(newIndex);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="relative w-full aspect-square bg-white cursor-grab active:cursor-grabbing overflow-hidden touch-none select-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {/* Frame indicator */}
      <div className="absolute top-4 right-4 z-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
        360° VIEW
      </div>

      <div className="relative w-full h-full">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Frame ${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-0 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Drag Indicator */}
      <motion.div 
        animate={{ opacity: isDragging ? 0 : 0.5, y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 text-xs flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="flex gap-4 items-center">
          <span>←</span>
          <span className="text-[10px] uppercase tracking-tighter">Drag to rotate</span>
          <span>→</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-slate-900 transition-all duration-100" style={{ width: `${((index + 1) / totalFrames) * 100}%` }} />
    </div>
  );
}
