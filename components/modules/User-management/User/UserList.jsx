/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, List, Edit, Trash2 } from 'lucide-react';
import useBreadcrumb from '@/components/hooks/useBreadcurmb';
import { breadcrumbList } from '@/components/layouts/breadcrumbList';
import { useLazyGetUserListQuery } from '@/components/store/admin/user-management';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import TableSkeleton from '@/components/common/ReactTable/TableSkeleton';

const columnHelper = createColumnHelper();


const UserList = () => {
    useBreadcrumb(breadcrumbList?.userList);
    const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // API
    const [triggerList, { data: userData, isLoading, isFetching }] = useLazyGetUserListQuery();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPageAndLimit((prev) => ({ ...prev, page: 1 }));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Trigger API call
    useEffect(() => {
        triggerList({
            page: pageAndLimit.page,
            limit: pageAndLimit.limit,
            search: debouncedSearch || undefined,
        });
    }, [pageAndLimit, debouncedSearch]);

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
                        if (status === 'active') bgColor = 'bg-[#16A34A]';
                        if (status === 'pending') bgColor = 'bg-[#F59E0B]';
                        if (status === 'inactive') bgColor = 'bg-[#EF4444]';

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
                    cell: (info) => (
                        <div className="flex gap-2">
                            <Link href={`/user-management/users/edit/${info.row.original._id}`}>
                                <button className="text-[#043570] hover:text-[#8b0000] transition-colors p-1">
                                    <Edit size={18} />
                                </button>
                            </Link>
                            <button className="text-[#ef4444] hover:text-[#8b0000] transition-colors p-1">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ),
                }),
            ],
        []
    );

    return (
        <CardLayout
            title="User List"
            titleIcon={List}
            buttonText="Add User"
            buttonIcon={Plus}
            buttonHref="/user-management/users/create"
        >
            {
                (isLoading || isFetching) ? (
                    <TableSkeleton rowLength={10} columnLength={columns?.length || 5} />
                ) : (
                    <ReactTable
                        columns={columns}
                        dataSource={userData?.users || []}
                        totalRecords={userData?.pagination?.total || 0}
                        showPageSizeDropdown={true}
                        paginationOn={true}
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

export default UserList;