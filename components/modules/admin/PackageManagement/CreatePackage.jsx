"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { Package } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema } from './schema';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormTextarea from '@/Forms/FormTextarea';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useCreatePackageMutation } from '@/store/admin/package';

const CreatePackage = () => {
    const router = useRouter()
    const { errorToaster, successToaster } = useToaster();
    const [Create] = useCreatePackageMutation()

    const methods = useForm({
        resolver: zodResolver(packageSchema),
        defaultValues: {
            packageName: '',
            numberOfMonth: '',
            price: '',
            shortNote: '',
            status: 'active'
        }
    });

    const onSubmit = (data) => {
        Create(data)
            .unwrap()
            .then((res) => {
                if (res?.success || res?.status_code === 201) {
                    successToaster("Package created successfully!");
                    router.push("/package-management");
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message || "Failed to create package.");
                console.log(err);
            })
    }

    return (
        <CardLayout
            title="Add Package"
            titleIcon={Package}
        >
            <Formwrapper
                methods={methods}
                onSubmit={onSubmit}
            >
                <div className='grid lg:grid-cols-2 gap-5'>
                    <FormInput
                        name="packageName"
                        label="Package name"
                        placeholder='Enter package name'
                        required
                    />
                    <FormInput
                        name="numberOfMonth"
                        label="Number of months"
                        placeholder='1'
                        required
                    />
                    <FormInput
                        name="price"
                        label="Price"
                        placeholder='0'
                        required
                    />
                    <FormRadioGroup
                        name="status"
                        label="Status"
                        required
                        valueKey="value"
                        columns={{ sm: 1, md: 2 }}
                        options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]}
                    />
                    <div className='lg:col-span-2'>
                        <FormTextarea
                            name="shortNote"
                            label="Short note"
                            placeholder='Best for small restaurants'
                            rows={3}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/package-management")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99] text-white'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreatePackage
