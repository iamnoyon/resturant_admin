/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CardLayout from '@/components/common/CardLayout';
import { useMemo, useState } from 'react';
import { Plus, List, SquarePen, Trash } from 'lucide-react';
import ReactTable from '@/components/common/ReactTable/ReactTable';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import useDebounce from '@/components/hooks/useDebounce';
import {
  useLazyGetPaymentListQuery,
} from '@/store/admin/payment';

const columnHelper = createColumnHelper();

const STATUS_STYLES = {
  paid: 'bg-green-50 text-green-700 border border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  failed: 'bg-red-50 text-red-700 border border-red-200',
  refunded: 'bg-gray-50 text-gray-700 border border-gray-200',
};

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().split('T')[0];
};

const PaymentList = () => {
  const router = useRouter();
  const [pageAndLimit, setPageAndLimit] = useState({ page: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [triggerList, { data: paymentList, isLoading }] =
    useLazyGetPaymentListQuery();

  useEffect(() => {
    triggerList({
      page: pageAndLimit.page,
      limit: pageAndLimit.limit,
      search: debouncedSearch,
    });
  }, [pageAndLimit, debouncedSearch]);


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
      columnHelper.accessor('transactionId', {
        id: 'transactionId',
        header: () => 'Trans ID',
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {info.getValue() || '—'}
          </span>
        ),
      }),
      columnHelper.accessor('adminEmail', {
        id: 'adminEmail',
        header: () => 'Admin User',
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {info.getValue() || '—'}
          </span>
        ),
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        header: () => 'Amount',
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            ৳{info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('method', {
        id: 'method',
        header: () => 'Method',
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm capitalize text-[#1f2937]">
            {info.getValue() || '—'}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: () => 'Status',
        cell: (info) => {
          const status = (info.getValue() || 'pending').toLowerCase();
          const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
          return (
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style}`}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-70" />
              {status}
            </span>
          );
        },
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: () => 'Date',
        cell: (info) => (
          <span className="font-['DM_Sans',sans-serif] text-sm text-[#1f2937]">
            {formatDate(info.getValue())}
          </span>
        ),
      })
    ],
    [pageAndLimit]
  );

  return (
    <CardLayout
      title="Payment List"
      titleIcon={List}
      buttonText="Add Payment"
      buttonIcon={Plus}
      buttonHref="/payments/create"
      buttonPermission="payment:create"
    >
      <ReactTable
        columns={columns}
        dataSource={paymentList?.dataSource || []}
        isLoading={isLoading}
        totalRecords={paymentList?.totalRecords}
        showPageSizeDropdown={paymentList?.totalRecords > pageAndLimit.limit}
        paginationOn={paymentList?.paginationOn}
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

export default PaymentList;
