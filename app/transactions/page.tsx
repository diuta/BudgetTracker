"use client";

import { useState, useMemo, useCallback } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { filterByMonth, getMonthLabel, groupByDate } from "@/utils/dateHelpers";
import type { Transaction } from "@/lib/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { MonthNavigator } from "@/components/ui/MonthNavigator";
import { EntryModal } from "@/components/ui/EntryModal";
import { TransactionList } from "@/components/transactions/TransactionList";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TransactionsPage() {
    const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const { categories } = useCategories();

    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Transaction | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const monthLabel = getMonthLabel(year, month);

    const filtered = useMemo(() => {
        let txs = filterByMonth(transactions, year, month);
        if (search.trim()) {
            const q = search.toLowerCase();
            txs = txs.filter(tx => {
                const cat = categories.find(c => c.id === tx.categoryId);
                return tx.note.toLowerCase().includes(q) || (cat?.name.toLowerCase().includes(q) ?? false);
            });
        }
        return [...txs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, year, month, search, categories]);

    const groups = useMemo(() => groupByDate(filtered), [filtered]);

    const handleSave = useCallback((data: Omit<Transaction, "id" | "createdAt">) => {
        if (editing) updateTransaction(editing.id, data);
        else addTransaction(data);
        setEditing(null);
    }, [editing, updateTransaction, addTransaction]);

    function prevMonth() {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    }

    function nextMonth() {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    }

    const openAdd = () => { setEditing(null); setShowModal(true); };
    const openEdit = (tx: Transaction) => { setEditing(tx); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditing(null); };

    return (
        <div className="animate-fade-in">
            <PageHeader
                eyebrow={`${filtered.length} entries this period`}
                title="Transactions"
                action={<button className="btn-crimson" onClick={openAdd}>+ New Entry</button>}
            />

            <div style={{ display: "flex", gap: "24px", marginBottom: "40px", alignItems: "center", flexWrap: "wrap" }}>
                <MonthNavigator label={monthLabel} onPrev={prevMonth} onNext={nextMonth} />
                <input
                    type="text"
                    placeholder="Search entries..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        flex: 1, minWidth: "160px", border: 0,
                        borderBottom: "1px solid var(--ink-mid)",
                        backgroundColor: "transparent",
                        fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                        padding: "6px 0", color: "var(--ink)", outline: "none",
                        letterSpacing: "0.06em",
                    }}
                />
            </div>

            {groups.length === 0 ? (
                <div className="card" style={{ padding: "48px", textAlign: "center" }}>
                    <EmptyState message="No entries found." actionLabel="+ Add Entry" onAction={openAdd} />
                </div>
            ) : (
                <TransactionList groups={groups} categories={categories} onEdit={openEdit} onDelete={setDeleteId} />
            )}

            {deleteId && (
                <ConfirmDialog
                    title="Delete this entry?"
                    message="This action cannot be undone."
                    confirmLabel="Delete"
                    onConfirm={() => { deleteTransaction(deleteId); setDeleteId(null); }}
                    onCancel={() => setDeleteId(null)}
                />
            )}

            {showModal && (
                <EntryModal transaction={editing} categories={categories} onSave={handleSave} onClose={closeModal} />
            )}
        </div>
    );
}
