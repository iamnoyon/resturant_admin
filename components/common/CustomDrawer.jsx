"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CustomDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  width = "lg:w-1/2",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      document.body.style.overflow = "";
      setVisible(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${width} bg-white shadow-2xl h-full flex flex-col transform transition-transform duration-300 ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
          <h3 className="text-lg font-semibold text-[#043570]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomDrawer;
