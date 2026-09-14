/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardLayout from "@/components/common/CardLayout";
import { useMemo, useEffect, useState } from "react";
import { List, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactTable from "@/components/common/ReactTable/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import useDebounce from "@/components/hooks/useDebounce";
import { useLazyGetWaiterOrderListQuery } from "@/store/admin/order";

const columnHelper = createColumnHelper();

const WaiterOrderList = () => {
  const router = useRouter();
  const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [triggerList, { data: orderList, isLoading }] =
    useLazyGetWaiterOrderListQuery();

  useEffect(() => {
    triggerList({
      page: pageAndLimit.page,
      limit: pageAndLimit.limit,
      search: debouncedSearch,
    });
  }, [pageAndLimit, debouncedSearch]);

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
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("tableName", {
        id: "tableName",
        header: () => "Table",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("totalBill", {
        id: "totalBill",
        header: () => "Total Bill",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            ৳{info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("discount", {
        id: "discount",
        header: () => "Discount",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            ৳{info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("subTotal", {
        id: "subTotal",
        header: () => "Sub Total",
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            ৳{info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("billStatus", {
        id: "billStatus",
        header: () => "Payment",
        cell: (info) => {
          const isPaid = info.getValue() === "paid";
          return (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${
                isPaid
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isPaid ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {isPaid ? "Paid" : "Unpaid"}
            </span>
          );
        },
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
                onClick={() => router.push(`/waiter-order/edit/${order?.id}`)}
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
    </div>
  );
};

export default WaiterOrderList;
