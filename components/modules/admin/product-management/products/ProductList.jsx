/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, List, SquarePen, Trash } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import {
    useDeleteProductMutation,
    useLazyGetProductListQuery,
    useUpdateProductByIDMutation,
    useUpdateStockMutation
} from '@/store/admin/products';
import { useEffect } from 'react';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import InputModal from '@/components/common/InputModal';

const columnHelper = createColumnHelper();

const ProductList = () => {
    const router = useRouter();
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const [isStockModalOpen, setIsStockModalOpen] = useState(false)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: productList, isLoading }] = useLazyGetProductListQuery();
    const [updateProduct] = useUpdateProductByIDMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateStock] = useUpdateStockMutation()

    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
        });
    }, [pageAndLimit]);

    const handleStatusUpdate = (product, status) => {
        const payload = {
            productName: product?.productName,
            categoryId: product?.categoryId,
            description: product?.description,
            costPrice: product?.costPrice,
            soldPrice: product?.soldPrice,
            isActive: status
        }
        updateProduct({ id: product?.id, data: payload })
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
        deleteProduct(itemId)
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message)
                    setIsModalOpen(false)
                }
            })
    }

    // stock update
    const handleStockUpdate = (newStock) => {
        updateStock({ id: itemId, data: { stock: Number(newStock) } })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message || 'Stock updated successfully!')
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message)
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
            columnHelper.accessor('productName', {
                id: 'productName',
                header: () => 'Product Name',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
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
            }),
            columnHelper.accessor('costPrice', {
                id: 'costPrice',
                header: () => 'Cost',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ৳{info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('soldPrice', {
                id: 'soldPrice',
                header: () => 'Sell',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        ৳{info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('stock', {
                id: 'stock',
                header: () => 'Stock',
                cell: (info) => {
                    const product = info.row.original;
                    return (
                        <button
                            onClick={() => {
                                setItemId(product?.id)
                                setIsStockModalOpen(true);
                            }}
                            className="rounded bg-orange-500 px-3 py-1 font-['DM_Sans',sans-serif] text-xs font-medium text-white transition-colors hover:bg-orange-400 cursor-pointer flex justify-center items-center gap-2"
                        >
                            <span>{info.getValue()}</span>
                            <span>Update Stock</span>
                        </button>
                    );
                },
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
                            <Trash
                                size={16}
                                className='hover:text-red-400 hover:cursor-pointer'
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setItemId(product?.id)
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
            title="Product List"
            titleIcon={List}
            buttonText="Add Product"
            buttonIcon={Plus}
            buttonHref="/product-management/products/create"
        >
            <ReactTable
                columns={columns}
                dataSource={productList?.dataSource || []}
                isLoading={isLoading}
                totalRecords={productList?.totalRecords}
                showPageSizeDropdown={productList?.totalRecords > pageAndLimit.limit}
                paginationOn={productList?.paginationOn}
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
            <InputModal
                title='New quantity will be added.'
                inputLabel='Stock Quantity'
                inputType='number'
                inputPlaceholder='Enter New quantity'
                buttonText='Update'
                isOpen={isStockModalOpen}
                onClose={() => setIsStockModalOpen(false)}
                onSubmit={handleStockUpdate}
            />
        </CardLayout>
    );
};

export default ProductList;
