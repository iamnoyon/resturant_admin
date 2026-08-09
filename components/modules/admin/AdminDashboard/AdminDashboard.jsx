"use client"

import StatCard from '@/components/common/StatCard'
import React from 'react'
import dummyStats from './dummyData'
import { useGetAdminSummaryCardQuery } from '@/store/admin/dashboard'
import { BanknoteArrowDown, ShieldCheck } from 'lucide-react'

const AdminDashboard = () => {
    const {data: summaryCards, isLoading, isError} = useGetAdminSummaryCardQuery()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        <StatCard
          key={1}
          title='Total Revenue'
          value={summaryCards?.data?.totalRevenue?.value}
          iconName={ShieldCheck}
          trendValue={summaryCards?.data?.totalRevenue?.change}
          trend={summaryCards?.data?.totalRevenue?.trend}
          borderColor='border-b-blue-600'
        />
        <StatCard
          key={2}
          title='Others Expense'
          value={summaryCards?.data?.totalExpenses?.value}
          iconName={BanknoteArrowDown}
          trendValue={summaryCards?.data?.totalExpenses?.change}
          trend={summaryCards?.data?.totalExpenses?.trend}
          borderColor='border-b-red-600'
        />
        <StatCard
          key={3}
          title='Total Orders'
          value={summaryCards?.data?.totalOrders?.value}
          iconName={summaryCards?.[0]?.iconName}
          trendValue={summaryCards?.data?.totalOrders?.change}
          trend={summaryCards?.data?.totalOrders?.trend}
          borderColor='border-b-green-700'
        />
        <StatCard
          key={4}
          title='Net Profit'
          value={summaryCards?.data?.netProfit?.value}
          iconName={summaryCards?.[0]?.iconName}
          trendValue={summaryCards?.data?.netProfit?.change}
          trend={summaryCards?.data?.netProfit?.trend}
          borderColor='border-b-purple-700'
        />
        <StatCard
          key={5}
          title='Total Discount'
          value={summaryCards?.data?.totalDiscount?.value}
          iconName={summaryCards?.[0]?.iconName}
          trendValue={summaryCards?.data?.totalDiscount?.change}
          trend={summaryCards?.data?.totalDiscount?.trend}
          borderColor='border-b-lime-600'
        />
    </div>
  )
}

export default AdminDashboard