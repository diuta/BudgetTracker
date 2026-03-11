"use client";

import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "var(--cream)" }}>
            <Sidebar />
            <main className="app-main">
                <div className="app-content">
                    {children}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
