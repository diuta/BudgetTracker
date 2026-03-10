"use client";

import { ReactNode } from "react";

interface SummaryCardProps {
    label: string;
    value: string;
    sub?: string;
    accent?: boolean; // crimson accent
    large?: boolean;
    className?: string;
}

export function SummaryCard({ label, value, sub, accent, large, className = "" }: SummaryCardProps) {
    return (
        <div
            className={className}
            style={{
                borderTop: `2px solid ${accent ? "var(--crimson)" : "var(--ink)"}`,
                paddingTop: "12px",
                paddingBottom: "12px",
            }}
        >
            <div
                className="label-caps"
                style={{ color: accent ? "var(--crimson)" : "var(--ink-light)", marginBottom: "6px" }}
            >
                {label}
            </div>
            <div
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: large ? "3rem" : "1.6rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: accent ? "var(--crimson)" : "var(--ink)",
                    letterSpacing: "-0.01em",
                }}
            >
                {value}
            </div>
            {sub && (
                <div
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--ink-ghost)",
                        marginTop: "4px",
                        letterSpacing: "0.08em",
                    }}
                >
                    {sub}
                </div>
            )}
        </div>
    );
}
