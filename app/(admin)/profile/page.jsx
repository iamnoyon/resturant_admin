import ProfilePage from '@/components/modules/Profile/ProfilePage'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  )
}

export default page