"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Category, DEFAULT_CATEGORIES } from "@/lib/types";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const PRESET_COLORS = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981",
    "#06b6d4", "#3b82f6", "#a855f7", "#ec4899", "#64748b",
];

const AVAILABLE_ICONS = [
    "UtensilsCrossed", "Car", "ShoppingBag", "Heart", "Tv", "Receipt",
    "TrendingUp", "MoreHorizontal", "Coffee", "Plane", "Home", "Book",
    "Music", "Dumbbell", "Gift", "Smartphone", "Globe", "Zap",
];

export default function CategoriesPage() {
    const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
    const [editing, setEditing] = useState<Category | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [formName, setFormName] = useState("");
    const [formColor, setFormColor] = useState(PRESET_COLORS[0]);
    const [formIcon, setFormIcon] = useState(AVAILABLE_ICONS[0]);

    function openAdd() {
        setEditing(null);
        setFormName("");
        setFormColor(PRESET_COLORS[0]);
        setFormIcon(AVAILABLE_ICONS[0]);
        setShowForm(true);
    }

    function openEdit(cat: Category) {
        setEditing(cat);
        setFormName(cat.name);
        setFormColor(cat.color);
        setFormIcon(cat.icon);
        setShowForm(true);
    }

    function handleSave() {
        if (!formName.trim()) return;
        if (editing) {
            updateCategory(editing.id, { name: formName.trim(), color: formColor, icon: formIcon });
        } else {
            addCategory({ name: formName.trim(), color: formColor, icon: formIcon });
        }
        setShowForm(false);
    }

    function renderIcon(name: string, size = 18) {
        const I = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[name];
        return I ? <I size={size} /> : null;
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Categories</h1>
                    <p className="text-sm text-secondary mt-0.5">{categories.length} categories</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-emerald-500/25"
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            {/* Category list */}
            <div className="bg-card rounded-2xl border card-shadow overflow-hidden" style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}>
                {categories.map((cat, i) => (
                    <div
                        key={cat.id}
                        className={`flex items-center gap-4 px-5 py-4 group transition-colors hover:bg-surface-secondary ${i < categories.length - 1 ? "border-b" : ""}`}
                        style={{ borderColor: "rgb(var(--border))" }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                        >
                            {renderIcon(cat.icon)}
                        </div>
                        <span className="flex-1 text-sm font-medium text-primary">{cat.name}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openEdit(cat)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-surface transition-all"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                onClick={() => setDeleteId(cat.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Form Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="w-full max-w-md bg-card rounded-t-2xl md:rounded-2xl shadow-2xl animate-slide-up md:animate-scale-in"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                            <h2 className="text-base font-semibold text-primary">{editing ? "Edit Category" : "New Category"}</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-surface-secondary transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-medium text-secondary mb-1.5">Name</label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={e => setFormName(e.target.value)}
                                    placeholder="Category name"
                                    className="w-full px-4 py-3 rounded-xl border text-primary text-sm bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                    style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-secondary))", color: "rgb(var(--text-primary))" }}
                                />
                            </div>

                            {/* Color picker */}
                            <div>
                                <label className="block text-xs font-medium text-secondary mb-2">Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {PRESET_COLORS.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormColor(color)}
                                            className="w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                                            style={{ backgroundColor: color }}
                                        >
                                            {formColor === color && <Check size={14} className="text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Icon picker */}
                            <div>
                                <label className="block text-xs font-medium text-secondary mb-2">Icon</label>
                                <div className="grid grid-cols-9 gap-1.5">
                                    {AVAILABLE_ICONS.map(icon => (
                                        <button
                                            key={icon}
                                            type="button"
                                            onClick={() => setFormIcon(icon)}
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${formIcon === icon ? "ring-2 ring-emerald-500" : "hover:bg-surface-secondary"
                                                }`}
                                            style={formIcon === icon ? { backgroundColor: `${formColor}20`, color: formColor } : { color: "rgb(var(--text-secondary))" }}
                                        >
                                            {renderIcon(icon, 16)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgb(var(--bg-secondary))" }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${formColor}20`, color: formColor }}>
                                    {renderIcon(formIcon)}
                                </div>
                                <span className="text-sm font-medium text-primary">{formName || "Preview"}</span>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
                            >
                                {editing ? "Save Changes" : "Add Category"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deleteId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="bg-card rounded-2xl p-6 max-w-sm w-full animate-scale-in shadow-2xl"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                    >
                        <h3 className="text-base font-semibold text-primary mb-1">Delete category?</h3>
                        <p className="text-sm text-secondary mb-5">Transactions won&apos;t be deleted, but their category won&apos;t match.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-2.5 rounded-xl border text-sm font-medium text-secondary hover:text-primary transition-colors"
                                style={{ borderColor: "rgb(var(--border))" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { deleteCategory(deleteId); setDeleteId(null); }}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
