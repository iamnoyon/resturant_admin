import Loading from '@/components/common/Loading'
import WaiterOrderEdit from '@/components/modules/admin/OrderManagement/WaiterOrderEdit'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <WaiterOrderEdit />
    </Suspense>
  )
}

export default Page
