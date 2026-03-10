"use client";

import { FIXED_CATEGORIES, INCOME_CATEGORY, ALL_CATEGORIES } from "@/lib/types";

// Categories are now fixed / hardcoded — no CRUD needed.
// This hook simply exposes the static list for backwards compatibility.
export function useCategories() {
    const categories = ALL_CATEGORIES;
    const expenseCategories = FIXED_CATEGORIES;
    const incomeCategory = INCOME_CATEGORY;

    return { categories, expenseCategories, incomeCategory };
}
