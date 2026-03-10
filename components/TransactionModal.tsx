"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Transaction, Category } from "@/lib/types";
import { format } from "date-fns";
import * as Icons from "lucide-react";

interface Props {
    transaction?: Transaction | null;
    categories: Category[];
    currencySymbol: string;
    onSave: (data: Omit<Transaction, "id" | "createdAt">) => void;
    onClose: () => void;
}

export function TransactionModal({ transaction, categories, currencySymbol, onSave, onClose }: Props) {
    const isEdit = Boolean(transaction);
    const backdropRef = useRef<HTMLDivElement>(null);

    const [type, setType] = useState<"income" | "expense">(transaction?.type ?? "expense");
    const [amount, setAmount] = useState(transaction ? String(transaction.amount) : "");
    const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? categories[0]?.id ?? "");
    const [date, setDate] = useState(transaction?.date ? format(new Date(transaction.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));
    const [note, setNote] = useState(transaction?.note ?? "");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = parseFloat(amount);
        if (!parsed || isNaN(parsed)) return;
        onSave({
            type,
            amount: parsed,
            categoryId,
            date: new Date(date).toISOString(),
            note,
        });
        onClose();
    };

    const expenseCategories = categories.filter(c => c.id !== "income");
    const incomeCategories = categories.filter(c => c.id === "income" || c.name.toLowerCase().includes("income"));
    const filteredCategories = type === "income"
        ? categories.filter(c => c.id === "income")
        : categories.filter(c => c.id !== "income");

    function renderIcon(iconName: string, size = 16) {
        const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[iconName];
        if (!IconComp) return null;
        return <IconComp size={size} />;
    }

    const selectedCategory = categories.find(c => c.id === categoryId);

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
        >
            <div
                className="w-full max-w-md bg-card rounded-t-2xl md:rounded-2xl shadow-2xl animate-slide-up md:animate-scale-in"
                style={{ backgroundColor: "rgb(var(--bg-card))" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                    <h2 className="text-base font-semibold text-primary">
                        {isEdit ? "Edit Transaction" : "New Transaction"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Type toggle */}
                    <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "rgb(var(--border))" }}>
                        {(["expense", "income"] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => {
                                    setType(t);
                                    if (t === "income") setCategoryId("income");
                                    else setCategoryId(categories.find(c => c.id !== "income")?.id ?? "");
                                }}
                                className={`flex-1 py-2.5 text-sm font-medium transition-all capitalize ${type === t
                                    ? t === "expense"
                                        ? "bg-red-500 text-white"
                                        : "bg-emerald-500 text-white"
                                    : "text-secondary hover:text-primary"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-medium text-secondary mb-1.5">Amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm font-medium">
                                {currencySymbol}
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                required
                                className="w-full pl-8 pr-4 py-3 rounded-xl border text-primary text-base font-medium bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-secondary))", color: "rgb(var(--text-primary))" }}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-medium text-secondary mb-1.5">Category</label>
                        <div className="relative">
                            <select
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border text-primary text-sm bg-surface-secondary appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-secondary))", color: "rgb(var(--text-primary))" }}
                            >
                                {filteredCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-xs font-medium text-secondary mb-1.5">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-xl border text-primary text-sm bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-secondary))", color: "rgb(var(--text-primary))" }}
                        />
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-xs font-medium text-secondary mb-1.5">Note <span className="text-muted">(optional)</span></label>
                        <input
                            type="text"
                            placeholder="What was this for?"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border text-primary text-sm bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-secondary))", color: "rgb(var(--text-primary))" }}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                    >
                        {isEdit ? "Save Changes" : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}
