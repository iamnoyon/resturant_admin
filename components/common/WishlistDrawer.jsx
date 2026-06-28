"use client";

import Link from "next/link";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [];

export default function WishlistDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-100 bg-white shadow-xl z-[70] transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-red-500 text-red-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 hover:cursor-pointer rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <Heart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your wishlist is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border border-gray-200 rounded-lg p-3"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      onClick={onClose}
                      className="font-medium text-sm text-gray-900 hover:text-[#042A55] transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="font-bold text-[#042A55] text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="p-1.5 bg-[#042A55] text-white rounded hover:bg-[#063C76] transition-colors">
                      <ShoppingCart size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
