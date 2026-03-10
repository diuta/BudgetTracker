import { Category, DEFAULT_CATEGORIES, DEFAULT_SETTINGS, Settings, Transaction } from "./types";

const KEYS = {
    transactions: "spendings_transactions",
    categories: "spendings_categories",
    settings: "spendings_settings",
};

export function getTransactions(): Transaction[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(KEYS.transactions);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveTransactions(transactions: Transaction[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.transactions, JSON.stringify(transactions));
}

export function getCategories(): Category[] {
    if (typeof window === "undefined") return DEFAULT_CATEGORIES;
    try {
        const raw = localStorage.getItem(KEYS.categories);
        return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES;
    } catch {
        return DEFAULT_CATEGORIES;
    }
}

export function saveCategories(categories: Category[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.categories, JSON.stringify(categories));
}

export function getSettings(): Settings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
        const raw = localStorage.getItem(KEYS.settings);
        return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export function saveSettings(settings: Settings): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.settings, JSON.stringify(settings));
}

export function exportData(): string {
    return JSON.stringify({
        transactions: getTransactions(),
        categories: getCategories(),
        settings: getSettings(),
        exportedAt: new Date().toISOString(),
    }, null, 2);
}

export function importData(raw: string): void {
    const data = JSON.parse(raw);
    if (data.transactions) saveTransactions(data.transactions);
    if (data.categories) saveCategories(data.categories);
    if (data.settings) saveSettings(data.settings);
}

export function clearAllData(): void {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
