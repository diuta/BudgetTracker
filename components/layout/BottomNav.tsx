"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transactions" },
    { href: "/categories", label: "Categories" },
    { href: "/settings", label: "Settings" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 md:hidden z-30 flex"
            style={{ backgroundColor: "var(--ink)", borderTop: "2px solid var(--ink-mid)" }}
        >
            {NAV_ITEMS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "12px 4px 10px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: active ? "var(--cream)" : "var(--ink-ghost)",
                            textDecoration: "none",
                            borderTop: `2px solid ${active ? "var(--crimson)" : "transparent"}`,
                            transition: "all 0.15s",
                        }}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
