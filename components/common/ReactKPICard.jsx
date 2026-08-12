"use client";

export default function ReactKPICard({
    data = [],
    title = "",
    height = "auto",
    className = "",
    loading = false,
    valueFormatter,
    gridCols = 2,
}) {
    const formatValue = (value) => {
        if (valueFormatter) return valueFormatter(value);
        if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
        if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
        return value?.toLocaleString?.() ?? value;
    };

    const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width: "100%",
                height,
                backgroundColor: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                padding: 20,
            }}
        >
            {title && (
                <h3
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 16,
                    }}
                >
                    {title}
                </h3>
            )}

            {loading ? (
                <div
                    className="grid gap-3"
                    style={{
                        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    }}
                >
                    {Array.from({ length: data.length || 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse"
                            style={{
                                padding: 14,
                                borderRadius: 10,
                                backgroundColor: "#f9fafb",
                                border: "1px solid #f3f4f6",
                            }}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "50%",
                                        backgroundColor: "#e5e7eb",
                                    }}
                                />
                                <div
                                    style={{
                                        width: "60%",
                                        height: 12,
                                        borderRadius: 4,
                                        backgroundColor: "#e5e7eb",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    width: "40%",
                                    height: 20,
                                    borderRadius: 4,
                                    backgroundColor: "#e5e7eb",
                                    marginLeft: 20,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="grid gap-3"
                    style={{
                        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                    }}
                >
                    {data.map((item, index) => {
                        const value = Number(item.value) || 0;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

                        return (
                            <div
                                key={item.name || index}
                                style={{
                                    padding: 14,
                                    borderRadius: 10,
                                    backgroundColor: "#f9fafb",
                                    border: `1px solid ${item.color || "#e5e7eb"}20`,
                                    borderLeft: `3px solid ${item.color || "#e5e7eb"}`,
                                }}
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    <span
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: item.color || "#e5e7eb",
                                            display: "inline-block",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 12,
                                            color: "#6b7280",
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between">
                                    <span
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 700,
                                            color: "#111827",
                                        }}
                                    >
                                        {formatValue(value)}
                                    </span>

                                    {total > 0 && (
                                        <span
                                            style={{
                                                fontSize: 11,
                                                color: "#9ca3af",
                                            }}
                                        >
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
