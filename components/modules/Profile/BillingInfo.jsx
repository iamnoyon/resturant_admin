"use client";

import { CreditCard, Calendar, CheckCircle2 } from "lucide-react";

export default function BillingInfo({ user, statusColor }) {
    return (
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
    );
}
