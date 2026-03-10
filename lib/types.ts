export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO string
  note: string;
  createdAt: string;
}

export interface Settings {
  currency: string;
  currencySymbol: string;
  theme: "light" | "dark" | "system";
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "food", name: "Food & Drink", color: "#f97316", icon: "UtensilsCrossed" },
  { id: "transport", name: "Transport", color: "#3b82f6", icon: "Car" },
  { id: "shopping", name: "Shopping", color: "#a855f7", icon: "ShoppingBag" },
  { id: "health", name: "Health", color: "#22c55e", icon: "Heart" },
  { id: "entertainment", name: "Entertainment", color: "#ec4899", icon: "Tv" },
  { id: "bills", name: "Bills", color: "#ef4444", icon: "Receipt" },
  { id: "income", name: "Income", color: "#10b981", icon: "TrendingUp" },
  { id: "other", name: "Other", color: "#64748b", icon: "MoreHorizontal" },
];

export const DEFAULT_SETTINGS: Settings = {
  currency: "USD",
  currencySymbol: "$",
  theme: "system",
};
