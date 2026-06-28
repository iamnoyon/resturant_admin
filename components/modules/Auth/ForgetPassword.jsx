"use client"

import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";
import NextLink from "next/link"
import { useForgotPasswordMutation } from "@/store/auth";
import useToaster from "@/components/hooks/useToaster";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const { successToaster } = useToaster()
    const [ForgotPasswordMailSend] = useForgotPasswordMutation();

    const handleSubmit = () => {
        ForgotPasswordMailSend({ email })
            .unwrap()
            .then((res) => {
                if (res?.success || res?.status_code == 200) {
                    successToaster(res?.message || 'Reset mail sent to your email. Please check!')
                    router.push("/");
                }
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                {/* Header */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                        <IoCheckmarkCircle className="text-white text-4xl" />
                    </div>

                    <h2 className="mt-4 text-3xl font-semibold text-gray-800 text-center">
                        FORGOT PASSWORD
                    </h2>

                    <p className="text-gray-500 mt-2 text-center">
                        Enter your email address and we'll send you a password reset link.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-5">
                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full h-12 bg-[#002F6C] hover:bg-[#003b89] text-white font-semibold rounded-xl transition-all duration-300 hover:cursor-pointer"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <NextLink href="/">
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 hover:underline transition hover:cursor-pointer"
                        >
                            Back to Login
                        </button>
                    </NextLink>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;