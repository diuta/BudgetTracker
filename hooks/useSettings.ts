"use client";

import { useCallback, useEffect, useState } from "react";
import { getSettings, saveSettings } from "@/lib/storage";
import { DEFAULT_SETTINGS, Settings } from "@/lib/types";

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    useEffect(() => {
        const s = getSettings();
        setSettings(s);
    }, []);

    const updateSettings = useCallback((updates: Partial<Settings>) => {
        setSettings(prev => {
            const updated = { ...prev, ...updates };
            saveSettings(updated);
            return updated;
        });
    }, []);

    return { settings, updateSettings };
}
