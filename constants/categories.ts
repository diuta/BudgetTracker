import type { Category } from "@/lib/types";

export const FIXED_CATEGORIES: Category[] = [
    { id: "shopping", name: "Shopping", emoji: "🛍️", color: "#A0522D" },
    { id: "food", name: "Food & Hangout", emoji: "🍜", color: "#C41E3A" },
    { id: "bills", name: "Bills & Subscriptions", emoji: "⚡", color: "#4A6741" },
    { id: "groceries", name: "Groceries", emoji: "🛒", color: "#8B6914" },
    { id: "unexpected", name: "Unexpected Expenses", emoji: "🚨", color: "#6B3A5C" },
    { id: "transport", name: "Transport", emoji: "🚗", color: "#2B4A6B" },
];

export const INCOME_CATEGORY: Category = {
    id: "income",
    name: "Income",
    emoji: "💰",
    color: "#1A4A1A",
};

export const ALL_CATEGORIES: Category[] = [...FIXED_CATEGORIES, INCOME_CATEGORY];
