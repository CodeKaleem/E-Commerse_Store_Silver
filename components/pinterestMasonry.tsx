"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PinterestCard from "./pinterestCard";
import { useViewport } from "@/lib/pinboard/hooks/useViewport";
import { useScrollState } from "@/lib/pinboard/hooks/useScrollState";
import { useScrollerControls } from "@/lib/pinboard/hooks/useScrollerControls";
import { useInfinitePlane } from "@/lib/pinboard/hooks/useInfinitePlane";
import {
  PLANE_W,
  PLANE_H,
  COL_BUFFER,
  ROW_BUFFER,
} from "@/lib/pinboard/constants";
import { baseCardData } from "@/lib/pinboard/data";
import { supabase } from "@/lib/supabase";

// Layout constants optimized for jewelry display
const TILE_W = 280;
const TILE_H = 340; 
const GAP_X = 20;
const GAP_Y = 20;
const COLUMN_WIDTH = TILE_W;
const STRIDE_X = COLUMN_WIDTH + GAP_X;

function bucketize<T>(items: T[], columns: number): T[][] {
  const cols: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => cols[i % columns].push(item));
  return cols;
}

function buildCumY(count: number, step: number) {
  return Array.from({ length: count }, (_, i) => i * step);
}

export default function PinterestMasonry() {
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");
  
  const scrollerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const { w: vw, h: vh } = useViewport(scrollerRef);

  // REAL columns based on viewport
  const [realCols, setRealCols] = useState(4);
  useEffect(() => {
    const w = scrollerRef.current?.clientWidth ?? vw;
    if (!w) return;
    const maxCols = Math.max(
      2,
      Math.min(8, Math.floor((w + GAP_X) / STRIDE_X))
    );
    setRealCols(maxCols);
  }, [vw]);

  // Optimized column transition to prevent lag
  const [columns, setColumns] = useState(realCols);
  useEffect(() => {
    setColumns(realCols);
  }, [realCols]);

  const { targetRef } = useScrollerControls(scrollerRef);
  const scroll = useScrollState(scrollerRef);
  const { virtualX, virtualY, originX, originY } = useInfinitePlane(
    scrollerRef,
    vw,
    vh,
    scroll,
    targetRef
  );

  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("order", { ascending: true });
      
      if (!error && data) {
        const mapped = data.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          category: p.category,
          description: p.description,
          image: p.image_url,
          badge: p.badge,
          price: p.price,
          type: 'product'
        }));
        setDbProducts(mapped);
      }
    }
    getProducts();
  }, []);

  // Filter products based on URL param
  const pattern = useMemo(() => {
    const all = [...dbProducts, ...baseCardData];
    if (!currentCat || currentCat === "all") return all;
    
    return all.filter(item => 
      item.subtitle?.toLowerCase().includes(currentCat.toLowerCase()) ||
      item.category?.toLowerCase().includes(currentCat.toLowerCase()) ||
      item.badge?.toLowerCase().includes(currentCat.toLowerCase())
    );
  }, [dbProducts, currentCat]);

  const colBuckets = useMemo(
    () => bucketize(pattern, columns),
    [pattern, columns]
  );

  const rowStep = TILE_H + GAP_Y;
  const cumYPerCol = useMemo(
    () => colBuckets.map((col) => buildCumY(col.length, rowStep)),
    [colBuckets, rowStep]
  );
  const patternHPerCol = useMemo(
    () => colBuckets.map((col) => Math.max(rowStep, col.length * rowStep)),
    [colBuckets, rowStep]
  );
  const columnOffsets = useMemo(() => {
    const unit = Math.round(TILE_H / 3);
    return Array.from({ length: columns }, (_, k) => (k % 3) * unit);
  }, [columns]);

  const firstCol = Math.floor(virtualX / STRIDE_X) - COL_BUFFER;
  const visColCount = Math.ceil(vw / STRIDE_X) + COL_BUFFER * 2;

  const [startGridAnim, setStartGridAnim] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStartGridAnim(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={scrollerRef} className="fixed inset-0 overflow-auto z-20 pt-24 pb-20">
      <div className="h-full w-full pointer-events-none fixed top-0 left-0 bg-black/40 z-[5] blur-sm transition-opacity duration-[2s]" />
      <motion.div
        ref={planeRef}
        className="relative"
        style={{
          width: PLANE_W,
          height: PLANE_H,
        }}
        initial={{ scale: 0.6 }}
        animate={{ scale: startGridAnim ? 1 : 0.4 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {Array.from({ length: visColCount }).map((_, i) => {
          const colIndex = firstCol + i;
          const baseCol = ((colIndex % columns) + columns) % columns;
          const x = Math.round(colIndex * STRIDE_X - originX.current);

          const colCards = colBuckets[baseCol] ?? [];
          const cumY = cumYPerCol[baseCol] ?? [];
          const patternH = patternHPerCol[baseCol] || rowStep;
          const yOffset = columnOffsets[baseCol] || 0;

          const shiftedVirtualY = virtualY - yOffset;
          const firstRepeat = Math.floor(shiftedVirtualY / patternH) - ROW_BUFFER;
          const repeatCount = Math.ceil(vh / patternH) + ROW_BUFFER * 2;

          return (
            <motion.div
              key={`col-${colIndex}`}
              className="absolute top-0"
              style={{ left: x, width: COLUMN_WIDTH }}
              layout
              transition={{ duration: 1 }}
            >
              {Array.from({ length: repeatCount }).flatMap((__, ry) => {
                const rep = firstRepeat + ry;
                const yBase = rep * patternH;
                return colCards.map((card: any, idx: number) => {
                  const y = Math.round(yBase + yOffset + cumY[idx] - originY.current);
                  return (
                    <motion.div
                      key={`tile-${colIndex}-${rep}-${card.id}-${idx}`}
                      className="absolute m-0 p-0 [&>*]:m-0"
                      style={{
                        top: y,
                        width: COLUMN_WIDTH,
                        height: TILE_H,
                        willChange: "transform",
                        transform: "translateZ(0)",
                      }}
                      layout
                      transition={{ duration: 1 }}
                    >
                      <PinterestCard {...card} />
                    </motion.div>
                  );
                });
              })}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
