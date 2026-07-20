"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { User } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { tableSchema } from './schema';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useCreateTableMutation } from '@/store/admin/table';

const CreateTable = () => {
    const router = useRouter()
    const { errorToaster, successToaster } = useToaster();
    //api
    const [Create] = useCreateTableMutation()

    const methods = useForm({
        resolver: zodResolver(tableSchema),
        defaultValues: {
            totalSeat: '',
            tableName: '',
            isActive: true
        }
    });

    const onSubmit = (data) => {
        Create(data)
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
            title="Add Table"
            titleIcon={User}
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
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/tables")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99] text-white'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateTable
