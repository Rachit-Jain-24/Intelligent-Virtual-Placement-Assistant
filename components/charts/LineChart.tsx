"use client";

import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface LineChartProps {
    data: Array<{ name: string; value: number }>;
    dataKey?: string;
}

export function LineChart({ data, dataKey = "value" }: LineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke="hsl(348 83% 47%)"
                    strokeWidth={2}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}
