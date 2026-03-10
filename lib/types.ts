export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  note: string;
  createdAt: string;
}

export interface Settings {
  _version: number;
}

export { FIXED_CATEGORIES, INCOME_CATEGORY, ALL_CATEGORIES, ALL_CATEGORIES as DEFAULT_CATEGORIES } from "@/constants/categories";

export const DEFAULT_SETTINGS: Settings = {
  _version: 2,
};
