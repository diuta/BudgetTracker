"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transactions" },
    { href: "/categories", label: "Categories" },
    { href: "/settings", label: "Settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="hidden md:flex fixed left-0 top-0 h-full flex-col z-30"
            style={{ width: "220px", backgroundColor: "var(--ink)", color: "var(--cream)", borderRight: "1px solid var(--ink-mid)" }}
        >
            <div style={{ padding: "36px 28px 28px", borderBottom: "1px solid var(--ink-mid)" }}>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", marginBottom: "6px" }}>Personal Finance</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--cream)", lineHeight: 1.2 }}>
                    SPENDINGS
                </div>
                <div style={{ marginTop: "10px", height: "2px", backgroundColor: "var(--crimson)", width: "100%" }} />
            </div>

            <nav style={{ flex: 1, padding: "28px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {NAV_ITEMS.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                display: "block",
                                padding: "10px 14px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.68rem",
                                fontWeight: active ? 700 : 400,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: active ? "var(--cream)" : "var(--ink-ghost)",
                                borderLeft: `2px solid ${active ? "var(--crimson)" : "transparent"}`,
                                paddingLeft: active ? "16px" : "14px",
                                backgroundColor: active ? "rgba(255,255,255,0.04)" : "transparent",
                                transition: "all 0.15s",
                                textDecoration: "none",
                            }}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ padding: "20px 28px 28px", borderTop: "1px solid var(--ink-mid)" }}>
                <div className="label-caps" style={{ color: "var(--ink-ghost)", fontSize: "0.58rem", lineHeight: 1.8 }}>
                    Est. MMXXV<br />Local Storage Only
                </div>
            </div>
        </aside>
    );
}
