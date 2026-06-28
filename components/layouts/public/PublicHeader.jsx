"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WishlistDrawer from "@/components/common/WishlistDrawer";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  Briefcase,
} from "lucide-react";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/shop?category=all" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#042A55] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <p>Free shipping on orders over $50</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:underline">
              Help Center
            </Link>
            <Link href="/account/orders" className="hover:underline">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-[#042A55]">
              EcommerceStore
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#042A55] after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === link.href
                    ? "text-[#042A55] after:w-full"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#042A55]">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              className="md:hidden flex flex-col items-center gap-0.5 p-2 hover:text-[#042A55] rounded-lg"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
              <span className="text-[10px]">Search</span>
            </button>
            <button
              onClick={() => setWishlistOpen(true)}
              className="flex flex-col items-center gap-0.5 p-2 hover:text-[#042A55] rounded-lg relative hidden sm:flex"
            >
              <Heart size={20} className="fill-red-500 text-red-500" />
              <span className="text-[10px]">Wishlist</span>
              <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <Link
              href="/account"
              className="flex flex-col items-center gap-0.5 p-2 hover:text-[#042A55] rounded-lg hidden sm:flex"
            >
              <User size={20} />
              <span className="text-[10px]">Account</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center gap-0.5 p-2 hover:text-[#042A55] rounded-lg relative"
            >
              <ShoppingBag size={20} />
              <span className="text-[10px]">Cart</span>
              <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042A55] text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#042A55] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200 mt-2">
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#042A55] hover:bg-blue-50"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </header>
  );
}
