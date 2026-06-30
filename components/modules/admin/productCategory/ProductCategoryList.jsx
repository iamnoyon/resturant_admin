/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, List } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import TableSkeleton from '@/components/common/ReactTable/TableSkeleton';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import useToaster from '@/components/hooks/useToaster';
import { useGetCategoryListQuery, useUpdateCategoryByIDMutation } from '@/store/admin/category';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper();


const ProductCategoryList = () => {
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const {successToaster, errorToaster} = useToaster()
    const router = useRouter()


    // API
    const {data: categoryData, isLoading} = useGetCategoryListQuery()
    const [UpdateCategory] = useUpdateCategoryByIDMutation();

    // Action handlers
    const handleStatusUpdate = (category, status) =>{
        const payload = {
            name: category?.name,
            slug: category?.slug,
            image: category?.image,
            description: category?.description,
            isActive: status
        }
        UpdateCategory({id:category?.id, data: payload})
        .unwrap()
        .then((res)=>{
            if(res?.success){
                successToaster(res?.message || 'User status updated successfully!')
            }
        })
        .catch((err)=>{
            errorToaster(err?.data?.message)
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
                columnHelper.accessor('name', {
                    id: 'name',
                    header: () => 'Name',
                    cell: (info) => (
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                            {info.getValue()}
                        </span>
                    ),
                    enableSorting: true,
                }),
                columnHelper.accessor('slug', {
                    id: 'slug',
                    header: () => 'Slug',
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
                            <ThreeDotMenu
                                object={category}
                                actions={[
                                    {
                                        label: 'Edit',
                                        onClick: () => router.push(`/product-management/categories/edit/${category?.id}`),
                                    },
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
            {
                (isLoading) ? (
                    <TableSkeleton rowLength={10} columnLength={columns?.length || 5} />
                ) : (
                    <ReactTable
                        columns={columns}
                        dataSource={categoryData?.data || []}
                        // totalRecords={userData?.pagination?.total || 0}
                        // showPageSizeDropdown={userData?.pagination?.total > pageAndLimit.limit ? true : false}
                        // paginationOn={userData?.pagination?.total > 0 ? true : false}
                        // pageAndLimit={pageAndLimit}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onPageLimitChange={({ page, limit }) => {
                            setPageAndLimit({ page, limit });
                        }}
                    />
                )
            }
        </CardLayout>
    );
};

export default ProductCategoryList;