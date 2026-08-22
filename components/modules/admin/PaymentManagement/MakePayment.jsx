"use client";

import { useMemo, useState } from "react";
import { useGetAdminWithBusinessQuery } from "@/store/admin/user-management";
import { User, Building2, ChevronDown, Loader2 } from "lucide-react";

const MakePayment = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const { data: userData, isLoading, isError } = useGetAdminWithBusinessQuery();

  const users = useMemo(() => {
    if (Array.isArray(userData)) return userData;
    if (Array.isArray(userData?.data)) return userData.data;
    if (Array.isArray(userData?.dataSource)) return userData.dataSource;
    return [];
  }, [userData]);
  const selectedUser = useMemo(
    () => users.find((u) => String(u?.id) === String(selectedUserId)) || null,
    [users, selectedUserId]
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#043570]">Make Payment</h2>
      <p className="mt-1 text-sm text-gray-500">
        Select a user to view their business and account details.
      </p>

      {/* User Dropdown */}
      <div className="mt-5 max-w-md">
        <label
          htmlFor="user-select"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Select User
        </label>
        <div className="relative">
          <User
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            disabled={isLoading}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-800 focus:border-[#043570] focus:outline-none focus:ring-2 focus:ring-[#043570]/20 disabled:cursor-not-allowed disabled:bg-gray-50"
          >
            <option value="">
              {isLoading ? "Loading users..." : "Choose a user"}
            </option>
            {users.map((user) => (
              <option key={user?.id} value={user?.id}>
                {user?.name}
                {user?.email ? ` (${user.email})` : ""}
              </option>
            ))}
          </select>
          {isLoading ? (
            <Loader2
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400"
            />
          ) : (
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <User size={14} className="text-[#043570]" />
              <span>User Name</span>
            </div>
            <p className="mt-2 text-base font-semibold text-[#1f2937]">
              {selectedUser?.name || "—"}
            </p>
            {selectedUser?.email && (
              <p className="mt-1 text-xs text-gray-500">{selectedUser.email}</p>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <Building2 size={14} className="text-[#043570]" />
              <span>Business Name</span>
            </div>
            <p className="mt-2 text-base font-semibold text-[#1f2937]">
              {selectedUser?.businessName || "—"}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
          {isError
            ? "Failed to load users."
            : isLoading
              ? "Loading users..."
              : "No user selected."}
        </div>
      )}
    </div>
  );
};

export default MakePayment;
