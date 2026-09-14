import Loading from '@/components/common/Loading'
import TokenPrint from '@/components/modules/admin/OrderManagement/TokenPrint'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TokenPrint />
    </Suspense>
  )
}

export default Page
