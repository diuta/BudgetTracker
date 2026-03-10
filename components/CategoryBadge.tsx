"use client";

import { Category } from "@/lib/types";
import * as Icons from "lucide-react";

interface CategoryBadgeProps {
    category?: Category;
    className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
    if (!category) return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-secondary text-secondary ${className}`}>
            Unknown
        </span>
    );

    const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[category.icon];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
            style={{ backgroundColor: `${category.color}18`, color: category.color }}
        >
            {IconComp && <IconComp size={11} />}
            {category.name}
        </span>
    );
}
