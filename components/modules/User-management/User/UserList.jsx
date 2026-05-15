"use client";

import CardLayout from '@/components/common/CardLayout'
import React, { useEffect } from 'react'
import { Plus, List } from "lucide-react";
import useBreadcrumb from '@/components/hooks/useBreadcurmb';
import { breadcrumbList } from '@/components/layouts/breadcrumbList';
import { useLazyGetUserListQuery } from '@/components/store/admin/user-management';

const UserList = () => {
    useBreadcrumb(breadcrumbList?.userList);

    //api 
    const [triggerList, {data: userData}] = useLazyGetUserListQuery();

    useEffect(()=>{
        triggerList({

        })
    }, [])
    
    return (
        <CardLayout
            title="User List"
            titleIcon={List}
            buttonText="Add User"
            buttonIcon={Plus}
            buttonHref="/user-management/users/create"
        >
            Hi
        </CardLayout>
    )
}

export default UserList