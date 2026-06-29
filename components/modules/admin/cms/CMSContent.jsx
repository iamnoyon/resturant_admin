"use client";

import CardLayout from '@/components/common/CardLayout';
import { useForm, useFieldArray } from 'react-hook-form';
import Formwrapper from '@/Forms/Formwrapper';
import FormInput from '@/Forms/FormInput';
import FormFileUpload from '@/Forms/FormFileUpload';
import { Image, Plus, Trash2 } from 'lucide-react';
import useBreadcrumb from '@/components/hooks/useBreadcurmb';
import { breadcrumbList } from '@/components/layouts/breadcrumbList';
import useToaster from '@/components/hooks/useToaster';
import { useRouter } from 'next/navigation';

const defaultSlide = {
    image: null,
    title: '',
    description: '',
    slug: '',
    button1Name: '',
    button1Url: '',
    button2Name: '',
    button2Url: '',
};

export default function CMSContent() {
    useBreadcrumb(breadcrumbList?.cmsSlider);
    const { successToaster } = useToaster();
    const router = useRouter();

    const methods = useForm({
        defaultValues: {
            slides: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "slides"
    });

    const onSubmit = (data) => {
        // TODO: Replace with actual API mutation
        console.log("Slider data to save:", data);
        successToaster("Slider content saved successfully!");
    };

    const addSlide = () => append({ ...defaultSlide });

    return (
        <CardLayout
            title="Home Page Slider"
            titleIcon={Image}
        >
            <Formwrapper methods={methods} onSubmit={onSubmit}>
                {fields.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                        <Image size={56} className="mx-auto text-gray-400 mb-3" aria-hidden="true" />
                        <p className="text-gray-500 text-lg font-medium mb-1">No slides added yet</p>
                        <p className="text-gray-400 text-sm mb-6">Click &quot;Add Slide&quot; to start building your slider</p>
                        <button
                            type="button"
                            onClick={addSlide}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A4D99] text-white rounded-lg hover:bg-[#053872] transition-colors cursor-pointer"
                        >
                            <Plus size={18} />
                            Add Slide
                        </button>
                    </div>
                )}

                {fields.length > 0 && (
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden"
                            >
                                <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#043570] text-white text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="font-semibold text-gray-700">
                                            {field.title || `Slide ${index + 1}`}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="Remove slide"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                        <FormFileUpload
                                            name={`slides.${index}.image`}
                                            label="Slide Image"
                                            required
                                            accept="image/*"
                                        />
                                        <div className="space-y-4">
                                            <FormInput
                                                name={`slides.${index}.title`}
                                                label="Title"
                                                placeholder="e.g. Summer Sale 2025"
                                                required
                                            />
                                            <FormInput
                                                name={`slides.${index}.description`}
                                                label="Description"
                                                placeholder="e.g. Get the best deals on summer collection"
                                            />
                                            <FormInput
                                                name={`slides.${index}.slug`}
                                                label="Slug"
                                                placeholder="e.g. summer-sale-2025"
                                                remark="Unique identifier for this slide"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                                            Action Buttons
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-3 p-3 bg-white rounded border border-gray-200">
                                                <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded">
                                                    Button 1 (Primary)
                                                </span>
                                                <FormInput
                                                    name={`slides.${index}.button1Name`}
                                                    label="Name"
                                                    placeholder="Shop Now"
                                                />
                                                <FormInput
                                                    name={`slides.${index}.button1Url`}
                                                    label="URL"
                                                    placeholder="/shop"
                                                />
                                            </div>
                                            <div className="space-y-3 p-3 bg-white rounded border border-gray-200">
                                                <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded">
                                                    Button 2 (Secondary)
                                                </span>
                                                <FormInput
                                                    name={`slides.${index}.button2Name`}
                                                    label="Name"
                                                    placeholder="Learn More"
                                                />
                                                <FormInput
                                                    name={`slides.${index}.button2Url`}
                                                    label="URL"
                                                    placeholder="/about"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {fields.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={addSlide}
                            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#0A4D99] text-[#0A4D99] rounded-lg hover:bg-[#0A4D99] hover:text-white transition-colors cursor-pointer font-medium"
                        >
                            <Plus size={18} />
                            Add Another Slide
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#0A4D99] text-white rounded-lg hover:bg-[#053872] transition-colors cursor-pointer font-medium"
                            >
                                Save Slides
                            </button>
                        </div>
                    </div>
                )}
            </Formwrapper>
        </CardLayout>
    );
}
