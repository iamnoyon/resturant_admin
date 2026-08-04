"use client"

import StatCard from '@/components/common/StatCard'
import React from 'react'
import dummyStats from './dummyData'
import { useGetAdminSummaryCardQuery } from '@/store/admin/dashboard'

const AdminDashboard = () => {
    const {data: summaryCards, isLoading, isError} = useGetAdminSummaryCardQuery()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
        <StatCard
          key={1}
          title={summaryCards?.[0]?.title}
          value={summaryCards?.[0]?.value}
          iconName={summaryCards?.[0]?.iconName}
          trendValue={summaryCards?.[0]?.trendValue}
          trend={summaryCards?.[0]?.trend}
          borderColor={summaryCards?.[0]?.borderColor}
        />
    </div>
  )
}

export default AdminDashboard