export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: "expense";
  categoryId: string;
  date: string;
  note: string;
  createdAt: string;
}

export interface Settings {
  _version: number;
}

export { FIXED_CATEGORIES, ALL_CATEGORIES, DEFAULT_CATEGORIES } from "@/constants/categories";

export const DEFAULT_SETTINGS: Settings = {
  _version: 2,
};
