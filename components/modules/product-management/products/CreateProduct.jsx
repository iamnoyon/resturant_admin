"use client"
import CardLayout from '@/components/common/CardLayout'
import FormInput from '@/Forms/FormInput';
import Formwrapper from '@/Forms/Formwrapper';
import React from 'react'
import { useForm } from 'react-hook-form';
import { MdFormatListBulletedAdd } from "react-icons/md";

const CreateProduct = () => {
    const methods = useForm({
        defaultValues: {
            product_title: '',
            product_desc: '',
            product_images: '',
            product_price: '',
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
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <FormInput
                    name="product_title"
                    label="Product Title"
                    placeholder='Ice-cream'
                    required
                    />
                    <FormInput
                    name="product_price"
                    label="Product Price (TK)"
                    placeholder='500'
                    required
                    />
                </div>
            </Formwrapper>
        </CardLayout>
    )
}

export default CreateProduct