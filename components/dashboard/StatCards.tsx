"use client";

import { formatIDR } from "@/utils/formatCurrency";

interface StatCardsProps {
    expense: number;
    monthLabel: string;
}

export function StatCards({ expense, monthLabel }: StatCardsProps) {
    return (
        <div className="stat-cards-grid" style={{ marginBottom: "48px" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "3px solid var(--crimson)" }}>
                <div className="label-caps" style={{ color: "var(--crimson)" }}>Total Spent — {monthLabel}</div>
                <div className="stat-balance-value" style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 4.8rem)",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "var(--crimson)",
                    letterSpacing: "-0.03em",
                    wordBreak: "break-word",
                }}>
                    {formatIDR(expense)}
                </div>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", marginTop: "auto", paddingTop: "8px", borderTop: "1px solid var(--cream-rule)" }}>
                    All expenses this month
                </div>
            </div>
        </div>
    );
}
