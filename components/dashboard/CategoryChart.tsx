"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { formatIDR } from "@/utils/formatCurrency";
import { ChartEmptyState } from "@/components/ui/EmptyState";

interface CategoryChartEntry {
    name: string;
    emoji: string;
    value: number;
    color: string;
}

interface CategoryChartProps {
    data: CategoryChartEntry[];
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ backgroundColor: "var(--ink)", color: "var(--cream)", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", borderRadius: "4px" }}>
            <div style={{ marginBottom: "2px", letterSpacing: "0.06em" }}>{payload[0].name}</div>
            <div style={{ fontWeight: 700 }}>{formatIDR(payload[0].value)}</div>
        </div>
    );
}

export function CategoryChart({ data }: CategoryChartProps) {
    return (
        <div className="card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "20px" }}>
                By Category
            </div>
            <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
            {data.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={66} dataKey="value" paddingAngle={3}>
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<PieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        {data.map((d, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ width: "10px", height: "10px", backgroundColor: d.color, flexShrink: 0, borderRadius: "2px" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--ink-light)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.emoji} {d.name}</span>
                                </div>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--ink)", fontWeight: 600 }}>{formatIDR(d.value)}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <ChartEmptyState height={150} />
            )}
        </div>
    );
}
