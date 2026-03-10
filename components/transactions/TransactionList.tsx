"use client";

import { format } from "date-fns";
import type { Transaction, Category } from "@/lib/types";
import { TransactionRow } from "./TransactionRow";

interface TransactionListProps {
    groups: { date: string; txs: Transaction[] }[];
    categories: Category[];
    onEdit: (tx: Transaction) => void;
    onDelete: (id: string) => void;
}

export function TransactionList({ groups, categories, onEdit, onDelete }: TransactionListProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {groups.map(({ date, txs }) => (
                <div key={date}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.16em", color: "var(--ink-ghost)", fontWeight: 700, whiteSpace: "nowrap" }}>
                            {format(new Date(date + "T12:00:00"), "EEEE, d MMMM yyyy").toUpperCase()}
                        </span>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--cream-rule)" }} />
                    </div>

                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 130px 80px", gap: "0 16px", padding: "12px 24px", backgroundColor: "rgba(26,16,8,0.03)" }}>
                            {["Description", "Category", "Amount", ""].map((h, i) => (
                                <span key={i} className="label-caps" style={{ textAlign: i === 2 ? "right" : "left" }}>{h}</span>
                            ))}
                        </div>
                        <hr className="rule-ghost" />
                        {txs.map((tx, i) => {
                            const cat = categories.find(c => c.id === tx.categoryId);
                            return (
                                <TransactionRow
                                    key={tx.id}
                                    tx={tx}
                                    cat={cat}
                                    isLast={i === txs.length - 1}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
