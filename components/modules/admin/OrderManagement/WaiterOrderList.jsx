/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardLayout from "@/components/common/CardLayout";
import { useMemo, useEffect, useState } from "react";
import { List } from "lucide-react";
import { useSelector } from "react-redux";
import ReactTable from "@/components/common/ReactTable/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import useDebounce from "@/components/hooks/useDebounce";
import { useLazyGetOrderTokenListQuery } from "@/store/admin/order";

const columnHelper = createColumnHelper();

const WaiterOrderList = () => {
  const business = useSelector((state) => state?.user?.business);
  const businessId = business?.id;
  const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("");
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
