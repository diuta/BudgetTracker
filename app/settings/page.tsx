"use client";

import { useRef, useState } from "react";
import { clearAllData, exportData, importData } from "@/lib/storage";
import { PageHeader } from "@/components/ui/PageHeader";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function SettingsPage() {
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
        reader.onload = ev => {
            try {
                importData(ev.target?.result as string);
                setImportSuccess(true);
                setImportError("");
                setTimeout(() => { setImportSuccess(false); window.location.reload(); }, 1500);
            } catch {
                setImportError("Invalid backup file. Please use a valid Spendings export.");
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
        <div className="animate-fade-in" style={{ maxWidth: "680px" }}>
            <PageHeader eyebrow="Configuration" title="Settings" />

            <div className="card" style={{ marginBottom: "24px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "16px" }}>Currency</div>
                <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--ink)", letterSpacing: "0.05em", marginBottom: "4px" }}>IDR — Indonesian Rupiah</div>
                        <div className="label-caps">Rp • Dot separator • Auto-thousands on input</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--crimson)", fontWeight: 700, lineHeight: 1 }}>Rp</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: "24px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "16px" }}>Categories</div>
                <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
                <div className="label-caps" style={{ lineHeight: 1.9 }}>
                    🛍️ Shopping &nbsp;•&nbsp; 🍜 Food & Hangout &nbsp;•&nbsp; ⚡ Bills & Subscriptions<br />
                    🛒 Groceries &nbsp;•&nbsp; 🚨 Unexpected Expenses &nbsp;•&nbsp; 🚗 Transport
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink-light)", marginTop: "12px" }}>
                    Categories are fixed and curated for personal use — no customization needed.
                </div>
            </div>

            <div className="card" style={{ marginBottom: "24px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "16px" }}>Data Management</div>
                <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
                <div className="label-caps" style={{ marginBottom: "20px", lineHeight: 1.9 }}>
                    All data is stored in your browser&apos;s localStorage.<br />
                    No account, no server, no cloud. Export regularly to prevent data loss.
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--cream-rule)" }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink)", marginBottom: "2px" }}>Export Backup</div>
                        <div className="label-caps">Download all data as JSON</div>
                    </div>
                    <button className="btn-outline" onClick={handleExport}>Export →</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink)", marginBottom: "2px" }}>Import Backup</div>
                        <div className="label-caps">Restore data from a JSON backup file</div>
                    </div>
                    <button className={importSuccess ? "btn-crimson" : "btn-outline"} onClick={() => fileInputRef.current?.click()}>
                        {importSuccess ? "✓ Done" : "Import ↑"}
                    </button>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                </div>
                {importError && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--crimson)", marginTop: "8px", letterSpacing: "0.06em" }}>
                        ⚠ {importError}
                    </div>
                )}
            </div>

            <div className="card" style={{ borderTop: "3px solid var(--crimson)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--crimson)", marginBottom: "16px" }}>Danger Zone</div>
                <hr className="rule-ghost" style={{ marginBottom: "20px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink)", marginBottom: "2px" }}>Clear All Data</div>
                        <div className="label-caps">Permanently erase all transactions</div>
                    </div>
                    <button className="btn-crimson" onClick={() => setShowClearConfirm(true)}>Clear</button>
                </div>
            </div>

            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--cream-rule)", textAlign: "center" }}>
                <div className="label-caps" style={{ lineHeight: 2 }}>Spendings • Est. MMXXV • Local Storage • Free Forever</div>
            </div>

            {showClearConfirm && (
                <ConfirmDialog
                    title="Erase everything?"
                    message="This will permanently delete all transactions. Consider exporting a backup first."
                    confirmLabel="Yes, Clear All"
                    onConfirm={handleClearAll}
                    onCancel={() => setShowClearConfirm(false)}
                />
            )}
        </div>
    );
}
