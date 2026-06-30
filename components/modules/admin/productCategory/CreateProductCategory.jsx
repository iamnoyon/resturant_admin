"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { Tags } from "lucide-react";
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormFileUpload from '@/Forms/FormFileUpload';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useCreateCategoryMutation } from '@/store/admin/category';
import FormTextarea from '@/Forms/FormTextarea';

const CreateProductCategory = () => {
    const router = useRouter()
    const { successToaster } = useToaster();

    const [CreateCategory] = useCreateCategoryMutation()

    const methods = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            image: null,
            isActive: '1',
        }
    });

    const onSubmit = (data) => {
        const payload = {
            name: data?.name,
            slug: data?.slug,
            description: data?.description,
            image: data?.image?.url,
            isActive: data?.isActive == '1' ? true : false
        };

        CreateCategory(payload)
        .unwrap()
        .then((res)=>{
            if(res?.success){
                successToaster("Category created successfully!");
                router.push('/product-management/categories')
            }
        })
        // TODO: Replace with actual API mutation
        // router.push("/product-management/categories");
    }

    return (
        <CardLayout
            title="Add Category"
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
                            { label: 'Active', id: '1' },
                            { label: 'Inactive', id: '0' },
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

export default CreateProductCategory
