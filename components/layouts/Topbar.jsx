// components/layout/Topbar.jsx
"use client";

import { Bell, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NextLink from "next/link"
import Breadcurmb from "../common/Breadcurmb";
import { useLogoutMutation } from "@/store/auth";

export default function Topbar() {
    const state = useSelector(state => state?.user)
    const breadcurmb = useSelector(state => state?.breadcurmb);
    console.log(breadcurmb);
    const [open, setOpen] = useState(false);
    console.log(state?.profile_photo);

    // api
    const [Logout] = useLogoutMutation()
    const handleLogout = () => {
        Logout()
            .unwrap()
            .then((res) => {
                if (res?.success == true) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const dropdownRef = useRef(null);

    // Close dropdown outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            {/* Left */}
            <div>
                <Breadcurmb items={breadcurmb?.items} />
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notification */}
                <button className="relative rounded-full p-2 transition hover:bg-gray-100">
                    <Bell size={20} className="text-gray-600" />

                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-gray-100"
                    >
                        {/* Avatar */}
                        <div className="hover:cursor-pointer">
                            <Image
                                src={state?.profile_photo || "/default-avatar.png"}
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                                unoptimized={true}
                            />
                        </div>
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute -right-3 top-14 z-50 w-[92vw] max-w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl sm:w-64">

                            {/* User Info */}
                            <div className="border-b border-gray-100 px-4 py-4 text-center">
                                <p className="truncate text-sm font-semibold text-gray-800">
                                    {state?.name}
                                </p>
                                <div className="mt-1 text-xs text-gray-500">
                                    <span className="max-w-full truncate">
                                        {state?.email}
                                    </span>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="p-2 flex items-center justify-between">
                                <NextLink href="/profile" onClick={() => setOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 transition-all duration-200 hover:cursor-pointer hover:bg-gray-100 active:scale-[0.98]">
                                    <User size={18} />
                                    <span>Profile</span>
                                </NextLink>

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 transition-all duration-200 hover:cursor-pointer hover:bg-red-50 active:scale-[0.98]"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}