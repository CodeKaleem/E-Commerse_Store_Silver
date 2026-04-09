import { Suspense } from "react";
import HeroTransition from "@/components/HeroTransition";

import Navbar from "@/components/nav/navbar";
import PinterestMasonry from "@/components/pinterestMasonry";

export default async function Page() {
  return (
    <div className="bg-black relative min-h-screen overflow-x-hidden">
      <HeroTransition />
      
      <div className="relative z-10 pt-4 pb-20">
        <Suspense fallback={null}>
          <PinterestMasonry />
        </Suspense>
      </div>

      <Navbar />
    </div>
  );
}
