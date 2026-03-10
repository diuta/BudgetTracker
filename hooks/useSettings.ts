"use client";

import { useCallback, useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/lib/storage";
import { DEFAULT_SETTINGS, Settings } from "@/lib/types";

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    useEffect(() => {
        const s = getSettings();
        setSettings(s);
        applyTheme(s.theme);
    }, []);

    const updateSettings = useCallback((updates: Partial<Settings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...updates };
            saveSettings(updated);
            if (updates.theme) applyTheme(updates.theme);
            return updated;
        });
    }, []);

    return { settings, updateSettings };
}

function applyTheme(theme: Settings["theme"]) {
    const root = document.documentElement;
    if (theme === "dark") {
        root.classList.add("dark");
    } else if (theme === "light") {
        root.classList.remove("dark");
    } else {
        // system
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
    }
}
