// app/admin/layout.jsx
"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ToastContainer } from 'react-toastify';

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <Topbar />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-3 py-5">{children}</main>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
            />
        </div>
    );
}