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
import { useLazyGetBusinessListForSuperadminQuery, useUpdateBusinessInfoForSuperadminMutation } from '@/store/admin/businesses';

const columnHelper = createColumnHelper();

const BusinessesList = () => {
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemId, setItemId] = useState(null)
    const { successToaster, errorToaster } = useToaster();

    const [triggerList, { data: businessList, isLoading }] = useLazyGetBusinessListForSuperadminQuery();
    const [updateBusiness] = useUpdateBusinessInfoForSuperadminMutation();

    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
            search: debouncedSearch,
        });
    }, [pageAndLimit, debouncedSearch]);

    const handleStatusUpdate = (id, status) => {
        updateBusiness({ id: id, data: {subscription: status} })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.message || 'Business status updated successfully!')
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
            columnHelper.accessor('businessName', {
                id: 'businessName',
                header: () => 'Business Name',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('subStartDate', {
                id: 'subStartDate',
                header: () => 'Start Date',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('subEndDate', {
                id: 'subEndDate',
                header: () => 'End Date',
                cell: (info) => (
                    <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor('subscription', {
                id: 'subscription',
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
                            <ThreeDotMenu
                                object={pkg}
                                actions={[
                                    {
                                        label: 'Active',
                                        onClick: () => handleStatusUpdate(pkg?.id, 'active'),
                                        isDisabled: pkg?.subscription === 'active'
                                    },
                                    {
                                        label: 'Inactive',
                                        onClick: () => handleStatusUpdate(pkg?.id, 'inactive'),
                                        isDisabled: pkg?.subscription === 'inactive'
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
            title="Business List"
            titleIcon={Package}
        >
            <ReactTable
                columns={columns}
                dataSource={businessList?.dataSource || []}
                isLoading={isLoading}
                totalRecords={businessList?.totalRecords}
                showPageSizeDropdown={businessList?.totalRecords > pageAndLimit.limit}
                paginationOn={businessList?.paginationOn}
                pageAndLimit={pageAndLimit}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onPageLimitChange={({ page, limit }) => {
                    setPageAndLimit({ page, limit });
                }}
            />
        </CardLayout>
    );
};

export default BusinessesList;
