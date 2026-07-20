"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Filter, ChevronDown, X } from "lucide-react";

const FilterDropdown = ({
  options = [],
  labelKey = "label",
  valueKey = "id",
  value = null,
  placeholder = "Filter",
  isDisabled = false,
  wrapperClass = "",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [positioned, setPositioned] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const selectedOption = options.find(
    (option) => option?.[valueKey] === value
  );

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
      setPositioned(true);
    } else {
      setPositioned(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClose = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClose);
      window.addEventListener("scroll", handleClose, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClose);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    if (onChange) {
      onChange(option?.[valueKey]);
    }
  };

  return (
    <div className={`relative inline-block ${wrapperClass}`}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        disabled={isDisabled}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-400"
            : "bg-[#0d5fb5] border-[#0d5fb5] text-white hover:bg-[#0b4f96] hover:border-[#0b4f96]"
        }`}
      >
        <Filter size={16} className="shrink-0" />
        <span className="min-w-[100px] max-w-[140px] truncate text-left">
          {selectedOption?.[labelKey] || placeholder}
        </span>
        {selectedOption ? (
          <X
            size={14}
            className="text-white/70 hover:text-white shrink-0"
            onClick={handleClear}
          />
        ) : (
          <ChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && positioned && (
        <div
          ref={menuRef}
          className="fixed min-w-[180px] w-max max-w-[240px] bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] py-1 max-h-60 overflow-y-auto"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={option?.[valueKey] ?? index}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors truncate ${
                  option?.[valueKey] === value
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option?.[labelKey]}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
