"use client";

import { X } from "lucide-react";

const GROUP_COLORS = {
  auth: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  user: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  business: { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-300" },
  category: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  product: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  table: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  order: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  expense: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
  upload: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" },
};

const DEFAULT_COLOR = { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" };

function getGroup(value) {
  if (!value) return DEFAULT_COLOR;
  const group = value.split(":")[0];
  return GROUP_COLORS[group] || DEFAULT_COLOR;
}

export default function PermissionTag({
  value,
  name,
  removable = false,
  onRemove,
  size = "md",
  className = "",
}) {
  const colors = getGroup(value);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const label = name || value;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border whitespace-nowrap
        ${colors.bg} ${colors.text} ${colors.border}
        ${sizeClasses[size]}
        ${className}`}
    >
      <span>{label}</span>
      {removable && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(value);
          }}
          className="ml-0.5 rounded-full p-0.5 transition-colors hover:cursor-pointer hover:bg-black/10"
        >
          <X size={size === "sm" ? 12 : 14} />
        </button>
      )}
    </span>
  );
}

export function PermissionTagList({
  permissions = [],
  removable = false,
  onRemove,
  size = "md",
  className = "",
}) {
  if (!permissions || permissions.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {permissions.map((perm) => {
        const value = typeof perm === "string" ? perm : perm.value;
        const name = typeof perm === "string" ? perm : perm.name;
        return (
          <PermissionTag
            key={value}
            value={value}
            name={name}
            removable={removable}
            onRemove={onRemove}
            size={size}
          />
        );
      })}
    </div>
  );
}
