"use client"
import CardLayout from '@/components/common/CardLayout'
import FormFileUpload from '@/Forms/FormFileUpload';
import FormInput from '@/Forms/FormInput';
import FormSelect from '@/Forms/FormSelect';
import FormTextEditor from '@/Forms/FormTextEditor';
import Formwrapper from '@/Forms/Formwrapper';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { MdFormatListBulletedAdd } from "react-icons/md";

const CreateProduct = () => {
    const router = useRouter();

    const methods = useForm({
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
            images: [],
            isActive: true,
            isFeatured: true,
            categoryId: '',
        }
    });

    const handleOnSubmit = (data) => {

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
                        name="batch_code"
                        label="Batch No."
                        placeholder='NPCAH563'
                        required
                    />
                    <FormInput
                        name="product_title"
                        label="Product Title"
                        placeholder='Ice-cream'
                        required
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <FormInput
                        name="product_price"
                        label="Product Price (TK)"
                        placeholder='500'
                        required
                    />
                    <FormSelect
                    name="product_category"
                    label="Product Category"
                    options={[
                        {label: 'A', id: 'a'}
                    ]}
                    required
                    />
                </div>
                <FormTextEditor
                    name="product_desc"
                    label="Product Description"
                    required
                />
                <FormFileUpload
                    name="product_images"
                    label="Product Images"
                    required
                    multiple
                // accept=''
                />
                <div className='flex items-center justify-center gap-10 mt-10'>
                    <button type='button' onClick={() => router.push("/product-management/products")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" className='w-40 hover:cursor-pointer hover:bg-[#053872] rounded font-semibold py-2  bg-[#0A4D99]'>Save</button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateProduct