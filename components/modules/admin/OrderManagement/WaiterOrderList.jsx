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
import { useLazyGetOrderTokenListQuery } from "@/store/admin/order";

const columnHelper = createColumnHelper();

const STATUS_FLOW = [
  { key: "cooking", label: "Cooking", bar: "bg-amber-500" },
  { key: "ready", label: "Ready", bar: "bg-blue-500" },
  { key: "served", label: "Served", bar: "bg-green-500" },
];

const STATUS_BADGE = {
  cooking: "bg-amber-50 text-amber-700 border-amber-200",
  ready: "bg-blue-50 text-blue-700 border-blue-200",
  served: "bg-green-50 text-green-700 border-green-200",
};

const StatusProgress = ({ tokens = [], onView }) => {
  const total = tokens.length || 0;
  const counts = STATUS_FLOW.map((status) => ({
    ...status,
    count: tokens.filter((t) => t.status === status.key).length,
  }));
  return (
    <div
      onClick={onView}
      className="w-full min-w-[180px] cursor-pointer"
    >
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        {counts.map((status) =>
          status.count > 0 ? (
            <div
              key={status.key}
              className={`h-full ${status.bar} transition-all`}
              style={{ width: `${(status.count / total) * 100}%` }}
            />
          ) : null
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        {counts.map((status) => (
          <span
            key={status.key}
            className="flex items-center gap-1 text-[11px] text-gray-500"
          >
            <span className={`h-2 w-2 rounded-full ${status.bar}`} />
            {status.label} {status.count}
          </span>
        ))}
      </div>
    </div>
  );
};

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

  useEffect(() => {
    if (!businessId) return;
    triggerList({
      page: pageAndLimit.page,
      limit: pageAndLimit.limit,
      search: debouncedSearch,
      businessId,
    });
  }, [pageAndLimit, debouncedSearch, businessId]);

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
                  {selectedOrder.tokens.map((token) => (
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
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
                          STATUS_BADGE[token.status] ||
                          "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {token.status}
                      </span>
                    </li>
                  ))}
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
