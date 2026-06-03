"use client"
import CardLayout from '@/components/common/CardLayout'
import { useGetPermissionListQuery } from '@/components/store/admin/role-management';
import Formwrapper from '@/Forms/Formwrapper';
import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineUnlock } from "react-icons/ai";

const RoleManagementPage = () => {
    const { data: permissionList } = useGetPermissionListQuery()
    const methods = useForm({
        defaultValues: {
            userId: '',
            assignRole: '',
            permissions: []
        }
    })
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className=''>
            <CardLayout
                title="Assign Roles & Permissions"
                titleIcon={AiOutlineUnlock}
            >
                <Formwrapper
                    methods={methods}
                    onSubmit={onSubmit}
                >
                    <div className='grid lg:grid-cols-2 gap-5'>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Select User</label>
                            <select
                                {...methods.register('userId')}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            >
                                <option value="">Select a user</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        <div>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Select Role</label>
                            <select
                                {...methods.register('assignRole')}
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        <div className='lg:col-span-2'>
                            <label className='block mb-2 text-sm font-medium text-gray-900'>Assign Permissions</label>
                            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-lg'>
                                {permissionList?.data?.map((permission) => (
                                    <div key={permission.value} className='flex items-center'>
                                        <input
                                            id={permission.value}
                                            type="checkbox"
                                            value={permission.value}
                                            {...methods.register('permissions')}
                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                                        />
                                        <label htmlFor={permission.value} className='ml-2 text-sm text-gray-900'>{permission.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-10 mt-10 lg:col-span-2'>
                            <button type='button' onClick={() => methods.reset()} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                            <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99]'>Save</button>
                        </div>
                    </div>
                </Formwrapper>
            </CardLayout>
        </div>
    )
}

export default RoleManagementPage