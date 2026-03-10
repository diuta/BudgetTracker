"use client";

interface PageHeaderProps {
    eyebrow: string;
    title: string;
    action?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, action }: PageHeaderProps) {
    return (
        <>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "12px" }}>
                <div>
                    <div className="label-caps" style={{ marginBottom: "6px" }}>{eyebrow}</div>
                    <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: 900, lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                        {title}
                    </h1>
                </div>
                {action}
            </div>
            <hr className="rule-crimson" style={{ marginBottom: "40px" }} />
        </>
    );
}
