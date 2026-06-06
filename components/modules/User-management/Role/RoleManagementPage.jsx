"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUnlock } from "react-icons/ai";

import CardLayout from "@/components/common/CardLayout";
import Formwrapper from "@/Forms/Formwrapper";
import {
    useGetPermissionListQuery,
    useGetUserDropdownWithPermissionsQuery,
    useUpdateUserRoleAndPermissionsMutation,
} from "@/components/store/admin/role-management";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "./schema";
import FormSelect from "@/Forms/FormSelect";
import FormCheckboxGroup from "@/Forms/FormCheckboxGroup";
import useToaster from "@/components/hooks/useToaster";

const RoleManagementPage = () => {
    const { successToaster } = useToaster();
    const { data: permissionList } = useGetPermissionListQuery();
    const { data: userDropdown } = useGetUserDropdownWithPermissionsQuery();
    const [update] = useUpdateUserRoleAndPermissionsMutation()

    const methods = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            userId: "",
            assignRole: "",
            permissions: [],
        },
    });

    const selectedUserId = methods.watch("userId");

    useEffect(() => {
        if (!selectedUserId || !userDropdown?.data) {
            methods.setValue("assignRole", "");
            methods.setValue("permissions", []);
            return;
        }

        const selectedUser = userDropdown.data.find(
            (user) => String(user.id) === String(selectedUserId)
        );

        if (!selectedUser) return;

        methods.setValue("assignRole", selectedUser.role || "");

        methods.setValue(
            "permissions",
            selectedUser.permissions || []
        );

        methods.setValue(
            "assignRole",
            selectedUser?.role || ''
        )
    }, [selectedUserId, userDropdown, methods]);

    const onSubmit = (data) => {
        const payload = {
            userId: data?.userId,
            role: data?.assignRole,
            permissions: data?.permissions
        }

        update(payload)
        .unwrap()
        .then((res)=>{
            if(res?.success || res?.status_code == 200){
                successToaster(res?.message || 'Role & Permissios are updated.')
                methods.reset({});
            }
        })

    };

    return (
        <div>
            <CardLayout
                title="Assign Roles & Permissions"
                titleIcon={AiOutlineUnlock}
            >
                <Formwrapper methods={methods} onSubmit={onSubmit}>
                    <div className="grid lg:grid-cols-2 gap-5">
                        <FormSelect
                            name="userId"
                            label="Select User"
                            options={userDropdown?.data || []}
                            labelKey="name"
                            required
                        />

                        {/* Role */}
                        <FormSelect
                            name="assignRole"
                            label="Select Role"
                            required
                            options={[
                                { label: 'Admin', id: 'admin' },
                                { label: 'Manager', id: 'manager' },
                                { label: 'Employee', id: 'employee' },
                                {label: 'Owner', id: 'owner'}
                            ]}
                        />
                    </div>

                    <div className="mt-10">
                        {/* Permissions */}
                        <FormCheckboxGroup
                            name="permissions"
                            label="Select Permissions"
                            labelKey="label"
                            valueKey="value"
                            required
                            options={permissionList?.data}
                            columns={{
                                sm: 1,
                                md: 2,
                                lg: 4,
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-10 mt-10 lg:col-span-2">
                        <button
                            type="button"
                            onClick={() => methods.reset()}
                            className="w-40 rounded font-semibold py-2 hover:cursor-pointer hover:bg-[#0A4D99] hover:text-white border text-[#0A4D99] border-[#0A4D99]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-40 rounded font-semibold py-2 bg-[#0A4D99] text-white hover:cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </Formwrapper>
            </CardLayout>
        </div>
    );
};

export default RoleManagementPage;