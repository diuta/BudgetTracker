"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getTransactions, saveTransactions } from "@/lib/storage";
import { Transaction } from "@/lib/types";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        setTransactions(getTransactions());
    }, []);

    const addTransaction = useCallback((tx: Omit<Transaction, "id" | "createdAt">) => {
        const newTx: Transaction = {
            ...tx,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        };
        setTransactions(prev => {
            const updated = [newTx, ...prev];
            saveTransactions(updated);
            return updated;
        });
    }, []);

    const updateTransaction = useCallback((id: string, updates: Partial<Omit<Transaction, "id" | "createdAt">>) => {
        setTransactions(prev => {
            const updated = prev.map(tx => tx.id === id ? { ...tx, ...updates } : tx);
            saveTransactions(updated);
            return updated;
        });
    }, []);

    const deleteTransaction = useCallback((id: string) => {
        setTransactions(prev => {
            const updated = prev.filter(tx => tx.id !== id);
            saveTransactions(updated);
            return updated;
        });
    }, []);

    return { transactions, addTransaction, updateTransaction, deleteTransaction };
}
