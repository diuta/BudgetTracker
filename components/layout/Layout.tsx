"use client";

import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

const SIDEBAR_WIDTH = 220;

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "var(--cream)" }}>
            <Sidebar />
            <main
                style={{
                    flex: 1,
                    marginLeft: `${SIDEBAR_WIDTH}px`,
                    paddingBottom: "80px",
                }}
                className="md:ml-[220px]"
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        padding: "48px 48px 0",
                    }}
                >
                    {children}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
