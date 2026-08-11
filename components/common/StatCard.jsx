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
    isExpense = false,
    loading = false,
}) {
    const isUp = trend === "up";
    const isDown = trend === "down";
    const isStable = trend === "stable";

    if (loading) {
        return (
            <div
                className={`flex items-center justify-between rounded-lg border border-gray-200 border-b-4 bg-white p-5 shadow-sm ${borderColor} ${className}`}
            >
                <div className="flex flex-1 flex-col gap-2">
                    {/* Title skeleton */}
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

                    {/* Value skeleton */}
                    <div className="h-7 w-36 animate-pulse rounded bg-gray-200" />

                    {/* Trend skeleton */}
                    <div className="mt-1 flex items-center gap-2">
                        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                    </div>
                </div>

                {/* Icon skeleton */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 animate-pulse" />
            </div>
        );
    }

    const iconColorClass = isExpense
        ? isUp
            ? "text-red-500"
            : isDown
                ? "text-green-500"
                : "text-gray-500"
        : isUp
            ? "text-green-500"
            : isDown
                ? "text-red-500"
                : "text-gray-500";

    const badgeColorClass = isExpense
        ? isUp
            ? "bg-red-50 text-red-600"
            : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600"
        : isUp
            ? "bg-green-50 text-green-600"
            : isDown
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600";

    return (
        <div
            className={`flex items-center justify-between rounded-lg border border-gray-200 border-b-4 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md ${borderColor} ${className}`}
        >
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">
                    {title}
                </span>

                <span className="text-xl font-semibold text-gray-900">
                    {value}
                </span>

                {trendValue != null && (
                    <div className="flex items-center gap-1">
                        {isUp && (
                            <TrendingUp
                                size={16}
                                className={iconColorClass}
                            />
                        )}

                        {isDown && (
                            <TrendingDown
                                size={16}
                                className={iconColorClass}
                            />
                        )}

                        {isStable && (
                            <Minus
                                size={16}
                                className={iconColorClass}
                            />
                        )}

                        <span
                            className={`text-sm font-medium ${iconColorClass}`}
                        >
                            {trendValue}%
                        </span>
                    </div>
                )}
            </div>

            <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${badgeColorClass.split(" ")[0]
                    }`}
            >
                {Icon && (
                    <Icon
                        size={24}
                        className={
                            badgeColorClass.split(" ")[1] ||
                            "text-gray-600"
                        }
                    />
                )}
            </div>
        </div>
    );
}