"use client";

import type { Transaction, Category } from "@/lib/types";
import { DashboardTransactionRow } from "@/components/transactions/TransactionRow";

interface RecentEntriesProps {
    transactions: Transaction[];
    categories: Category[];
    onAddClick: () => void;
}

export function RecentEntries({ transactions, categories, onAddClick }: RecentEntriesProps) {
    return (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 28px 20px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)" }}>
                    Recent Entries
                </div>
                <a href="/transactions" className="btn-ghost">View All →</a>
            </div>
            <hr className="rule-ghost" style={{ margin: "0 28px" }} />

            {transactions.length === 0 ? (
                <div style={{ padding: "48px 28px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink-ghost)" }}>
                        No transactions recorded yet.
                    </div>
                    <button className="btn-crimson" onClick={onAddClick} style={{ marginTop: "16px" }}>
                        + Add First Entry
                    </button>
                </div>
            ) : (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 140px", gap: "0 16px", padding: "12px 28px", borderBottom: "1px solid var(--cream-rule)" }}>
                        {["Date", "Description", "Category", "Amount"].map((h, i) => (
                            <span key={h} className="label-caps" style={{ textAlign: i === 3 ? "right" : "left" }}>{h}</span>
                        ))}
                    </div>
                    {transactions.map(tx => {
                        const cat = categories.find(c => c.id === tx.categoryId);
                        return <DashboardTransactionRow key={tx.id} tx={tx} cat={cat} />;
                    })}
                </>
            )}
        </div>
    );
}
