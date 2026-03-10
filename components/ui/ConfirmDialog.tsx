"use client";

interface ConfirmDialogProps {
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({ title, message, confirmLabel = "Confirm", onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(26,16,8,0.7)" }}>
            <div style={{ backgroundColor: "var(--cream)", borderTop: "3px solid var(--crimson)", padding: "32px", maxWidth: "380px", width: "100%", borderRadius: "4px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>
                    {title}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink-light)", marginBottom: "28px" }}>
                    {message}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button className="btn-outline" onClick={onCancel} style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                    <button className="btn-crimson" onClick={onConfirm} style={{ flex: 1, justifyContent: "center" }}>{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
}
