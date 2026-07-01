import React, { useState, useEffect, useRef } from "react";

const ThreeDotMenu = ({
  object,
  actions = [],
  isDisabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuToggle = (e) => {
    e.stopPropagation();

    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleActionClick = (action, e) => {
    e.stopPropagation();

    if (!action.isDisabled && action.onClick) {
      action.onClick(object);
      setIsOpen(false);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
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
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Determine whether to open above or below
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedMenuHeight = Math.max(actions.length * 40, 120);

      setOpenAbove(spaceBelow < estimatedMenuHeight);
    }
  }, [isOpen, actions]);

  return (
    <div className="relative inline-block overflow-visible">
      {/* Three Dot Button */}
      <button
        ref={buttonRef}
        onClick={handleMenuToggle}
        disabled={isDisabled}
        title="More options"
        className={`p-2 rounded-md transition-colors ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 cursor-pointer"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gray-600"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-[9999]
            ${
              openAbove
                ? "bottom-full mb-2"
                : "top-full mt-2"
            }`}
        >
          <div className="py-1">
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => handleActionClick(action, e)}
                  disabled={action.isDisabled}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    action.isDisabled
                      ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {action.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No actions available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;