import Loading from '@/components/common/Loading'
import WaiterOrder from '@/components/modules/admin/OrderManagement/WaiterOrder'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WaiterOrder />
    </Suspense>
  )
}

export default Page
