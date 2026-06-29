"use client"

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGetCategoryListQuery } from "@/store/admin/category";
import { siteConfig } from "@/config/siteConfig";

export default function Categories() {
  const {data: categoryData} = useGetCategoryListQuery()

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = siteConfig.baseUrl.replace('/api', '');
    return `${base}${url}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryData?.data?.map((cat) => (
          <Link
            key={cat?.name}
            href={cat?.href || ''}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
          >
            <div
              className="absolute inset-0 transition-transform duration-300 group-hover:scale-110 z-0"
              style={{
                backgroundImage: `url(${getImageUrl(cat.image)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#e5e7eb',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                Explore &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
