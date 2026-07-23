"use client";

import CardLayout from '@/components/common/CardLayout'
import React, { useEffect } from 'react'
import { Package } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema } from './schema';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormTextarea from '@/Forms/FormTextarea';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useGetPackageByIdQuery, useUpdatePackageByIDMutation } from '@/store/admin/package';

const EditPackage = () => {
    const router = useRouter();
    const id = useParams()?.id;
    const { errorToaster, successToaster } = useToaster();
    const [Update] = useUpdatePackageByIDMutation()
    const {data: packageDetails} = useGetPackageByIdQuery({id}, {skip: !id})

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

    useEffect(()=>{
        if(packageDetails?.success){
            methods.reset({
                packageName: packageDetails?.data?.packageName,
                numberOfMonth: packageDetails?.data?.numberOfMonth,
                price: packageDetails?.data?.price,
                shortNote: packageDetails?.data?.shortNote,
                status: packageDetails?.data?.status
            })
        }
    }, [packageDetails])

    const onSubmit = (data) => {
        Update({ id, data })
            .unwrap()
            .then((res) => {
                if (res?.success || res?.status_code === 201) {
                    successToaster("Package updated successfully!");
                    router.push("/package-management");
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message || "Failed to update package.");
                console.log(err);
            })
    }

    return (
        <CardLayout
            title="Edit Package"
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
                    <div className='lg:col-span-2'>
                        <FormTextarea
                            name="shortNote"
                            label="Short note"
                            placeholder='Best for small restaurants'
                            rows={3}
                        />
                    </div>
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
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/package-management")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99] text-white'>Update</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default EditPackage
