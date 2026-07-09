"use client"

import React, { useEffect } from 'react'
import CardLayout from '@/components/common/CardLayout'
import FormFileUpload from '@/Forms/FormFileUpload';
import FormInput from '@/Forms/FormInput';
import FormRadioGroup from '@/Forms/FormRadioGroup';
import FormSelect from '@/Forms/FormSelect';
import FormTextarea from '@/Forms/FormTextarea';
import FormTextEditor from '@/Forms/FormTextEditor';
import FormFieldArray from '@/Forms/FormFieldArray';
import Formwrapper from '@/Forms/Formwrapper';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useGetCategoryDropdownQuery } from '@/store/admin/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './schema';
import { useGetProductByIdQuery, useUpdateProductByIDMutation } from '@/store/admin/products';
import { Loader2 } from 'lucide-react';
import useToaster from '@/components/hooks/useToaster';

const EditProduct = () => {
    const router = useRouter();
    const id = useParams()?.id;
    const { successToaster, errorToaster } = useToaster();
    const { data: categories } = useGetCategoryDropdownQuery();
    const { data: productDetails } = useGetProductByIdQuery({ id: id }, { skip: !id });
    const [UpdateProduct, { isLoading }] = useUpdateProductByIDMutation();

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

    useEffect(() => {
        if (productDetails?.success) {
            const product = productDetails.data;
            methods.reset({
                name: product?.name || '',
                slug: product?.slug || '',
                description: product?.description || '',
                price: product?.price || '',
                discountPrice: product?.discountPrice || '',
                stock: product?.stock || '',
                sku: product?.sku || '',
                shortnote: product?.shortnote || '',
                features: product?.features || [],
                tags: product?.tags || '',
                images: product?.images?.map((url) => ({ url })) || [],
                isActive: product?.isActive ?? true,
                isFeatured: product?.isFeatured ?? true,
                categoryId: product?.categoryId || '',
            });
        }
    }, [productDetails]);

    const handleOnSubmit = (data) => {
        const images = data.images.map(img => typeof img === 'string' ? img : img?.url);
        UpdateProduct({ id, data: { ...data, images } })
            .unwrap()
            .then((res) => {
                if (res?.success) {
                    successToaster("Product updated successfully!");
                    router.push('/product-management/products');
                }
            })
            .catch((err) => {
                errorToaster(err?.data?.message);
            });
    };

    return (
        <CardLayout
            title="Edit Product"
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
                />
                <div className='flex items-center justify-center gap-10 mt-10'>
                    <button type='button' onClick={() => router.push("/product-management/products")} className='w-40 hover:cursor-pointer hover:bg-[#0A4D99] rounded font-semibold py-2 border text-[#0A4D99] hover:text-white border-[#0A4D99]'>Cancel</button>
                    <button type="submit" disabled={isLoading}
                        className={`w-40 bg-[#042A55] hover:enabled:bg-[#063C76] hover:cursor-pointer text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${isLoading ? "cursor-not-allowed" : ""}`}>
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update"}
                    </button>
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default EditProduct