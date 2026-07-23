/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, Package, SquarePen, Trash } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import useDebounce from '@/components/hooks/useDebounce';
import { useDeletePackageMutation, useLazyGetPackageListQuery, useUpdatePackageByIDMutation } from '@/store/admin/package';

const columnHelper = createColumnHelper();

const PackageList = () => {
    const router = useRouter();
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: packageList, isLoading }] = useLazyGetPackageListQuery();
    const [updatePackage] = useUpdatePackageByIDMutation();
    const [deletePackage] = useDeletePackageMutation();

    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
            search: debouncedSearch,
        });
    }, [pageAndLimit, debouncedSearch]);

    const handleStatusUpdate = (pkg, status) => {
        const payload = {
            packageName: pkg?.packageName,
            numberOfMonth: pkg?.numberOfMonth,
            price: pkg?.price,
            shortNote: pkg?.shortNote,
            status
        }
        updatePackage({ id: pkg?.id, data: payload })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message || 'Package status updated successfully!')
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message)
            })
    }

    const handleDeleteItem = () => {
        deletePackage(itemId)
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
            columnHelper.accessor('packageName', {
                id: 'packageName',
                header: () => 'Package Name',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('numberOfMonth', {
                id: 'numberOfMonth',
                header: () => 'Duration (Months)',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('price', {
                id: 'price',
                header: () => 'Price',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('status', {
                id: 'status',
                header: () => 'Status',
                cell: (info) => {
                    const status = info.getValue() === 'active' ? true : false;
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
                    const pkg = info.row.original;

                    return (
                        <div className="flex items-center gap-1">
                            <SquarePen size={16} className="mr-2 cursor-pointer"
                                onClick={() => router.push(`/package-management/edit/${pkg?.id}`)} />
                            <ThreeDotMenu
                                object={pkg}
                                actions={[
                                    {
                                        label: 'Active',
                                        onClick: () => handleStatusUpdate(pkg, 'active'),
                                        isDisabled: pkg?.status === 'active'
                                    },
                                    {
                                        label: 'Inactive',
                                        onClick: () => handleStatusUpdate(pkg, 'inactive'),
                                        isDisabled: pkg?.status === 'inactive'
                                    },
                                ]}
                                isDisabled={false}
                            />
                            <Trash
                                size={16}
                                className='hover:text-red-400 hover:cursor-pointer'
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setItemId(pkg?.id)
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
            title="Package List"
            titleIcon={Package}
            buttonText="Add Package"
            buttonIcon={Plus}
            buttonHref="/package-management/create"
        >
            <ReactTable
                columns={columns}
                dataSource={packageList?.dataSource || []}
                isLoading={isLoading}
                totalRecords={packageList?.totalRecords}
                showPageSizeDropdown={packageList?.totalRecords > pageAndLimit.limit}
                paginationOn={packageList?.paginationOn}
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

export default PackageList;
