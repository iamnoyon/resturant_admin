import Loading from '@/components/common/Loading'
import WaiterOrderList from '@/components/modules/admin/OrderManagement/WaiterOrderList'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WaiterOrderList />
    </Suspense>
  )
}

export default Page
