"use client";

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface BarChartProps {
    data: Array<{ name: string; value: number }>;
    dataKey?: string;
}

export function BarChart({ data, dataKey = "value" }: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={dataKey} fill="hsl(348 83% 47%)" />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}
