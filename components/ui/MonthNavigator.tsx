"use client";

interface MonthNavigatorProps {
    label: string;
    onPrev: () => void;
    onNext: () => void;
}

export function MonthNavigator({ label, onPrev, onNext }: MonthNavigatorProps) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
            <button className="btn-ghost" onClick={onPrev}>◂ PREV</button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.16em", color: "var(--ink)", fontWeight: 700 }}>
                {label}
            </span>
            <button className="btn-ghost" onClick={onNext}>NEXT ▸</button>
        </div>
    );
}
