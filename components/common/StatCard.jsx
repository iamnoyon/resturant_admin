"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    trendValue,
    trend = "up",
    className = "",
}) {
    const isUp = trend === "up";

    return (
        <div
            className={`flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${className}`}
        >
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {trendValue != null && (
                    <div className="flex items-center gap-1">
                        {isUp ? (
                            <TrendingUp size={16} className="text-green-500" />
                        ) : (
                            <TrendingDown size={16} className="text-red-500" />
                        )}
                        <span
                            className={`text-sm font-medium ${
                                isUp ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {trendValue}%
                        </span>
                    </div>
                )}
            </div>
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isUp ? "bg-green-50" : "bg-red-50"
                }`}
            >
                <Icon
                    size={24}
                    className={isUp ? "text-green-600" : "text-red-600"}
                />
            </div>
        </div>
    );
}
