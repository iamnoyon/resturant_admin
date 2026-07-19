/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardLayout from '@/components/common/CardLayout'
import React, { useEffect } from 'react'
import { Loader2, Tags } from "lucide-react";
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormFileUpload from '@/Forms/FormFileUpload';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useGetCategoryByIdQuery, useUpdateCategoryByIDMutation } from '@/store/admin/category';
import FormTextarea from '@/Forms/FormTextarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from './schema';

const EditProductCategory = () => {
    const router = useRouter()
    const id = useParams()?.id
    const { successToaster, errorToaster } = useToaster();

    const [UpdateCategory, { isLoading }] = useUpdateCategoryByIDMutation()
    const { data: categoryDetails } = useGetCategoryByIdQuery({ id }, { skip: !id })

    const methods = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryName: '',
            shortNote: '',
            isActive: null,
        }
    });

    useEffect(() => {
        if (categoryDetails?.success) {
            methods.reset({
                categoryName: categoryDetails?.data?.categoryName,
                shortNote: categoryDetails?.data?.shortNote,
                isActive: categoryDetails?.data?.isActive
            })
        }
    }, [categoryDetails])

    const onSubmit = (data) => {
        UpdateCategory({ id: id, data: data })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster("Category Updated successfully!");
                    router.push('/product-management/categories')
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message)
            })
        // TODO: Replace with actual API mutation
        // router.push("/product-management/categories");
    }

    return (
        <CardLayout
            title="Edit Category"
            titleIcon={Tags}
        >
            <Formwrapper
                methods={methods}
                onSubmit={onSubmit}
            >
                <div className='grid lg:grid-cols-2 gap-5'>
                    <FormInput
                        name="categoryName"
                        label="Category Name"
                        placeholder='Electronics'
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
                <div className='mt-5'>
                    <FormTextarea
                        name="shortNote"
                        label="Description"
                    />
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/product-management/categories")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" disabled={isLoading}
                        className={` w-40 bg-[#042A55] hover:enabled:bg-[#063C76] hover:cursor-pointer text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed" : ""}`}          >
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update"}</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default EditProductCategory
