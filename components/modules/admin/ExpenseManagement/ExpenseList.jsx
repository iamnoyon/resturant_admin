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
import { useDeleteTableMutation, useUpdateTableByIDMutation } from '@/store/admin/table';
import { useLazyGetExpenseListQuery } from '@/store/admin/expense';

const columnHelper = createColumnHelper();

const ExpenseList = () => {
    const router = useRouter();
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: expenseList, isLoading }] = useLazyGetExpenseListQuery();
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
            columnHelper.accessor('expenseName', {
                id: 'expenseName',
                header: () => 'Expense Name',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('expenseValue', {
                id: 'expenseValue',
                header: () => 'Expense value',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ৳{info.getValue()}
                    </span>
                ),
            }),
            columnHelper.display({
                id: 'actions',
                header: () => 'Actions',
                cell: (info) => {
                    const table = info.row.original;

                    return (
                        <div className="flex items-center gap-1">
                            <SquarePen size={16} className="mr-2 cursor-pointer"
                                onClick={() => router.push(`/expenses/edit/${table?.id}`)} />
                        </div>
                    );
                },
            }),
        ],
        [pageAndLimit]
    );

    return (
        <CardLayout
            title="Expense List"
            titleIcon={List}
            buttonText="Add Expense"
            buttonIcon={Plus}
            buttonHref="/expenses/create"
        >
            <ReactTable
                columns={columns}
                dataSource={expenseList?.dataSource || []}
                isLoading={isLoading}
                totalRecords={expenseList?.totalRecords}
                showPageSizeDropdown={expenseList?.totalRecords > pageAndLimit.limit}
                paginationOn={expenseList?.paginationOn}
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

export default ExpenseList;
