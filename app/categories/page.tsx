"use client";

import { FIXED_CATEGORIES } from "@/constants/categories";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CategoriesPage() {
    return (
        <div className="animate-fade-in">
            <PageHeader
                eyebrow={`Fixed • ${FIXED_CATEGORIES.length} categories`}
                title="Categories"
            />

            <div className="card-sm" style={{ marginBottom: "40px", borderLeft: "3px solid var(--crimson)" }}>
                <div className="label-caps" style={{ color: "var(--crimson)", marginBottom: "6px" }}>Fixed Categories</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-mid)", lineHeight: 1.6 }}>
                    These six categories are curated for personal expense tracking. They cover all common spending patterns and are used consistently across all entries, charts, and reports.
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                {FIXED_CATEGORIES.map(cat => (
                    <div key={cat.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: `3px solid ${cat.color}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{cat.emoji}</span>
                            <div>
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>{cat.name}</div>
                                <div className="label-caps" style={{ marginTop: "2px" }}>{cat.id}</div>
                            </div>
                        </div>
                        <hr className="rule-ghost" />
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "14px", height: "14px", backgroundColor: cat.color, borderRadius: "3px" }} />
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--ink-light)", letterSpacing: "0.1em" }}>{cat.color}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
