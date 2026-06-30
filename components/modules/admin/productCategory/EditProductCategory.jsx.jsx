/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CardLayout from '@/components/common/CardLayout'
import React, { useEffect } from 'react'
import { Tags } from "lucide-react";
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

    const [UpdateCategory] = useUpdateCategoryByIDMutation()
    const { data: categoryDetails } = useGetCategoryByIdQuery({ id }, { skip: !id })

    const methods = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            image: '',
            isActive: null,
        }
    });

    useEffect(() => {
        if (categoryDetails?.success) {
            methods.reset({
                name: categoryDetails?.data?.name,
                slug: categoryDetails?.data?.slug,
                description: categoryDetails?.data?.description,
                image: categoryDetails?.data?.image,
                isActive: categoryDetails?.data?.isActive
            })
        }
    }, [categoryDetails])

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            slug: data?.slug,
            description: data?.description,
            image: data?.image?.url,
            isActive: data?.isActive
        };

        UpdateCategory({id: id, data: payload})
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
                        name="name"
                        label="Name"
                        placeholder='Electronics'
                        required
                    />
                    <FormInput
                        name="slug"
                        label="Slug"
                        placeholder='electronics'
                        required
                    />
                    <FormFileUpload
                        name='image'
                        label="Category Image"
                        required
                        accept="image/*"
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
                        name="description"
                        label="Description"
                    />
                </div>
                <div className='flex items-center justify-center gap-10 mt-20'>
                    <button type='button' onClick={() => router.push("/product-management/categories")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer text-white hover:bg-[#053872] rounded font-semibold py-2 bg-[#0A4D99]'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default EditProductCategory
