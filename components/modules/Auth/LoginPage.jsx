'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useLoginMutation } from "@/components/store/public/index";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // api call
    const [Login] = useLoginMutation()

    const handleLogin =  (e) => {
        e.preventDefault();
        Login({ email, password })
            .unwrap()
            .then((res)=>{
                if(res?.success){
                    router.replace('/dashboard')
                }
            })
            .catch((err)=>{
                console.error("Login failed:", err);
            });
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Banner Background - Clipped from top */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/banner.png"
                    alt="Login Banner"
                    fill
                    className="object-cover object-top scale-100"
                    priority
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Centered Login Card */}
            <div className="absolute inset-0 flex items-center justify-center p-4 mt-12">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-4">
                    {/* Logo/Icon */}
                    <div className="mb-2 flex justify-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-base font-semibold text-gray-900 text-center mb-1">
                        WELCOME BACK
                    </h1>
                    <p className="text-gray-500 text-center mb-5 text-xs">
                        Login to your account
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div className="relative">
                            <label className="sr-only" htmlFor="email">
                                Username
                            </label>
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-black"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label className="sr-only" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15.232 5.232l4.243-4.243m0 0a9 9 0 010 12.728m-4.243-4.243a3.375 3.375 0 11-4.243 4.243m4.243-4.243L9.232 15.232"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#042A55] hover:bg-[#063C76] disabled:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition duration-200 transform hover:scale-101 hover:cursor-pointer active:scale-95 mt-4"
                        >
                            Login
                        </button>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-end pt-2">
                            <NextLink href="/forgot-password">
                                <span
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition hover:cursor-pointer hover:underline"
                                >
                                    Forgot Password?
                                </span>
                            </NextLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
