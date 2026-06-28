"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  ChevronDown,
  X,
  Star,
  Filter,
} from "lucide-react";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Rating", value: "rating" },
];

const categoryFilters = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports",
  "Books",
  "Beauty",
];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 79.99, rating: 4.5, reviews: 128, category: "Electronics", image: "/products/headphones.jpg", badge: "Sale" },
  { id: 2, name: "Smart Watch Pro", price: 199.99, rating: 4.8, reviews: 256, category: "Electronics", image: "/products/watch.jpg", badge: "New" },
  { id: 3, name: "Running Shoes", price: 129.99, rating: 4.3, reviews: 89, category: "Sports", image: "/products/shoes.jpg" },
  { id: 4, name: "Laptop Backpack", price: 49.99, rating: 4.6, reviews: 312, category: "Fashion", image: "/products/backpack.jpg", badge: "Sale" },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, rating: 4.4, reviews: 178, category: "Electronics", image: "/products/speaker.jpg" },
  { id: 6, name: "Fitness Tracker", price: 89.99, rating: 4.2, reviews: 95, category: "Electronics", image: "/products/tracker.jpg", badge: "Trending" },
  { id: 7, name: "Premium Sunglasses", price: 149.99, rating: 4.7, reviews: 67, category: "Fashion", image: "/products/sunglasses.jpg" },
  { id: 8, name: "Portable Charger", price: 34.99, rating: 4.1, reviews: 445, category: "Electronics", image: "/products/charger.jpg" },
  { id: 9, name: "Yoga Mat", price: 29.99, rating: 4.5, reviews: 201, category: "Sports", image: "/products/yogamat.jpg" },
  { id: 10, name: "Coffee Maker", price: 89.99, rating: 4.6, reviews: 156, category: "Home & Living", image: "/products/coffeemaker.jpg", badge: "New" },
  { id: 11, name: "Desk Lamp", price: 44.99, rating: 4.3, reviews: 88, category: "Home & Living", image: "/products/lamp.jpg" },
  { id: 12, name: "Face Moisturizer", price: 24.99, rating: 4.8, reviews: 334, category: "Beauty", image: "/products/moisturizer.jpg", badge: "Bestseller" },
];

export default function PublicShopPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const filteredProducts = sampleProducts.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedPriceRanges.length > 0) {
      const inRange = selectedPriceRanges.some(
        (range) => p.price >= range.min && p.price < range.max
      );
      if (!inRange) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const togglePriceRange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.some((r) => r.label === range.label)
        ? prev.filter((r) => r.label !== range.label)
        : [...prev, range]
    );
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) + selectedPriceRanges.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#042A55]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Shop</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            <Filter size={16} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-[#042A55] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#042A55]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>

          {/* View Mode */}
          <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#042A55] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[#042A55] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Category
              </h3>
              <div className="space-y-1">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#042A55] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Price Range
              </h3>
              <div className="space-y-1">
                {priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.some(
                        (r) => r.label === range.label
                      )}
                      onChange={() => togglePriceRange(range)}
                      className="w-4 h-4 text-[#042A55] border-gray-300 rounded focus:ring-[#042A55]"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPriceRanges([]);
                }}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#042A55] rounded-full text-sm">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedPriceRanges.map((range) => (
                <span
                  key={range.label}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#042A55] rounded-full text-sm"
                >
                  {range.label}
                  <button
                    onClick={() => togglePriceRange(range)}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Products */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-100">
                    {product.badge && (
                      <span
                        className={`absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-0.5 rounded ${
                          product.badge === "Sale"
                            ? "bg-red-500 text-white"
                            : product.badge === "New"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-[#042A55]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group flex gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow p-3"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 relative">
                    {product.badge && (
                      <span
                        className={`absolute top-1 left-1 z-10 text-xs font-semibold px-2 py-0.5 rounded ${
                          product.badge === "Sale"
                            ? "bg-red-500 text-white"
                            : product.badge === "New"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <h3 className="font-medium text-gray-900 group-hover:text-[#042A55] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-[#042A55] text-lg">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-[#042A55] text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">
                  Category
                </h3>
                <div className="space-y-1">
                  {categoryFilters.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#042A55] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">
                  Price Range
                </h3>
                <div className="space-y-1">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.some(
                          (r) => r.label === range.label
                        )}
                        onChange={() => togglePriceRange(range)}
                        className="w-4 h-4 text-[#042A55] border-gray-300 rounded focus:ring-[#042A55]"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilterOpen(false)}
                className="w-full bg-[#042A55] text-white py-2.5 rounded-lg font-medium hover:bg-[#063C76] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
