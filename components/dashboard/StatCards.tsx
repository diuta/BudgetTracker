"use client";

import { formatIDR } from "@/utils/formatCurrency";

interface StatCardsProps {
    income: number;
    expense: number;
    net: number;
    monthLabel: string;
}

export function StatCards({ income, expense, net, monthLabel }: StatCardsProps) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "24px", marginBottom: "48px", alignItems: "stretch" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="label-caps" style={{ color: "var(--ink-light)" }}>Net Balance — {monthLabel}</div>
                <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: net < 0 ? "var(--crimson)" : "var(--ink)",
                    letterSpacing: "-0.03em",
                }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.35em", fontWeight: 400, verticalAlign: "middle", marginRight: "4px", color: "var(--ink-light)", letterSpacing: "0.05em" }}>
                        {net < 0 ? "−" : "+"}
                    </span>
                    {formatIDR(Math.abs(net))}
                </div>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", marginTop: "auto", paddingTop: "8px", borderTop: "1px solid var(--cream-rule)" }}>
                    Income {formatIDR(income)} &nbsp;•&nbsp; Spent {formatIDR(expense)}
                </div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="label-caps">Total Income</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em", marginTop: "4px" }}>
                    {formatIDR(income)}
                </div>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", marginTop: "auto" }}>This month</div>
            </div>

            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "3px solid var(--crimson)" }}>
                <div className="label-caps" style={{ color: "var(--crimson)" }}>Total Spent</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1, color: "var(--crimson)", letterSpacing: "-0.02em", marginTop: "4px" }}>
                    {formatIDR(expense)}
                </div>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", marginTop: "auto" }}>This month</div>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
