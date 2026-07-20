/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, List, SquarePen, Trash } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import useDebounce from '@/components/hooks/useDebounce';
import { useDeleteTableMutation, useLazyGetTableListQuery, useUpdateTableByIDMutation } from '@/store/admin/table';
import { useLazyGetOrderListQuery } from '@/store/admin/order';

const columnHelper = createColumnHelper();

const OrderList = () => {
    const router = useRouter();
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: orderList, isLoading }] = useLazyGetOrderListQuery();
    const [updateTable] = useUpdateTableByIDMutation();
    const [deleteTable] = useDeleteTableMutation();

    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
            search: debouncedSearch,
        });
    }, [pageAndLimit, debouncedSearch]);

    const handleStatusUpdate = (table, status) => {
        const payload = {
            tableName: table?.tableName,
            totalSeat: table?.totalSeat,
            isActive: status
        }
        updateTable({ id: table?.id, data: payload })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message || 'Product status updated successfully!')
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message)
            })
    }

    // delete category
    const handleDeleteItem = () => {
        deleteTable(itemId)
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message)
                    setIsModalOpen(false)
                }
            })
    }

    const columns = useMemo(
        () => [
            columnHelper.accessor('sl', {
                id: 'sl',
                header: () => 'SL No.',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {(pageAndLimit.page - 1) * pageAndLimit.limit + info.row.index + 1}
                    </span>
                ),
            }),
            columnHelper.accessor('orderId', {
                id: 'orderId',
                header: () => 'Order ID',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('totalBill', {
                id: 'totalBill',
                header: () => 'Total Bill',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ৳{info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('discount', {
                id: 'discount',
                header: () => 'Discount',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ৳{info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('subTotal', {
                id: 'subTotal',
                header: () => 'Sub Total',
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
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border
          ${isPaid
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${isPaid ? "bg-green-500" : "bg-red-500"
                                    }`}
                            />
                            {isPaid ? "Paid" : "Unpaid"}
                        </span>
                    );
                },
            }),
            columnHelper.display({
                id: 'actions',
                header: () => 'Actions',
                cell: (info) => {
                    const table = info.row.original;

                    return (
                        <div className="flex items-center gap-1">
                            <SquarePen size={16} className="mr-2 cursor-pointer"
                                onClick={() => router.push(`/tables/edit/${table?.id}`)} />
                        </div>
                    );
                },
            }),
        ],
        [pageAndLimit]
    );

    return (
        <CardLayout
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
            <ConfirmationModal
                title='Delete this record permanently?'
                isOpen={isModalOpen}
                firstButtonText='Delete'
                onClose={() => setIsModalOpen(false)}
                firstButtonAction={handleDeleteItem}
                firstButtonVariant='danger'
            />
        </CardLayout>
    );
};

export default OrderList;
