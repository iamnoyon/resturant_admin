/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useEffect, useMemo, useState } from 'react';
import { Plus, List } from 'lucide-react';
import { useLazyGetUserListQuery, useUpdateUserStatusMutation } from '@/store/admin/user-management';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import TableSkeleton from '@/components/common/ReactTable/TableSkeleton';
import ThreeDotMenu from '@/components/common/ThreeDotMenu';
import useToaster from '@/components/hooks/useToaster';

const columnHelper = createColumnHelper();


const ProductList = () => {
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const {successToaster} = useToaster()


    // API
    const [triggerList, { data: userData, isLoading }] = useLazyGetUserListQuery();
    const [Update] = useUpdateUserStatusMutation();

    // Action handlers
    const handleStatusUpdate = (id, status) =>{
        Update({id, status})
        .unwrap()
        .then((res)=>{
            if(res?.success == true, res?.status_code == 200){
                successToaster(res?.message || 'User status updated successfully!')
            }
        })
    }

    // Trigger API call
    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
        });
    }, [pageAndLimit]);

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
                columnHelper.accessor('email', {
                    id: 'email',
                    header: () => 'Email',
                    cell: (info) => (
                        <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
                            {info.getValue()}
                        </span>
                    ),
                    enableSorting: true,
                }),
                columnHelper.accessor('role', {
                    id: 'role',
                    header: () => 'Role',
                    cell: (info) => {
                        const role = info.getValue();
                        return (
                            <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937] capitalize">
                                {role ? role : '-'}
                            </span>
                        );
                    },
                    enableSorting: true,
                }),
                columnHelper.accessor('status', {
                    id: 'status',
                    header: () => 'Status',
                    cell: (info) => {
                        const status = info.getValue();
                        let bgColor = 'bg-gray-500';
                        if (status === 'approved') bgColor = 'bg-[#16A34A]';
                        if (status === 'pending') bgColor = 'bg-[#F59E0B]';
                        if (status === 'suspended') bgColor = 'bg-[#EF4444]';

                        return (
                            <span className={`inline-block rounded-full px-3 py-1 text-[0.875rem] font-medium text-white ${bgColor}`}>
                                {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}
                            </span>
                        );
                    },
                    enableSorting: true,
                }),
                columnHelper.display({
                    id: 'actions',
                    header: () => 'Actions',
                    cell: (info) => {
                        const user = info.row.original;

                        return (
                            <ThreeDotMenu
                                object={user}
                                actions={[
                                    {
                                        label: 'Approve',
                                        onClick: () => handleStatusUpdate(info?.row?.original?.id, 'approved'),
                                        isDisabled: user?.status === "approved" || user?.status === "suspended",
                                    },
                                    {
                                        label: 'Suspend',
                                        onClick: () => handleStatusUpdate(info?.row?.original?.id, 'suspended'),
                                        isDisabled: user?.status === "pending" || user?.status === "suspended",
                                    },
                                    {
                                        label: 'Invitation',
                                        onClick: () => handleStatusUpdate(info?.row?.original?.id, "invitation"),
                                        isDisabled: user?.status === "approved" || user?.status === "pending",
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
            title="Product List"
            titleIcon={List}
            buttonText="Add Product"
            buttonIcon={Plus}
            buttonHref="/product-management/products/create"
        >
            {
                (isLoading) ? (
                    <TableSkeleton rowLength={10} columnLength={columns?.length || 5} />
                ) : (
                    <ReactTable
                        columns={columns}
                        dataSource={userData?.users || []}
                        totalRecords={userData?.pagination?.total || 0}
                        showPageSizeDropdown={userData?.pagination?.total > pageAndLimit.limit ? true : false}
                        paginationOn={userData?.pagination?.total > 0 ? true : false}
                        pageAndLimit={pageAndLimit}
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

export default ProductList;