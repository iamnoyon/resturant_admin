"use client";

import CardLayout from '@/components/common/CardLayout'
import React, { useEffect } from 'react'
import { Vault } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { tableSchema } from './schema';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useGetTableByIdQuery, useUpdateTableByIDMutation } from '@/store/admin/table';
import FormRadioGroup from '@/Forms/FormRadioGroup';

const EditTable = () => {
    const router = useRouter();
    const id = useParams()?.id;
    const { errorToaster, successToaster } = useToaster();
    //api
    const [Ureate] = useUpdateTableByIDMutation()
    const {data: tableDetails} = useGetTableByIdQuery({id}, {skip: !id})

    const methods = useForm({
        resolver: zodResolver(tableSchema),
        defaultValues: {
            totalSeat: '',
            tableName: '',
            isActive: true
        }
    });

    useEffect(()=>{
        if(tableDetails?.success){
            methods.reset({
                totalSeat: tableDetails?.data?.totalSeat,
                tableName: tableDetails?.data?.tableName,
                isActive: tableDetails?.data?.isActive
            })
        }
    }, [tableDetails])

    const onSubmit = (data) => {
        Ureate({ id, data })
            .unwrap()
            .then((res) => {
                if (res?.success || res?.status_code === 201) {
                    successToaster("Table created successfully!");
                    router.push("/tables");
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message || "Failed to create table.");
                console.log(err);
            })
    }

    return (
        <CardLayout
            title="Edit Table"
            titleIcon={Vault}
        >
            <Formwrapper
                methods={methods}
                onSubmit={onSubmit}
            >
                <div className='grid lg:grid-cols-2 gap-5'>
                    <FormInput
                        name="tableName"
                        label="Table name"
                        placeholder='T-1'
                        required
                    />
                    <FormInput
                        name="totalSeat"
                        label="Total seat"
                        placeholder='4'
                        required
                    />
                    <FormRadioGroup
                        name="isActive"
                        label="Status"
                        required
                        columns={{ sm: 1, md: 2 }}
                        options={[
                            { label: 'Active', id: true },
                            { label: 'Inactive', id: false },
                        ]}
                    />
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/tables")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99] text-white'>Update</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default EditTable
