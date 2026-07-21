"use client";

import useToaster from "@/components/hooks/useToaster";
import { useSingleFileUploadMutation } from "@/store/attachment";
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/store/auth";
import {
    User,
    Mail,
    Shield,
    CreditCard,
    Calendar,
    MapPin,
    Lock,
    Eye,
    EyeOff,
    Store,
    Phone,
    Globe,
    Clock,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const user = useSelector((state) => state?.user);
    const [fileUrl, setFileUrl] = useState(null);
    const { errorToaster, successToaster } = useToaster();

    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const [password, setPassword] = useState({
        new_password: "",
        confirm_password: "",
    });

    const [showPassword, setShowPassword] = useState({
        new_password: false,
        confirm_password: false,
    });

    // api
    const [ChangePassword] = useChangePasswordMutation()
    const [UploadProfilePhoto] = useSingleFileUploadMutation()
    const [UpdateProfile] = useUpdateProfileMutation()

    const handleImageChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            UploadProfilePhoto(formData)
                .unwrap()
                .then(res => {
                    if (res?.url) {
                        setFileUrl(res.url);
                    }
                })
                .catch(err => {
                    errorToaster(err?.data?.message || "Failed to upload profile photo.");
                    console.log(err.message);
                })
        } catch (err) {
            errorToaster("An unexpected error occurred.");
            console.log(err.message);
        }
    };

    const handleUpdate = () => {
        UpdateProfile({
            name: user?.name,
            email: user?.email,
            profileImageUrl: fileUrl ?? user?.profileImageUrl,
        })
            .then(res => {
                if (res?.success == true || res?.status_code == 200) {
                    successToaster("Profile photo updated.");
                    window.location.reload()
                }
            })
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (password?.new_password === password.confirm_password) {
            ChangePassword({
                newPassword: password.new_password,
                confirmPassword: password.confirm_password
            })
                .unwrap()
                .then(res => {
                    if (res?.success == true || res?.status_code == 200) {
                        successToaster("Password changed.");
                        window.location.reload()
                    }
                })
                .catch(err => {
                    errorToaster(err?.data?.message || "Failed to change password.");
                    console.log(err.message);
                })
        } else {
            errorToaster("New & Confirm password are not same");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4">
            <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* ========== LEFT COLUMN (col-span-1) ========== */}
                <div className="lg:col-span-1 flex flex-col gap-4">

                    {/* PROFILE INFO */}
                    <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm">
                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div
                                    onClick={() => fileRef.current.click()}
                                    className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100"
                                >
                                    {preview || user?.profileImageUrl ? (
                                        <Image
                                            src={preview || user?.profileImageUrl}
                                            alt="avatar"
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    ) : (
                                        <User size={40} />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-500/60 opacity-0 transition-opacity group-hover:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14" />
                                            <path d="M5 12h14" />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="mt-5 space-y-3">
                            {[
                                { label: "Full Name", value: user?.name, icon: User },
                                { label: "Email Address", value: user?.email, icon: Mail },
                                { label: "Role", value: user?.role, icon: Shield },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index}>
                                        <label className="mb-1 block text-xs font-medium text-gray-500">
                                            {item.label}
                                        </label>
                                        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
                                            <Icon size={14} className="text-gray-400 flex-shrink-0" />
                                            <span className="truncate text-sm text-gray-700">
                                                {item.value || "-"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="mt-5 w-full bg-[#042A55] text-white py-2.5 px-5 rounded-lg hover:bg-[#053d7e] text-sm font-medium transition-colors"
                        >
                            Update Profile
                        </button>
                    </div>

                    {/* CHANGE PASSWORD */}
                    <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                <Lock size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Change Password
                            </h2>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-3">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    New Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword.new_password ? "text" : "password"}
                                        value={password.new_password}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                new_password: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-lg border p-2 pr-10 text-sm text-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => ({
                                                ...prev,
                                                new_password: !prev.new_password,
                                            }))
                                        }
                                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword.new_password ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    Confirm Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword.confirm_password ? "text" : "password"}
                                        value={password.confirm_password}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                confirm_password: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-lg border p-2 pr-10 text-sm text-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => ({
                                                ...prev,
                                                confirm_password: !prev.confirm_password,
                                            }))
                                        }
                                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword.confirm_password ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>

                {/* ========== RIGHT COLUMN (col-span-2) ========== */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                                <Store size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Restaurant Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Restaurant Name", value: user?.restaurant_name, icon: Store },
                                { label: "Email", value: user?.restaurant_email, icon: Mail },
                                { label: "Phone", value: user?.restaurant_phone, icon: Phone },
                                { label: "Address", value: user?.restaurant_address, icon: MapPin },
                                { label: "Website", value: user?.website, icon: Globe },
                                { label: "Opening Hours", value: user?.opening_hours, icon: Clock },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index}>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                            {item.label}
                                        </label>
                                        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2.5">
                                            <Icon size={14} className="text-gray-400 flex-shrink-0" />
                                            <span className="truncate text-sm text-gray-700">
                                                {item.value || "-"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
