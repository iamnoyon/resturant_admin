"use client";

import useToaster from "@/components/hooks/useToaster";
import { useChangePasswordMutation, useUpdateProfileMutation, useUploadProfilePhotoMutation } from "@/store/auth";
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
    const [UploadProfilePhoto] = useUploadProfilePhotoMutation()
    const [UpdateProfile] = useUpdateProfileMutation()

    const handleImageChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        try {
            // Here you can also call the UpdateProfile API to upload the new profile picture
            const formData = new FormData();
            formData.append("attachment", selectedFile);
            UploadProfilePhoto(formData)
            .unwrap()
            .then(res => {
                if (res?.success == true || res?.status_code == 200) {
                    setFileUrl(res?.filename);
                }
            })
            .catch(err => {
                errorToaster(err?.data?.message || "Failed to upload profile photo.");
                console.log(err.message);
            })
        }catch (err) {
            errorToaster("An unexpected error occurred.");
            console.log(err.message);
        }
    };

    const handleUpdate = () => {
        UpdateProfile({fileName: fileUrl})
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
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 flex flex-col">
            <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col gap-4">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border bg-white px-4 py-4 shadow-sm">

                    {/* LEFT */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">

                        {/* Avatar */}
                        <div className="relative">
                            <div
                                onClick={() => fileRef.current.click()}
                                className="relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100"
                            >
                                {preview || user?.profile_photo ? (
                                    <Image
                                        src={preview || user?.profile_photo}
                                        alt="avatar"
                                        fill
                                        className="object-cover"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <User size={28} />
                                )}
                            </div>

                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* INFO */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-lg font-semibold text-gray-800">
                                {user?.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                            <span className="mt-2 inline-flex rounded-full border bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600">
                                {user?.role}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={handleUpdate}
                        className="w-full sm:w-auto bg-[#042A55] text-white py-2 px-5 rounded-md hover:bg-[#053d7e]"
                    >
                        Update
                    </button>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

                    {/* PERSONAL INFO */}
                    <div className="lg:col-span-2 rounded-xl border bg-white p-4 sm:p-5 shadow-sm overflow-auto">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                                <User size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {[
                                { label: "Full Name", value: user?.name, icon: User },
                                { label: "Email Address", value: user?.email, icon: Mail },
                                { label: "Role", value: user?.role, icon: Shield },
                                { label: "NID Number", value: user?.nid, icon: CreditCard },
                                { label: "Date of Birth", value: user?.dob, icon: Calendar },
                                { label: "Address", value: user?.address, icon: MapPin },
                            ].map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div key={index}>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                            {item.label}
                                        </label>

                                        <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2.5">
                                            <Icon size={15} className="text-gray-400" />
                                            <span className="truncate text-sm text-gray-700">
                                                {item.value || "-"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* PASSWORD */}
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
                                className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}