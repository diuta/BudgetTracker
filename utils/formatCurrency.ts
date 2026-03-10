export function formatIDR(amount: number): string {
    const abs = Math.abs(Math.round(amount));
    return `Rp ${abs.toLocaleString("id-ID")}`;
}

export function inputToIDR(raw: string): number {
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return 0;
    return Math.round(num * 1000);
}

export function idrPreview(raw: string): string {
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!raw || isNaN(num)) return "";
    return `= ${formatIDR(num * 1000)}`;
}

export function idrToInput(amount: number): string {
    if (!amount) return "";
    return String(Math.round(amount / 1000));
}
