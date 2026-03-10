"use client";

import { useRef, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { clearAllData, exportData, importData } from "@/lib/storage";
import { Settings } from "@/lib/types";
import { Sun, Moon, Monitor, Download, Upload, Trash2, AlertTriangle, Check } from "lucide-react";

const CURRENCIES = [
    { code: "USD", symbol: "$", label: "US Dollar" },
    { code: "EUR", symbol: "€", label: "Euro" },
    { code: "GBP", symbol: "£", label: "British Pound" },
    { code: "JPY", symbol: "¥", label: "Japanese Yen" },
    { code: "IDR", symbol: "Rp", label: "Indonesian Rupiah" },
    { code: "SGD", symbol: "S$", label: "Singapore Dollar" },
    { code: "AUD", symbol: "A$", label: "Australian Dollar" },
    { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
    { code: "INR", symbol: "₹", label: "Indian Rupee" },
    { code: "CNY", symbol: "¥", label: "Chinese Yuan" },
];

const THEMES: { value: Settings["theme"]; label: string; icon: React.ElementType }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

export default function SettingsPage() {
    const { settings, updateSettings } = useSettings();
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [importSuccess, setImportSuccess] = useState(false);
    const [importError, setImportError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleExport() {
        const data = exportData();
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `spendings-backup-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                importData(ev.target?.result as string);
                setImportSuccess(true);
                setImportError("");
                setTimeout(() => { setImportSuccess(false); window.location.reload(); }, 1500);
            } catch {
                setImportError("Invalid file. Please use a valid Spendings backup.");
            }
        };
        reader.readAsText(file);
        e.target.value = "";
    }

    function handleClearAll() {
        clearAllData();
        setShowClearConfirm(false);
        window.location.reload();
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary">Settings</h1>
                <p className="text-sm text-secondary mt-0.5">Customize your experience</p>
            </div>

            <div className="space-y-4">
                {/* Appearance */}
                <section className="bg-card rounded-2xl border card-shadow" style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}>
                    <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                        <h2 className="text-sm font-semibold text-primary">Appearance</h2>
                    </div>
                    <div className="p-5">
                        <p className="text-xs text-secondary mb-3">Theme</p>
                        <div className="flex gap-2">
                            {THEMES.map(({ value, label, icon: Icon }) => (
                                <button
                                    key={value}
                                    onClick={() => updateSettings({ theme: value })}
                                    className={`flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${settings.theme === value
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                                            : "text-secondary hover:text-primary hover:border-current"
                                        }`}
                                    style={{ borderColor: settings.theme === value ? undefined : "rgb(var(--border))" }}
                                >
                                    <Icon size={18} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Currency */}
                <section className="bg-card rounded-2xl border card-shadow" style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}>
                    <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                        <h2 className="text-sm font-semibold text-primary">Currency</h2>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-2">
                            {CURRENCIES.map(({ code, symbol, label }) => (
                                <button
                                    key={code}
                                    onClick={() => updateSettings({ currency: code, currencySymbol: symbol })}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${settings.currency === code
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                                            : "text-secondary hover:text-primary"
                                        }`}
                                    style={{ borderColor: settings.currency === code ? undefined : "rgb(var(--border))" }}
                                >
                                    <span className="text-base w-6 text-center">{symbol}</span>
                                    <div className="text-left">
                                        <div className="text-xs font-semibold">{code}</div>
                                        <div className="text-xs opacity-70 truncate">{label}</div>
                                    </div>
                                    {settings.currency === code && <Check size={14} className="ml-auto" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Data management */}
                <section className="bg-card rounded-2xl border card-shadow" style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}>
                    <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                        <h2 className="text-sm font-semibold text-primary">Data</h2>
                    </div>
                    <div className="p-5 space-y-3">
                        <p className="text-xs text-secondary">All data is stored securely in your browser. You can export it to create a backup or import it on another device.</p>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={handleExport}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium text-secondary hover:text-primary hover:border-current transition-all"
                                style={{ borderColor: "rgb(var(--border))" }}
                            >
                                <Download size={15} />
                                Export Backup
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${importSuccess
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600"
                                        : "text-secondary hover:text-primary hover:border-current"
                                    }`}
                                style={{ borderColor: importSuccess ? undefined : "rgb(var(--border))" }}
                            >
                                {importSuccess ? <Check size={15} /> : <Upload size={15} />}
                                {importSuccess ? "Imported!" : "Import Backup"}
                            </button>
                            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </div>
                        {importError && <p className="text-xs text-red-500">{importError}</p>}
                    </div>
                </section>

                {/* Danger zone */}
                <section
                    className="bg-card rounded-2xl border card-shadow"
                    style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg-card))" }}
                >
                    <div className="px-5 py-4 border-b" style={{ borderColor: "rgb(var(--border))" }}>
                        <h2 className="text-sm font-semibold text-red-500">Danger Zone</h2>
                    </div>
                    <div className="p-5">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-primary">Clear all data</p>
                                <p className="text-xs text-secondary mt-0.5">Permanently delete all transactions, categories, and settings.</p>
                            </div>
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50 text-sm font-medium transition-colors flex-shrink-0"
                            >
                                <Trash2 size={14} />
                                Clear
                            </button>
                        </div>
                    </div>
                </section>

                {/* About */}
                <div className="text-center py-2">
                    <p className="text-xs text-muted">Spendings · Data stored locally in your browser · Free forever</p>
                </div>
            </div>

            {/* Clear confirm modal */}
            {showClearConfirm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="bg-card rounded-2xl p-6 max-w-sm w-full animate-scale-in shadow-2xl"
                        style={{ backgroundColor: "rgb(var(--bg-card))" }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                                <AlertTriangle size={18} className="text-red-500" />
                            </div>
                            <h3 className="text-base font-semibold text-primary">Clear everything?</h3>
                        </div>
                        <p className="text-sm text-secondary mb-5">This will permanently delete all your transactions, custom categories, and settings. This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl border text-sm font-medium text-secondary hover:text-primary transition-colors"
                                style={{ borderColor: "rgb(var(--border))" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                            >
                                Yes, clear all
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
