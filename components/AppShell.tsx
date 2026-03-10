"use client";

import { useSettings } from "@/hooks/useSettings";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
    // Initialize settings/theme on mount
    useSettings();

    return (
        <div className="min-h-screen flex bg-surface">
            {/* Desktop sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 md:ml-64">
                <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
                    {children}
                </div>
            </main>

            {/* Mobile bottom nav */}
            <BottomNav />
        </div>
    );
}
