"use client";

import { useState, useMemo, useCallback } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { filterByMonth, formatCurrency, getMonthLabel } from "@/lib/utils";
import { Transaction } from "@/lib/types";
import { TransactionModal } from "@/components/TransactionModal";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Plus, ChevronLeft, ChevronRight, Pencil, Trash2, Search } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function TransactionsPage() {
    const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const { categories } = useCategories();
    const { settings } = useSettings();

    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Transaction | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let txs = filterByMonth(transactions, year, month);
        if (search.trim()) {
            const q = search.toLowerCase();
            txs = txs.filter(tx => {
                const cat = categories.find(c => c.id === tx.categoryId);
                return (
                    tx.note.toLowerCase().includes(q) ||
                    (cat?.name.toLowerCase().includes(q) ?? false)
                );
            });
        }
        return [...txs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, year, month, search, categories]);

    function prevMonth() {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    }
    function nextMonth() {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    }

    const handleSave = useCallback((data: Omit<Transaction, "id" | "createdAt">) => {
        if (editing) {
            updateTransaction(editing.id, data);
        } else {
            addTransaction(data);
        }
        setEditing(null);
    }, [editing, updateTransaction, addTransaction]);

    const sym = settings.currencySymbol;

    // Group by date
    const grouped = useMemo(() => {
        const map: Record<string, typeof filtered> = {};
        filtered.forEach(tx => {
            const key = format(parseISO(tx.date), "yyyy-MM-dd");
            if (!map[key]) map[key] = [];
            map[key].push(tx);
        });
        return Object.entries(map)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, txs]) => ({ date, txs }));
    }, [filtered]);

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Transactions</h1>
                    <p className="text-sm text-secondary mt-0.5">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setShowModal(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-emerald-500/25"
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            {/* Month picker */}
            <div className="flex items-center gap-3 mb-5">
                <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors">
                    <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-primary">{getMonthLabel(year, month)}</span>
                <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors">
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-5">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-primary bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))", color: "rgb(var(--text-primary))" }}
                />
            </div>

            {/* Transaction list */}
            {grouped.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-sm text-muted">No transactions found.</p>
                    <button
                        onClick={() => { setEditing(null); setShowModal(true); }}
                        className="mt-3 text-sm font-medium text-emerald-500 hover:text-emerald-600"
                    >
                        Add one →
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {grouped.map(({ date, txs }) => (
                        <div key={date}>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                                    {format(new Date(date), "EEEE, MMM d")}
                                </span>
                                <div className="flex-1 h-px" style={{ backgroundColor: "rgb(var(--border))" }} />
                            </div>
                            <div
                                className="bg-card rounded-2xl border card-shadow overflow-hidden"
                                style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
                            >
                                {txs.map((tx, i) => {
                                    const cat = categories.find(c => c.id === tx.categoryId);
                                    return (
                                        <div
                                            key={tx.id}
                                            className={`flex items-center gap-4 px-5 py-4 group transition-colors hover:bg-surface-secondary ${i < txs.length - 1 ? "border-b" : ""}`}
                                            style={{ borderColor: "rgb(var(--border))" }}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                                                style={{ backgroundColor: `${cat?.color ?? "#64748b"}18`, color: cat?.color ?? "#64748b" }}
                                            >
                                                {cat?.name?.charAt(0) ?? "?"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-primary truncate">{tx.note || cat?.name || "Transaction"}</p>
                                                <CategoryBadge category={cat} className="mt-1" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-semibold tabular-nums ${tx.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                                                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount, sym)}
                                                </span>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => { setEditing(tx); setShowModal(true); }}
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-surface transition-all"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(tx.id)}
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete confirmation */}
            {deleteId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="bg-card rounded-2xl p-6 max-w-sm w-full animate-scale-in shadow-2xl"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                    >
                        <h3 className="text-base font-semibold text-primary mb-1">Delete transaction?</h3>
                        <p className="text-sm text-secondary mb-5">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-2.5 rounded-xl border text-sm font-medium text-secondary hover:text-primary transition-colors"
                                style={{ borderColor: "rgb(var(--border))" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { deleteTransaction(deleteId); setDeleteId(null); }}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <TransactionModal
                    transaction={editing}
                    categories={categories}
                    currencySymbol={sym}
                    onSave={handleSave}
                    onClose={() => { setShowModal(false); setEditing(null); }}
                />
            )}
        </div>
    );
}
