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

const columnHelper = createColumnHelper();

const TableList = () => {
    const router = useRouter();
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: tableList, isLoading }] = useLazyGetTableListQuery();
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
            columnHelper.accessor('tableName', {
                id: 'tableName',
                header: () => 'Table Name',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('totalSeat', {
                id: 'totalSeat',
                header: () => 'Total seats',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('isActive', {
                id: 'isActive',
                header: () => 'Status',
                cell: (info) => {
                    const status = info.getValue();
                    return (
                        <span className={`inline-block rounded-full px-3 py-1 text-[0.875rem] font-medium text-white ${status ? 'bg-[#16A34A]' : 'bg-[#EF4444]'}`}>
                            {status ? 'Active' : 'Inactive'}
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
                                onClick={() => router.push(`/product-management/products/edit/${product?.id}`)} />
                            <ThreeDotMenu
                                object={table}
                                actions={[
                                    {
                                        label: 'Active',
                                        onClick: () => handleStatusUpdate(table, true),
                                        isDisabled: table?.isActive === true
                                    },
                                    {
                                        label: 'Inactive',
                                        onClick: () => handleStatusUpdate(table, false),
                                        isDisabled: table?.isActive === false
                                    },
                                ]}
                                isDisabled={false}
                            />
                            <Trash
                                size={16}
                                className='hover:text-red-400 hover:cursor-pointer'
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setItemId(table?.id)
                                }}
                            />
                        </div>
                    );
                },
            }),
        ],
        [pageAndLimit]
    );

    return (
        <CardLayout
            title="Table List"
            titleIcon={List}
            buttonText="Add Table"
            buttonIcon={Plus}
            buttonHref="/tables/create"
        >
            <ReactTable
                columns={columns}
                dataSource={tableList?.dataSource || []}
                isLoading={isLoading}
                totalRecords={tableList?.totalRecords}
                showPageSizeDropdown={tableList?.totalRecords > pageAndLimit.limit}
                paginationOn={tableList?.paginationOn}
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

export default TableList;
