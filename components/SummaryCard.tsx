"use client";

import { ReactNode } from "react";

interface SummaryCardProps {
    label: string;
    value: string;
    icon?: ReactNode;
    trend?: "up" | "down" | "neutral";
    accent?: string;
    className?: string;
}

export function SummaryCard({ label, value, icon, trend, accent, className = "" }: SummaryCardProps) {
    return (
        <div
            className={`bg-card rounded-2xl p-5 card-shadow border border-surface flex flex-col gap-3 transition-transform hover:-translate-y-0.5 ${className}`}
            style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary uppercase tracking-wide">{label}</span>
                {icon && (
                    <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: accent ? `${accent}20` : "rgb(var(--bg-secondary))" }}
                    >
                        <div style={{ color: accent }}>{icon}</div>
                    </div>
                )}
            </div>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-primary tracking-tight">{value}</span>
                {trend && (
                    <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend === "up"
                                ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                                : trend === "down"
                                    ? "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                                    : "bg-surface-secondary text-secondary"
                            }`}
                    >
                        {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"}
                    </span>
                )}
            </div>
        </div>
    );
}
