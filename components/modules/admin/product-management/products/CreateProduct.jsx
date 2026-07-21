"use client"

import React from 'react'
import CardLayout from '@/components/common/CardLayout'
import FormInput from '@/Forms/FormInput';
import FormSelect from '@/Forms/FormSelect';
import FormTextEditor from '@/Forms/FormTextEditor';
import Formwrapper from '@/Forms/Formwrapper';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useGetCategoryDropdownQuery } from '@/store/admin/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './schema';
import { useCreateProductMutation } from '@/store/admin/products';
import { Loader2 } from 'lucide-react';
import FormFileUpload from '@/Forms/FormFileUpload';
import FormRadioGroup from '@/Forms/FormRadioGroup';

const CreateProduct = () => {
    const router = useRouter();
    const { data: categories } = useGetCategoryDropdownQuery()
    const [CreateProduct, { isLoading }] = useCreateProductMutation()

    const methods = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productName: '',
            categoryId: '',
            description: '',
            costPrice: '',
            soldPrice: '',
            stock: '',
            stockRequired: false,
            imageUrl: '',
            isActive: true
        }
    });

    const isStockRequired = methods.watch('stockRequired');

    const handleOnSubmit = (data) => {
        CreateProduct(data)
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    router.push('/product-management/products')
                }
            })
    }

    return (
        <CardLayout
            title="Add Product"
            titleIcon={MdFormatListBulletedAdd}
        >
            <Formwrapper
                methods={methods}
                onSubmit={handleOnSubmit}
                className='grid grid-cols-1 gap-5'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <FormInput
                        name="productName"
                        label="Product name"
                        placeholder='NPCAH563'
                        required
                    />
                    <FormSelect
                        name='categoryId'
                        label="Category name"
                        options={categories?.data || []}
                        labelKey="categoryName"
                        required
                    />
                    <FormInput
                        name='costPrice'
                        label='Cost Price'
                        required
                    />
                    <FormInput
                        name='soldPrice'
                        label='Sold Price'
                        required
                    />
                    <FormFileUpload
                        name="imageUrl"
                        label="Category Image"
                        valueKey="url"
                    />
                    <div className='flex flex-col gap-5'>
                    <FormRadioGroup
                        name="stockRequired"
                        label="Stock Required?"
                        columns={{ sm: 1, md: 2 }}
                        options={[
                            { label: 'Yes', id: true },
                            { label: 'No', id: false },
                        ]}
                    />
                    {isStockRequired && (
                        <FormInput
                            name='stock'
                            label='Stock Quantity'
                            required
                        />
                    )}
                    </div>
                </div>
                <FormTextEditor
                    name="description"
                    label="Product Description"
                />
                <div className='flex items-center justify-center gap-10 mt-10'>
                    <button type='button' onClick={() => router.push("/product-management/products")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" disabled={isLoading}
                        className={` w-40 bg-[#042A55] hover:enabled:bg-[#063C76] hover:cursor-pointer text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed" : ""}`}          >
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : "Save"}</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateProduct