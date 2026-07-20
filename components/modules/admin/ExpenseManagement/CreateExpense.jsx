"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { Banknote } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { expenseSchema } from './schema';
import { useCreateExpenseMutation } from '@/store/admin/expense';

const CreateExpense = () => {
    const router = useRouter()
    const { errorToaster, successToaster } = useToaster();
    //api
    const [Create] = useCreateExpenseMutation()

    const methods = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            expenseName: '',
            expenseValue: '',
        }
    });

    const onSubmit = (data) => {
        Create(data)
            .unwrap()
            .then((res) => {
                if (res?.success || res?.status_code === 201) {
                    successToaster("Expense created successfully!");
                    router.push("/expenses");
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message || "Failed to create expense.");
                console.log(err);
            })
    }

    return (
        <CardLayout
            title="Add Expense"
            titleIcon={Banknote}
        >
            <Formwrapper
                methods={methods}
                onSubmit={onSubmit}
            >
                <div className='grid lg:grid-cols-2 gap-5'>
                    <FormInput
                        name="expenseName"
                        label="Expense title"
                        placeholder='Utility bill'
                        required
                    />
                    <FormInput
                        name="expenseValue"
                        label="Expense value"
                        placeholder='1500'
                        required
                    />
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/expenses")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99] text-white'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateExpense
