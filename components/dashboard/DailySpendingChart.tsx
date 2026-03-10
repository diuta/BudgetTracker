"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { formatIDR } from "@/utils/formatCurrency";
import { ChartEmptyState } from "@/components/ui/EmptyState";

interface DailySpendingChartProps {
    data: { day: string; amount: number }[];
    monthLabel: string;
}

function BarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ backgroundColor: "var(--ink)", color: "var(--cream)", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", borderRadius: "4px" }}>
            <div style={{ color: "var(--ink-ghost)", marginBottom: "2px", letterSpacing: "0.08em" }}>{label}</div>
            <div style={{ fontWeight: 700 }}>{formatIDR(payload[0].value)}</div>
        </div>
    );
}

export function DailySpendingChart({ data, monthLabel }: DailySpendingChartProps) {
    return (
        <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)" }}>Daily Spending</div>
                <div className="label-caps">{monthLabel}</div>
            </div>
            <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data} barSize={18} margin={{ left: -20, right: 4 }}>
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 9, fill: "var(--ink-ghost)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis hide />
                        <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(196,30,58,0.06)" }} />
                        <Bar dataKey="amount" fill="var(--crimson)" radius={[3, 3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <ChartEmptyState height={180} />
            )}
        </div>
    );
}
