/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, List, SquarePen } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import TableSkeleton from '@/components/common/ReactTable/TableSkeleton';
import { useLazyGetProductListQuery } from '@/store/admin/products';
import { useEffect } from 'react';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';

const columnHelper = createColumnHelper();

const ProductList = () => {
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');

    const [triggerList, {data: productData, isLoading }] = useLazyGetProductListQuery();

    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
        });
    }, [pageAndLimit]);

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
            columnHelper.accessor('price', {
                id: 'price',
                header: () => 'Price',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ${info.getValue()}
                    </span>
                ),
                enableSorting: true,
            }),
            columnHelper.accessor('stock', {
                id: 'stock',
                header: () => 'Stock',
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
                    return (
                        <span className={`inline-block rounded-full px-3 py-1 text-[0.875rem] font-medium text-white ${status ? 'bg-[#16A34A]' : 'bg-[#EF4444]'}`}>
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
                                    const product = info.row.original;
            
                                    return (
                                        <div className="flex items-center gap-1">
                                            <SquarePen size={16} className="mr-2 cursor-pointer"
                                                onClick={() => router.push(`/product-management/products/edit/${product?.id}`)} />
                                            <ThreeDotMenu
                                                object={product}
                                                actions={[
                                                    {
                                                        label: 'Active',
                                                        onClick: () => handleStatusUpdate(product, true),
                                                        isDisabled: product?.isActive === true
                                                    },
                                                    {
                                                        label: 'Inactive',
                                                        onClick: () => handleStatusUpdate(product, false),
                                                        isDisabled: product?.isActive === false
                                                    },
                                                ]}
                                                isDisabled={false}
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
            title="Product List"
            titleIcon={List}
            buttonText="Add Product"
            buttonIcon={Plus}
            buttonHref="/product-management/products/create"
        >
            {isLoading ? (
                <TableSkeleton rowLength={10} columnLength={columns?.length || 5} />
            ) : (
                <ReactTable
                    columns={columns}
                    dataSource={productData?.dataSource || []}
                    totalRecords={productData?.totalRecords}
                    paginationOn={productData?.paginationOn}
                    pageAndLimit={productData?.pageAndLimit ?? pageAndLimit}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onPageLimitChange={({ page, limit }) => {
                        setPageAndLimit({ page, limit });
                    }}
                />
            )}
        </CardLayout>
    );
};

export default ProductList;
