import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import type { Transaction } from "@/lib/types";

export function filterByMonth(transactions: Transaction[], year: number, month: number): Transaction[] {
    const date = new Date(year, month, 1);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return transactions.filter(tx => isWithinInterval(parseISO(tx.date), { start, end }));
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
            const key = format(parseISO(tx.date), "d MMM");
            map[key] = (map[key] || 0) + tx.amount;
        }
    });
    return Object.entries(map)
        .map(([day, amount]) => ({ day, amount }))
        .sort((a, b) => {
            const [da, ma] = a.day.split(" ");
            const [db, mb] = b.day.split(" ");
            return new Date(`${ma} ${da}, 2000`).getTime() - new Date(`${mb} ${db}, 2000`).getTime();
        });
}

export function getMonthLabel(year: number, month: number): string {
    return format(new Date(year, month, 1), "MMMM yyyy").toUpperCase();
}

export function groupByDate(transactions: Transaction[]): { date: string; txs: Transaction[] }[] {
    const map: Record<string, Transaction[]> = {};
    transactions.forEach(tx => {
        const key = format(parseISO(tx.date), "yyyy-MM-dd");
        if (!map[key]) map[key] = [];
        map[key].push(tx);
    });
    return Object.entries(map)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, txs]) => ({ date, txs }));
}
