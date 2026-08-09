"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({
    title,
    value,
    iconName: Icon,
    trendValue,
    trend = "up",
    borderColor = "border-b-gray-400",
    className = "",
}) {
    const isUp = trend === "up";
    const isDown = trend === "down";
    const isStable = trend === "stable";

    return (
        <div
            className={`flex items-center justify-between rounded-lg border border-gray-200 border-b-4 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md ${borderColor} ${className}`}
        >
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                {trendValue != null && (
                    <div className="flex items-center gap-1">
                        {isUp && <TrendingUp size={16} className="text-green-500" />}
                        {isDown && <TrendingDown size={16} className="text-red-500" />}
                        {isStable && <Minus size={16} className="text-gray-500" />}
                        <span
                            className={`text-sm font-medium ${
                                isUp
                                    ? "text-green-500"
                                    : isDown
                                      ? "text-red-500"
                                      : "text-gray-500"
                            }`}
                        >
                            {trendValue}%
                        </span>
                    </div>
                )}
            </div>
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isUp ? "bg-green-50" : isDown ? "bg-red-50" : "bg-gray-100"
                }`}
            >
                {Icon && (
                    <Icon
                        size={24}
                        className={isUp ? "text-green-600" : isDown ? "text-red-600" : "text-gray-600"}
                    />
                )}
            </div>
        </div>
    );
}
