"use client";

interface EmptyStateProps {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    height?: string;
}

export function EmptyState({ message, actionLabel, onAction, height = "auto" }: EmptyStateProps) {
    return (
        <div style={{ padding: "48px 28px", textAlign: "center", minHeight: height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink-ghost)" }}>
                {message}
            </div>
            {actionLabel && onAction && (
                <button className="btn-crimson" onClick={onAction} style={{ marginTop: "16px" }}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

export function ChartEmptyState({ height = 180 }: { height?: number }) {
    return (
        <div style={{ height: `${height}px`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--cream-rule)" }} />
            <span className="label-caps" style={{ letterSpacing: "0.18em" }}>No Data This Month</span>
            <div style={{ width: "100%", height: "1px", backgroundColor: "var(--cream-rule)" }} />
        </div>
    );
}
