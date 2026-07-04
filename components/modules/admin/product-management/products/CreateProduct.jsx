"use client"

import React from 'react'
import CardLayout from '@/components/common/CardLayout'
import FormFileUpload from '@/Forms/FormFileUpload';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormSelect from '@/Forms/FormSelect';
import FormTextarea from '@/Forms/FormTextarea';
import FormTextEditor from '@/Forms/FormTextEditor';
import FormFieldArray from '@/Forms/FormFieldArray';
import Formwrapper from '@/Forms/Formwrapper';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useGetCategoryDropdownQuery } from '@/store/admin/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './schema';
import { useCreateProductMutation } from '@/store/admin/products';

const CreateProduct = () => {
    const router = useRouter();
    const { data: categories } = useGetCategoryDropdownQuery()
    const [CreateProduct, { isLoading }] = useCreateProductMutation()

    const methods = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            price: '',
            discountPrice: '',
            stock: '',
            sku: '',
            shortnote: '',
            features: [],
            tags: '',
            images: [],
            isActive: true,
            isFeatured: true,
            categoryId: '',
        }
    });

    const handleOnSubmit = (data) => {
        const imagesUrl = data.images.map(img => img?.url)
        CreateProduct({...data, images: imagesUrl})
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
                        name="name"
                        label="Product name"
                        placeholder='NPCAH563'
                        required
                    />
                    <FormInput
                        name="slug"
                        label="Product slug"
                        placeholder='Ice-cream'
                        required
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <FormInput
                        name="price"
                        label="Product price (TK)"
                        placeholder='500'
                        required
                    />
                    <FormInput
                        name="discountPrice"
                        label="Discount price (TK)"
                        placeholder='400'
                        required
                    />
                    <FormSelect
                        name='tags'
                        label="Tag"
                        options={[
                            { label: 'New', id: 'New' },
                            { label: 'Sale', id: 'Sale' },
                            { label: 'Trending', id: 'Trending' },
                            { label: 'Offer', id: 'Offer' },
                        ]}
                        placeholder="Select a tag"
                        required
                    />
                    <FormSelect
                        name='categoryId'
                        label="Category name"
                        options={categories?.data || []}
                        labelKey="name"
                        required
                    />
                    <FormInput
                        name='stock'
                        label='Stock'
                        required
                    />
                    <FormRadioGroup
                        name='isFeatured'
                        label='Is Feature?'
                        options={[
                            { label: 'Yes', id: true },
                            { label: 'No', id: false }
                        ]}
                        required
                    />
                    <FormRadioGroup
                        name='isActive'
                        label='Status'
                        options={[
                            { label: 'Active', id: true },
                            { label: 'Inactive', id: false }
                        ]}
                        required
                    />
                    <div>
                        <FormInput
                            name='sku'
                            label='SKU'
                        />
                        <FormFieldArray
                            name="features"
                            label="Features"
                            placeholder="Enter a feature"
                            addButtonText="+ Add Feature"
                        />
                    </div>
                    <FormTextarea
                        name='shortnote'
                        label='Short Note'
                        required
                    />
                </div>
                <FormTextEditor
                    name="description"
                    label="Product Description"
                    required
                />
                <FormFileUpload
                    name="images"
                    label="Product Images"
                    required
                    multiple
                // accept=''
                />
                <div className='flex items-center justify-center gap-10 mt-10'>
                    <button type='button' onClick={() => router.push("/product-management/products")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2 text-white  bg-[#0A4D99]'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateProduct