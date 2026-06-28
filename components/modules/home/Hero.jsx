import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
      <div className="max-w-7xl mx-auto px-4 py-9">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-white/10 text-sm px-4 py-1.5 rounded-full mb-4">
              New Season Collection
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Discover the
              <span className="block text-yellow-300">Best Deals</span>
              Online
            </h1>
            <p className="text-white/80 text-lg mb-6 max-w-md">
              Shop the latest trends with exclusive discounts. Quality products
              delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-[#042A55] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?sort=newest"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Collections
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-60 h-60 bg-white/10 rounded-full flex items-center justify-center">
              <div className="w-44 h-44 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-5xl">&#x1F6CD;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
