"use client";

import NewOrder from '@/components/modules/admin/OrderManagement/NewOrder'
import { List } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#043570]">New Order</h2>
        <button
          onClick={() => router.push('/order/list')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#0A4D99] text-white hover:bg-[#063C76] transition-colors cursor-pointer"
        >
          <List size={16} />
          Order List
        </button>
      </div>
      <NewOrder />
    </div>
  )
}

export default Page
