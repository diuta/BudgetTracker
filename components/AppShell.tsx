"use client";

import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex" style={{ backgroundColor: "var(--cream)" }}>
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 md:ml-56">
                <div
                    className="flex-1"
                    style={{
                        padding: "48px 48px 96px",
                        maxWidth: "1180px",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    {children}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
