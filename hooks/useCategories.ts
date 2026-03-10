"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCategories, saveCategories } from "@/lib/storage";
import { Category, DEFAULT_CATEGORIES } from "@/lib/types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

    useEffect(() => {
        setCategories(getCategories());
    }, []);

    const addCategory = useCallback((cat: Omit<Category, "id">) => {
        const newCat: Category = { ...cat, id: uuidv4() };
        setCategories(prev => {
            const updated = [...prev, newCat];
            saveCategories(updated);
            return updated;
        });
    }, []);

    const updateCategory = useCallback((id: string, updates: Partial<Omit<Category, "id">>) => {
        setCategories(prev => {
            const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
            saveCategories(updated);
            return updated;
        });
    }, []);

    const deleteCategory = useCallback((id: string) => {
        setCategories(prev => {
            const updated = prev.filter(c => c.id !== id);
            saveCategories(updated);
            return updated;
        });
    }, []);

    return { categories, addCategory, updateCategory, deleteCategory };
}
