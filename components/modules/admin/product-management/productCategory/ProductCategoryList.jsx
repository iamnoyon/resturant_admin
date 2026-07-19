/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useEffect, useMemo, useState } from 'react';
import { Plus, List, SquarePen, Trash } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import useToaster from '@/components/hooks/useToaster';
import { useDeleteCategoryMutation, useLazyGetCategoryListQuery, useUpdateCategoryByIDMutation } from '@/store/admin/category';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/common/ConfirmationModal';

const columnHelper = createColumnHelper();


const ProductCategoryList = () => {
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster()
    const router = useRouter()


    // API
    const [triggerList, { data: categoryData, isLoading }] = useLazyGetCategoryListQuery();
    const [UpdateCategory] = useUpdateCategoryByIDMutation();
    const [DeleteCategory] = useDeleteCategoryMutation();

    // Trigger API call
    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
        });
    }, [pageAndLimit]);

    // Action handlers
    const handleStatusUpdate = (category, status) => {
        const payload = {
            categoryName: category?.categoryName,
            shortNote: category?.shortNote,
            isActive: status
        }
        UpdateCategory({ id: category?.id, data: payload })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message || 'User status updated successfully!')
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message)
            })
    }

    // delete category
    const handleDeleteItem = () => {
        DeleteCategory(itemId)
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message)
                    setIsModalOpen(false)
                }
            })
    }

    // Columns definition
    const columns = useMemo(
        () =>
            [
                columnHelper.accessor('sl', {
                    id: 'sl',
                    header: () => 'SL No.',
                    cell: (info) => (
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                            {info.row.index + 1}
                        </span>
                    ),
                }),
                columnHelper.accessor('categoryName', {
                    id: 'categoryName',
                    header: () => 'Category Name',
                    cell: (info) => (
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                            {info.getValue()}
                        </span>
                    ),
                    enableSorting: true,
                }),
                columnHelper.accessor('isActive', {
                    id: 'isActive',
                    header: () => 'Status',
                    cell: (info) => {
                        const status = info.getValue();
                        let bgColor = 'bg-gray-500';
                        if (status === true) bgColor = 'bg-[#16A34A]';
                        if (status === false) bgColor = 'bg-[#EF4444]';

                        return (
                            <span className={`inline-block rounded-full px-3 py-1 text-[0.875rem] font-medium text-white ${bgColor}`}>
                                {status ? 'Active' : 'Inactive'}
                            </span>
                        );
                    },
                    enableSorting: true,
                }),
                columnHelper.display({
                    id: 'actions',
                    header: () => 'Actions',
                    cell: (info) => {
                        const category = info.row.original;

                        return (
                            <div className="flex items-center gap-1">
                                <SquarePen
                                    size={16}
                                    className="mr-2 cursor-pointer"
                                    onClick={() => router.push(`/product-management/categories/edit/${category?.id}`)} />


                                <ThreeDotMenu
                                    object={category}
                                    actions={[
                                        {
                                            label: 'Active',
                                            onClick: () => handleStatusUpdate(category, true),
                                            isDisabled: category?.isActive === true
                                        },
                                        {
                                            label: 'Inactive',
                                            onClick: () => handleStatusUpdate(category, false),
                                            isDisabled: category?.isActive === false
                                        },
                                    ]}
                                    isDisabled={false}
                                />
                                <Trash
                                    size={16}
                                    className='hover:text-red-400 hover:cursor-pointer'
                                    onClick={() => {
                                        setIsModalOpen(true)
                                        setItemId(category?.id)
                                    }}
                                />
                            </div>
                        );
                    },
                }),
            ],
        []
    );

    return (
        <CardLayout
            title="Category List"
            titleIcon={List}
            buttonText="Add Category"
            buttonIcon={Plus}
            buttonHref="/product-management/categories/create"
        >
            <ReactTable
                columns={columns}
                dataSource={categoryData?.dataSource || []}
                isLoading={isLoading}
                totalRecords={categoryData?.totalRecords}
                showPageSizeDropdown={categoryData?.totalRecords > pageAndLimit.limit}
                paginationOn={categoryData?.paginationOn}
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

export default ProductCategoryList;