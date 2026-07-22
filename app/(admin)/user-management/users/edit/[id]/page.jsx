import UserEdit from '@/components/modules/User-management/User/UserEdit'
import UserPermissionUpdate from '@/components/modules/User-management/User/UserPermissionUpdate'
import React from 'react'

const page = () => {
  return (
    <div>
      <UserEdit />
      <UserPermissionUpdate />
    </div>
  )
}

export default page