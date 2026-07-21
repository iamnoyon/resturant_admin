"use client";

import useToaster from "@/components/hooks/useToaster";
import { useSingleFileUploadMutation } from "@/store/attachment";
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/store/auth";
import {
    User,
    Mail,
    Shield,
    Lock,
    Eye,
    EyeOff,
    Store,
    Phone,
    Globe,
    Clock,
    MapPin,
    CreditCard,
    Calendar,
    Settings,
    Camera,
    CheckCircle2,
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
            profileImageUrl: fileUrl ?? user?.profileImageUrl,
        })
            .then(res => {
                if (res?.success == true || res?.status_code == 200) {
                    successToaster("Profile photo updated.");
                    window.location.reload()
                }
            })
            .catch(err => {
                errorToaster(err?.data?.message || "Failed to update profile.");
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

    const roleColors = {
        superadmin: "bg-purple-100 text-purple-700 border-purple-200",
        admin: "bg-blue-100 text-blue-700 border-blue-200",
        manager: "bg-amber-100 text-amber-700 border-amber-200",
        staff: "bg-green-100 text-green-700 border-green-200",
    };

    const statusColors = {
        active: "bg-emerald-100 text-emerald-700 border-emerald-200",
        inactive: "bg-red-100 text-red-700 border-red-200",
        pending: "bg-orange-100 text-orange-700 border-orange-200",
    };

    const roleColor = roleColors[user?.role] || "bg-gray-100 text-gray-700 border-gray-200";
    const statusColor = statusColors[user?.billing_status] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 p-3 sm:p-4">
            <div className="mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* ========== LEFT COLUMN ========== */}
                    <div className="lg:col-span-1 flex flex-col gap-4">

                        {/* PROFILE CARD */}
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100">
                            {/* Banner */}
                            <div className="h-16 bg-gradient-to-r from-[#042A55] via-[#063C76] to-[#0A4D99]" />

                            {/* Avatar */}
                            <div className="flex flex-col items-center -mt-8 px-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                    <div
                                        onClick={() => fileRef.current.click()}
                                        className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg ring-2 ring-gray-100"
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
                                            <User size={40} className="text-gray-400" />
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-gray-900/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 5v14" /><path d="M5 12h14" />
                                            </svg>
                                            <span className="text-[10px] font-medium text-white">Change</span>
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

                                <h2 className="mt-4 text-lg font-bold text-gray-800 tracking-tight">
                                    {user?.name || "User"}
                                </h2>
                                <p className="text-sm text-gray-400">{user?.email}</p>
                                <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${roleColor}`}>
                                    <Shield size={12} />
                                    {user?.role}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="mt-4 space-y-0.5 px-4">
                                {[
                                    { label: "Full Name", value: user?.name, icon: User },
                                    { label: "Email Address", value: user?.email, icon: Mail },
                                    { label: "Phone", value: user?.phone, icon: Phone },
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group/item"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                                                <Icon size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                                    {item.label}
                                                </p>
                                                <p className="truncate text-sm font-medium text-gray-700">
                                                    {item.value || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="px-4 pb-4 mt-4">
                                <button
                                    onClick={handleUpdate}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#042A55] to-[#0A4D99] text-white py-3 px-5 hover:from-[#053d7e] hover:to-[#0C5DB3] text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-900/10 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
                                >
                                    <Settings size={16} />
                                    Update Profile
                                </button>
                            </div>
                        </div>

                        {/* CHANGE PASSWORD */}
                        <div className="rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-sm shadow-red-200">
                                    <Lock size={18} />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-800 tracking-tight">
                                        Change Password
                                    </h2>
                                    <p className="text-xs text-gray-400">Keep your account secure</p>
                                </div>
                            </div>

                            <form onSubmit={handleChangePassword} className="p-4 space-y-3">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.new_password ? "text" : "password"}
                                            value={password.new_password}
                                            onChange={(e) =>
                                                setPassword((prev) => ({
                                                    ...prev,
                                                    new_password: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter new password"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    new_password: !prev.new_password,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword.new_password ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.confirm_password ? "text" : "password"}
                                            value={password.confirm_password}
                                            onChange={(e) =>
                                                setPassword((prev) => ({
                                                    ...prev,
                                                    confirm_password: e.target.value,
                                                }))
                                            }
                                            placeholder="Re-enter new password"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 pr-10 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => ({
                                                    ...prev,
                                                    confirm_password: !prev.confirm_password,
                                                }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword.confirm_password ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-all duration-300 shadow-md shadow-gray-900/10 hover:shadow-lg active:scale-[0.98]"
                                >
                                    <Lock size={16} />
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ========== RIGHT COLUMN ========== */}
                    <div className="lg:col-span-2 flex flex-col gap-4">

                        {/* RESTAURANT INFO */}
                        <div className="rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-sm shadow-blue-200">
                                    <Store size={18} />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-800 tracking-tight">
                                        Restaurant Information
                                    </h2>
                                    <p className="text-xs text-gray-400">Your business details</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2.5 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all duration-200"
                                            >
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                                                    <Icon size={15} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                                        {item.label}
                                                    </p>
                                                    <p className="truncate text-sm font-medium text-gray-700">
                                                        {item.value || <span className="text-gray-300 italic">Not set</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* BILLING */}
                        <div className="rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-sm shadow-emerald-200">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-800 tracking-tight">
                                        Billing Information
                                    </h2>
                                    <p className="text-xs text-gray-400">Subscription & payment details</p>
                                </div>
                                {user?.billing_status && (
                                    <span className={`ml-auto rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                                        {user?.billing_status}
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { label: "Plan", value: user?.plan, icon: CreditCard },
                                        { label: "Billing Cycle", value: user?.billing_cycle, icon: Calendar },
                                        { label: "Payment Method", value: user?.payment_method, icon: CreditCard },
                                        { label: "Next Payment", value: user?.next_payment, icon: Calendar },
                                        { label: "Amount", value: user?.amount, icon: CreditCard },
                                        { label: "Status", value: user?.billing_status, icon: CheckCircle2 },
                                    ].map((item, index) => {
                                        const Icon = item.icon;
                                        const isStatus = item.label === "Status";
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 hover:bg-white hover:border-emerald-100 hover:shadow-sm transition-all duration-200"
                                            >
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                                                    <Icon size={15} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                                        {item.label}
                                                    </p>
                                                    {isStatus && item.value ? (
                                                        <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusColor}`}>
                                                            {item.value}
                                                        </span>
                                                    ) : (
                                                        <p className="truncate text-sm font-medium text-gray-700">
                                                            {item.value || <span className="text-gray-300 italic">Not set</span>}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
