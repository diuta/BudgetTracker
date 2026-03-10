import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { Transaction } from "./types";

export function formatCurrency(amount: number, symbol: string = "$"): string {
    return `${symbol}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function filterByMonth(transactions: Transaction[], year: number, month: number): Transaction[] {
    const date = new Date(year, month, 1);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return transactions.filter(tx => {
        const d = parseISO(tx.date);
        return isWithinInterval(d, { start, end });
    });
}

export function calcTotals(transactions: Transaction[]) {
    let income = 0;
    let expense = 0;
    for (const tx of transactions) {
        if (tx.type === "income") income += tx.amount;
        else expense += tx.amount;
    }
    return { income, expense, net: income - expense };
}

export function groupByCategory(transactions: Transaction[]): Record<string, number> {
    const map: Record<string, number> = {};
    for (const tx of transactions) {
        if (tx.type === "expense") {
            map[tx.categoryId] = (map[tx.categoryId] || 0) + tx.amount;
        }
    }
    return map;
}

export function groupByDay(transactions: Transaction[], year: number, month: number): { day: string; amount: number }[] {
    const map: Record<string, number> = {};
    filterByMonth(transactions, year, month).forEach(tx => {
        if (tx.type === "expense") {
            const key = format(parseISO(tx.date), "MMM d");
            map[key] = (map[key] || 0) + tx.amount;
        }
    });
    return Object.entries(map)
        .map(([day, amount]) => ({ day, amount }))
        .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
}

export function getMonthLabel(year: number, month: number): string {
    return format(new Date(year, month, 1), "MMMM yyyy");
}
