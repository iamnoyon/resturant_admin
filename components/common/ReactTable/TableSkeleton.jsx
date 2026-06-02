'use client';

/**
 * TableSkeleton Component
 * 
 * Displays a loading skeleton for tables with customizable column and row counts.
 * 
 * @param {number} columnLength - Number of columns to display (default: 5)
 * @param {number} rowLength - Number of rows to display (default: 5)
 * 
 * @example
 * <TableSkeleton columnLength={5} rowLength={8} />
 */
export default function TableSkeleton({ columnLength = 5, rowLength = 5 }) {
    return (
        <div className="w-full rounded-lg overflow-hidden border border-[#e5e7eb]">
            {/* Table Header Skeleton */}
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7a] border-b border-[#1a2a4a]">
                <div className="flex">
                    {Array.from({ length: columnLength }).map((_, colIndex) => (
                        <div
                            key={`header-${colIndex}`}
                            className="flex-1 px-4 py-4 sm:px-6 sm:py-5"
                        >
                            <div className="h-4 bg-[#4a6a9a] rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table Body Skeleton */}
            <div className="divide-y divide-[#e5e7eb]">
                {Array.from({ length: rowLength }).map((_, rowIndex) => (
                    <div
                        key={`row-${rowIndex}`}
                        className={`flex ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'
                            } hover:bg-[#f3f4f6] transition-colors`}
                    >
                        {Array.from({ length: columnLength }).map((_, colIndex) => (
                            <div
                                key={`cell-${rowIndex}-${colIndex}`}
                                className="flex-1 px-4 py-4 sm:px-6 sm:py-5"
                            >
                                <div className="h-4 bg-[#e5e7eb] rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="bg-[#f9fafb] px-4 py-4 sm:px-6 sm:py-5 border-t border-[#e5e7eb] flex items-center justify-between">
                <div className="h-4 w-32 bg-[#e5e7eb] rounded animate-pulse"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-[#e5e7eb] rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-[#e5e7eb] rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-[#e5e7eb] rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
