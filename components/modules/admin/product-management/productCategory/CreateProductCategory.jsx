"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { Loader2, Tags } from "lucide-react";
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormFileUpload from '@/Forms/FormFileUpload';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToaster from '@/components/hooks/useToaster';
import { useCreateCategoryMutation } from '@/store/admin/category';
import FormTextarea from '@/Forms/FormTextarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from './schema';

const CreateProductCategory = () => {
    const router = useRouter()
    const { successToaster, errorToaster } = useToaster();

    const [CreateCategory, { isLoading }] = useCreateCategoryMutation()

    const methods = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryName: '',
            shortNote: '',
            isActive: true
        }
    });

    const onSubmit = (data) => {

        CreateCategory(data)
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster(res?.data?.message || "Category created successfully!");
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
            title="Add Category"
            titleIcon={Tags}
        >
            <Formwrapper
                methods={methods}
                onSubmit={onSubmit}
            >
                <div className='grid gap-3'>
                    <FormInput
                        name="categoryName"
                        label="Category Name"
                        placeholder='Electronics'
                        required
                    />
                    <FormTextarea
                        name="Description"
                        label="shortNote"
                    />
                </div>
                <div className='flex items-center justify-center gap-10 mt-10'>
                    <button
                        type='button'
                        onClick={() => router.push("/product-management/categories")}
                        className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>
                        Cancel
                    </button>
                    <button type="submit"
                        disabled={isLoading}
                        className={` w-40 bg-[#042A55] hover:enabled:bg-[#063C76] hover:cursor-pointer text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed" : ""}`}>
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : "Save"}
                    </button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateProductCategory
