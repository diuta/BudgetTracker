"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/transactions", label: "Log" },
    { href: "/categories", label: "Tags" },
    { href: "/settings", label: "More" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="md:hidden"
            style={{
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 30,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "999px",
                backgroundColor: "rgba(30, 24, 20, 0.55)",
            }}
        >
            {NAV_ITEMS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "6px 14px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: active ? "var(--cream)" : "var(--ink-ghost)",
                            textDecoration: "none",
                            borderRadius: "999px",
                            backgroundColor: active ? "var(--crimson)" : "transparent",
                            transition: "all 0.15s",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}
