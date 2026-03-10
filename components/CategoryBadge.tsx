"use client";

import { Category } from "@/lib/types";

interface CategoryBadgeProps {
    category?: Category;
    className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
    if (!category) return (
        <span
            className={`label-caps ${className}`}
            style={{ color: "var(--ink-ghost)" }}
        >
            unknown
        </span>
    );

    return (
        <span
            className={`label-caps ${className}`}
            style={{
                color: category.color,
                borderLeft: `2px solid ${category.color}`,
                paddingLeft: "6px",
                display: "inline-block",
            }}
        >
            {category.name}
        </span>
    );
}
