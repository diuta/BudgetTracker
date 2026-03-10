"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Tag, Settings } from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: List },
    { href: "/categories", label: "Categories", icon: Tag },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex bg-surface"
            style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg))", paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors text-xs font-medium ${active ? "text-emerald-500" : "text-muted"
                            }`}
                    >
                        <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
