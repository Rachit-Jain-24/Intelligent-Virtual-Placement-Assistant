"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Tab {
    label: string;
    value: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultValue?: string;
    className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

    const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

    return (
        <div className={cn("w-full", className)}>
            <div className="border-b border-border">
                <div className="flex space-x-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                                activeTab === tab.value
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-4">{activeContent}</div>
        </div>
    );
}
