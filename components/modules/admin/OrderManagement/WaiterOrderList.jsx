/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardLayout from "@/components/common/CardLayout";
import { useMemo, useEffect, useState } from "react";
import { List, SquarePen, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ReactTable from "@/components/common/ReactTable/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import useDebounce from "@/components/hooks/useDebounce";
import {
  useLazyGetOrderTokenListQuery,
  useUpdateTokenStatusMutation,
} from "@/store/admin/order";
import StatusProgress, {
  STATUS_BADGE,
} from "@/components/common/StatusProgress";
import useToaster from "@/components/hooks/useToaster";

const columnHelper = createColumnHelper();

const WaiterOrderList = () => {
  const router = useRouter();
  const business = useSelector((state) => state?.user?.business);
  const businessId = business?.id;
  const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [triggerList, { data: orderList, isLoading }] =
    useLazyGetOrderTokenListQuery();
  const [updateTokenStatus, { isLoading: updatingStatus }] =
    useUpdateTokenStatusMutation();
  const { successToaster, errorToaster } = useToaster();

  useEffect(() => {
    if (!businessId) return;
    triggerList({
      page: pageAndLimit.page,
      limit: pageAndLimit.limit,
      search: debouncedSearch,
      businessId,
    });
  }, [pageAndLimit, debouncedSearch, businessId]);

  const handleMarkServed = async (token) => {
    if (token.status === "served") return;
    try {
      const res = await updateTokenStatus({
        id: token.id,
        status: "served",
      }).unwrap();
      successToaster(res?.message || "Token marked as served");
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              tokens: (prev.tokens || []).map((t) =>
                t.id === token.id ? { ...t, status: "served" } : t
              ),
            }
          : prev
      );
    } catch (err) {
      errorToaster(err?.data?.message || "Failed to update token status");
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("sl", {
        id: "sl",
        header: () => "SL No.",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {(pageAndLimit.page - 1) * pageAndLimit.limit + info.row.index + 1}
          </span>
        ),
      }),
      columnHelper.accessor("orderId", {
        id: "orderId",
        header: () => "Order ID",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {info.getValue() || "—"}
          </span>
        ),
      }),
      columnHelper.accessor("tableName", {
        id: "tableName",
        header: () => "Table",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {info.getValue() || "—"}
          </span>
        ),
      }),
      columnHelper.accessor("tokens", {
        id: "status",
        header: () => "Status",
        cell: (info) => (
          <StatusProgress
            tokens={info.getValue()}
            className="min-w-[180px]"
            onView={() => setSelectedOrder(info.row.original)}
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: (info) => {
          const order = info.row.original;
          return (
            <div className="flex items-center gap-1">
              <SquarePen
                size={16}
                className="cursor-pointer text-[#0A4D99] hover:text-[#063C76]"
                onClick={() =>
                  router.push(`/waiter-order/edit/${order?.orderId}`)
                }
              />
            </div>
          );
        },
      }),
    ],
    [pageAndLimit],
  );

  return (
    <div>
      <CardLayout
      title='Order List'
      titleIcon={List}
      buttonText="New Order"
      buttonHref="/waiter-order"
      >
        <ReactTable
          columns={columns}
          dataSource={orderList?.dataSource || []}
          isLoading={isLoading}
          totalRecords={orderList?.totalRecords}
          showPageSizeDropdown={orderList?.totalRecords > pageAndLimit.limit}
          paginationOn={orderList?.paginationOn}
          pageAndLimit={pageAndLimit}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPageLimitChange={({ page, limit }) => {
            setPageAndLimit({ page, limit });
          }}
        />
      </CardLayout>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3 className="font-['DM_Sans',sans-serif] text-lg font-semibold text-[#043570]">
                  Order Tokens
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {selectedOrder.orderId || "—"}
                  {selectedOrder.tableName ? ` • ${selectedOrder.tableName}` : ""}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-5 py-3">
              {(selectedOrder.tokens || []).length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  No tokens found
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {selectedOrder.tokens.map((token) => {
                    const isServed = token.status === "served";
                    return (
                      <li
                        key={token.id}
                        className="flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                          {token.productName}
                          <span className="ml-1 text-xs text-gray-400">
                            ×{token.quantity}
                          </span>
                        </span>
                        <button
                          type="button"
                          disabled={isServed || updatingStatus}
                          onClick={() => handleMarkServed(token)}
                          title={isServed ? "Already served" : "Mark as served"}
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors ${
                            STATUS_BADGE[token.status] ||
                            "bg-gray-50 text-gray-600 border-gray-200"
                          } ${
                            isServed
                              ? "cursor-not-allowed opacity-70"
                              : "cursor-pointer hover:opacity-80"
                          }`}
                        >
                          {token.status}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaiterOrderList;
