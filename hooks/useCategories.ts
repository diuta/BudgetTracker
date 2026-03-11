"use client";

import { FIXED_CATEGORIES } from "@/constants/categories";

export function useCategories() {
    return { categories: FIXED_CATEGORIES };
}
