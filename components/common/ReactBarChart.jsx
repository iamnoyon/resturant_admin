"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function ReactBarChart({
    data = [],
    xKey = "month",
    yKey = "amount",
    title = "",
    color = "#8B1E2D",
    height = 320,
    className = "",
    formatter,
    xAxisName = "",
    yAxisName = "",
    backgroundColor = "transparent",
    borderRadius = 8,
    barWidth = 28,
}) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !data?.length) return;

        const chart = echarts.init(chartRef.current);

        const labels = data.map((item) => item[xKey]);
        const values = data.map((item) => Number(item[yKey]) || 0);

        const option = {
            backgroundColor,
            animationDuration: 500,
            title: title
                ? {
                    text: title,
                    left: 0,
                    top: 0,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                    },
                }
                : undefined,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
                backgroundColor: "rgba(17, 24, 39, 0.9)",
                textStyle: {
                    color: "#fff",
                },
                formatter: formatter || ((params) => {
                    const value = params[0]?.value ?? 0;
                    return `${params[0]?.name}<br/>${value}`;
                }),
            },
            grid: {
                left: 18,
                right: 18,
                top: title ? 40 : 18,
                bottom: 22,
                containLabel: true,
            },
            xAxis: {
                type: "category",
                data: labels,
                axisLabel: {
                    color: "#6b7280",
                    fontSize: 11,
                    rotate: 0,
                },
                axisLine: {
                    lineStyle: {
                        color: "#e5e7eb",
                    },
                },
                axisTick: {
                    show: false,
                },
                name: xAxisName,
                nameLocation: "middle",
                nameGap: 26,
                nameTextStyle: {
                    color: "#374151",
                    fontSize: 12,
                },
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#6b7280",
                    fontSize: 11,
                },
                axisLine: {
                    lineStyle: {
                        color: "#e5e7eb",
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "#f3f4f6",
                    },
                },
                name: yAxisName,
                nameTextStyle: {
                    color: "#374151",
                    fontSize: 12,
                },
            },
            series: [
                {
                    name: yKey,
                    type: "bar",
                    data: values,
                    barWidth,
                    itemStyle: {
                        color,
                        borderRadius: [borderRadius, borderRadius, 0, 0],
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: "rgba(59, 130, 246, 0.35)",
                        },
                    },
                    label: {
                        show: false,
                    },
                },
            ],
        };

        chart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });

        resizeObserver.observe(chartRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.dispose();
        };
    }, [backgroundColor, barWidth, borderRadius, color, data, formatter, title, xAxisName, xKey, yAxisName, yKey]);

    return (
        <div
            ref={chartRef}
            className={className}
            style={{
                width: "100%",
                height,
                backgroundColor: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                padding: 8,
            }}
        />
    );
}
