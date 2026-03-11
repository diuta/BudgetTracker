"use client";

import { useEffect, useRef, useState } from "react";
import type { Transaction, Category } from "@/lib/types";
import { format } from "date-fns";
import { inputToIDR, idrPreview, idrToInput } from "@/utils/formatCurrency";

interface EntryModalProps {
    transaction?: Transaction | null;
    categories: Category[];
    onSave: (data: Omit<Transaction, "id" | "createdAt">) => void;
    onClose: () => void;
}

export function EntryModal({ transaction, categories, onSave, onClose }: EntryModalProps) {
    const isEdit = Boolean(transaction);
    const backdropRef = useRef<HTMLDivElement>(null);

    const defaultCat = categories[0]?.id ?? "";

    const [amountRaw, setAmountRaw] = useState(transaction ? idrToInput(transaction.amount) : "");
    const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? defaultCat);
    const [date, setDate] = useState(
        transaction?.date ? format(new Date(transaction.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")
    );
    const [note, setNote] = useState(transaction?.note ?? "");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = inputToIDR(amountRaw);
        if (!amount || amount <= 0) return;
        onSave({ type: "expense", amount, categoryId, date: new Date(date).toISOString(), note });
        onClose();
    };

    const preview = idrPreview(amountRaw);

    return (
        <div
            ref={backdropRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 100,
                backgroundColor: "rgba(26,16,8,0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
            onClick={e => { if (e.target === backdropRef.current) onClose(); }}
        >
            <div
                className="animate-scale-in"
                style={{
                    backgroundColor: "var(--cream)",
                    borderTop: "3px solid var(--crimson)",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "520px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px 20px", borderBottom: "1px solid var(--cream-rule)" }}>
                    <div>
                        <div className="label-caps" style={{ marginBottom: "3px" }}>{isEdit ? "Edit Entry" : "New Entry"}</div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600, color: "var(--ink)" }}>
                            Record Expense
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-ghost" style={{ fontSize: "1.4rem", lineHeight: 1, padding: "4px 8px" }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                        <div className="label-caps" style={{ marginBottom: "6px" }}>
                            Amount <span style={{ color: "var(--ink-ghost)", fontWeight: 400 }}>(in thousands)</span>
                        </div>
                        <input
                            type="number"
                            min="0"
                            placeholder="e.g. 1500"
                            value={amountRaw}
                            onChange={e => setAmountRaw(e.target.value)}
                            required
                            className="input-editorial"
                            style={{ fontSize: "1.8rem", fontFamily: "var(--font-mono)", paddingBottom: "8px" }}
                        />
                        {preview && (
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--crimson)", marginTop: "6px", letterSpacing: "0.05em", fontWeight: 600 }}>
                                {preview}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="label-caps" style={{ marginBottom: "6px" }}>Category</div>
                        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="select-editorial">
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.emoji} {cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="label-caps" style={{ marginBottom: "6px" }}>Date</div>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="input-editorial" />
                    </div>

                    <div>
                        <div className="label-caps" style={{ marginBottom: "6px" }}>
                            Note <span style={{ color: "var(--ink-ghost)", fontWeight: 400 }}>(optional)</span>
                        </div>
                        <input type="text" placeholder="Description..." value={note} onChange={e => setNote(e.target.value)} className="input-editorial" />
                    </div>

                    <hr className="rule-ghost" />

                    <button type="submit" className="btn-crimson" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.75rem" }}>
                        {isEdit ? "Save Changes" : "+ Add Expense"}
                    </button>
                </form>
            </div>
        </div>
    );
}
