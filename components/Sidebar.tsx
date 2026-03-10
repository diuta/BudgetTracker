"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, Tag, Settings, Wallet } from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: List },
    { href: "/categories", label: "Categories", icon: Tag },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-surface bg-surface z-30"
            style={{ borderColor: "rgb(var(--border))", backgroundColor: "rgb(var(--bg))" }}>
            {/* Logo */}
            <div className="px-6 py-7 border-b flex items-center gap-3" style={{ borderColor: "rgb(var(--border))" }}>
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Wallet className="text-white" size={16} />
                </div>
                <span className="text-base font-semibold text-primary">Spendings</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active
                                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                                    : "text-secondary hover:bg-surface-secondary hover:text-primary"
                                }`}
                        >
                            <Icon size={18} className={active ? "text-emerald-500" : ""} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-6 py-4 border-t" style={{ borderColor: "rgb(var(--border))" }}>
                <p className="text-xs text-muted">Data stored locally on your device.</p>
            </div>
        </aside>
    );
}
