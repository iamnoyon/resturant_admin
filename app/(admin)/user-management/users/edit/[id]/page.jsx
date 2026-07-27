import UserEdit from '@/components/modules/User-management/User/UserEdit'
import UserPermissionUpdate from '@/components/modules/User-management/User/UserPermissionUpdate'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
      <UserEdit />
      <UserPermissionUpdate />
    </div>
  )
}

export default page