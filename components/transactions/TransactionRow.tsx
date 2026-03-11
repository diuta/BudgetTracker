"use client";

import { format, parseISO } from "date-fns";
import type { Transaction, Category } from "@/lib/types";
import { formatIDR } from "@/utils/formatCurrency";

interface TransactionRowProps {
    tx: Transaction;
    cat: Category | undefined;
    isLast: boolean;
    onEdit: (tx: Transaction) => void;
    onDelete: (id: string) => void;
}

export function TransactionRow({ tx, cat, isLast, onEdit, onDelete }: TransactionRowProps) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px 130px 80px",
                gap: "0 16px",
                padding: "14px 24px",
                borderBottom: isLast ? "none" : "1px solid var(--cream-rule)",
                alignItems: "center",
                transition: "background 0.1s",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(26,16,8,0.03)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", fontStyle: tx.note ? "normal" : "italic" }}>
                {tx.note || (cat?.name ?? "—")}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: cat?.color ?? "var(--ink-ghost)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {cat && <span style={{ width: "8px", height: "8px", backgroundColor: cat.color, borderRadius: "2px", flexShrink: 0 }} />}
                {cat?.emoji} {cat?.name ?? "—"}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 600, textAlign: "right", color: "var(--crimson)", whiteSpace: "nowrap" }}>
                −{formatIDR(tx.amount)}
            </span>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button className="btn-ghost" onClick={() => onEdit(tx)} style={{ padding: 0, fontSize: "0.58rem" }}>[edit]</button>
                <button className="btn-ghost" onClick={() => onDelete(tx.id)} style={{ padding: 0, fontSize: "0.58rem", color: "var(--crimson)" }}>[×]</button>
            </div>
        </div>
    );
}

interface DashboardTransactionRowProps {
    tx: Transaction;
    cat: Category | undefined;
}

export function DashboardTransactionRow({ tx, cat }: DashboardTransactionRowProps) {
    return (
        <div
            style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 140px", gap: "0 16px", padding: "14px 28px", borderBottom: "1px solid var(--cream-rule)", alignItems: "center", transition: "background 0.1s", cursor: "default" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(26,16,8,0.03)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--ink-ghost)", letterSpacing: "0.06em" }}>
                {format(parseISO(tx.date), "dd MMM")}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", fontStyle: tx.note ? "normal" : "italic" }}>
                {tx.note || (cat?.name ?? "—")}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: cat?.color ?? "var(--ink-ghost)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {cat && <span style={{ width: "8px", height: "8px", backgroundColor: cat.color, borderRadius: "2px", flexShrink: 0 }} />}
                {cat?.emoji} {cat?.name ?? "—"}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, color: "var(--crimson)", textAlign: "right", whiteSpace: "nowrap" }}>
                −{formatIDR(tx.amount)}
            </span>
        </div>
    );
}
