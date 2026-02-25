"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Flame, Save, RefreshCw, Lightbulb, CheckCircle2 } from "lucide-react";

type SWOCKey = "strengths" | "weaknesses" | "opportunities" | "challenges";

const swocConfig: Record<SWOCKey, {
    label: string; emoji: string; color: string; headerColor: string; placeholder: string; tip: string;
}> = {
    strengths: {
        label: "Strengths", emoji: "💪", color: "swoc-strengths",
        headerColor: "text-green-700",
        placeholder: "e.g. Strong Python skills, Good problem solver, Team player...",
        tip: "Think about what sets you apart from peers.",
    },
    weaknesses: {
        label: "Weaknesses", emoji: "⚠️", color: "swoc-weaknesses",
        headerColor: "text-red-700",
        placeholder: "e.g. Need more practice in System Design, Low interview confidence...",
        tip: "Being honest here helps the AI give you better recommendations.",
    },
    opportunities: {
        label: "Opportunities", emoji: "🚀", color: "swoc-opportunities",
        headerColor: "text-blue-700",
        placeholder: "e.g. AI/ML industry is growing, NMIMS alumni at top companies...",
        tip: "Look at industry trends and your network.",
    },
    challenges: {
        label: "Challenges", emoji: "🔥", color: "swoc-challenges",
        headerColor: "text-yellow-700",
        placeholder: "e.g. Competitive market, Need to learn DevOps, Time management...",
        tip: "What external factors might slow you down?",
    },
};

const aiSuggestions: Record<SWOCKey, string[]> = {
    strengths: [
        "Strong React & TypeScript skills",
        "Good DSA fundamentals (150+ LeetCode)",
        "Experience with real-world projects",
        "Fast learner with self-driven attitude",
    ],
    weaknesses: [
        "System Design knowledge gaps",
        "Limited mock interview experience",
        "Need to improve verbal communication",
        "Low exposure to cloud platforms",
    ],
    opportunities: [
        "AI/ML boom — CSE-DS is in high demand",
        "NMIMS Hyderabad alumni at TCS, Infosys, Google",
        "GSoC & hackathon opportunities",
        "Research internship possibilities",
    ],
    challenges: [
        "Highly competitive placement season",
        "Need to build DevOps & Cloud skills",
        "Managing academics + placement prep",
        "Limited time before final placements",
    ],
};

export default function SWOCPage() {
    const [swoc, setSwoc] = useState<Record<SWOCKey, string[]>>({
        strengths: ["Strong React & TypeScript skills", "Good problem-solving ability"],
        weaknesses: ["System Design gaps", "Need more mock interviews"],
        opportunities: ["AI/ML industry is booming", "NMIMS alumni network"],
        challenges: ["Competitive placement season", "Need DevOps skills"],
    });

    const [saved, setSaved] = useState(false);

    const addItem = (key: SWOCKey, value: string) => {
        if (value.trim() && !swoc[key].includes(value.trim())) {
            setSwoc({ ...swoc, [key]: [...swoc[key], value.trim()] });
        }
    };

    const removeItem = (key: SWOCKey, index: number) => {
        setSwoc({ ...swoc, [key]: swoc[key].filter((_, i) => i !== index) });
    };

    const addSuggestion = (key: SWOCKey, s: string) => {
        if (!swoc[key].includes(s)) addItem(key, s);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Flame className="h-8 w-8 text-orange-500" /> SWOC Analysis
                        </h1>
                        <p className="text-muted-foreground">Know yourself to navigate your placement journey better</p>
                    </div>
                    <div className="flex gap-3">
                        {saved && (
                            <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-green-700 text-sm font-medium">
                                <CheckCircle2 className="h-4 w-4" /> Saved!
                            </div>
                        )}
                        <Button onClick={handleSave} className="flex items-center gap-2">
                            <Save className="h-4 w-4" /> Save SWOC
                        </Button>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-transparent p-4 flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-sm">How does this help you?</p>
                        <p className="text-sm text-muted-foreground">Your SWOC analysis is used by the AI Mentor and Career Roadmap to generate personalized recommendations. The more accurate you are, the better your guidance will be!</p>
                    </div>
                </div>

                {/* SWOC Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {(Object.keys(swocConfig) as SWOCKey[]).map((key) => {
                        const cfg = swocConfig[key];
                        const [inputVal, setInputVal] = useState("");
                        return (
                            <Card key={key} className={`${cfg.color} border-2`}>
                                <CardHeader className="pb-3">
                                    <CardTitle className={`flex items-center gap-2 ${cfg.headerColor}`}>
                                        <span className="text-xl">{cfg.emoji}</span> {cfg.label}
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground">{cfg.tip}</p>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {/* Items */}
                                    <div className="space-y-2 min-h-[80px]">
                                        {swoc[key].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 group">
                                                <div className="h-1.5 w-1.5 rounded-full bg-current opacity-60 shrink-0" />
                                                <span className="flex-1 text-sm">{item}</span>
                                                <button
                                                    onClick={() => removeItem(key, i)}
                                                    className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-destructive transition-all"
                                                >✕</button>
                                            </div>
                                        ))}
                                        {swoc[key].length === 0 && (
                                            <p className="text-sm text-muted-foreground italic">Nothing added yet...</p>
                                        )}
                                    </div>

                                    {/* Add input */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputVal}
                                            onChange={e => setInputVal(e.target.value)}
                                            onKeyPress={e => { if (e.key === "Enter") { addItem(key, inputVal); setInputVal(""); } }}
                                            placeholder={cfg.placeholder}
                                            className="flex-1 h-8 rounded-lg border border-input bg-white/70 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                        <Button size="sm" onClick={() => { addItem(key, inputVal); setInputVal(""); }}>Add</Button>
                                    </div>

                                    {/* AI Suggestions */}
                                    <details className="group">
                                        <summary className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground list-none">
                                            <RefreshCw className="h-3 w-3" /> AI Suggestions (click to expand)
                                        </summary>
                                        <div className="mt-2 space-y-1.5">
                                            {aiSuggestions[key].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => addSuggestion(key, s)}
                                                    disabled={swoc[key].includes(s)}
                                                    className={`w-full text-left text-xs rounded-lg px-3 py-1.5 border transition-colors ${swoc[key].includes(s)
                                                            ? "bg-white/30 text-muted-foreground cursor-not-allowed line-through"
                                                            : "bg-white/60 hover:bg-white hover:border-primary/40"
                                                        }`}
                                                >
                                                    + {s}
                                                </button>
                                            ))}
                                        </div>
                                    </details>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your SWOC Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {(Object.keys(swocConfig) as SWOCKey[]).map(key => (
                                <div key={key} className={`rounded-xl p-4 ${swocConfig[key].color} border`}>
                                    <span className="text-2xl">{swocConfig[key].emoji}</span>
                                    <p className={`text-xl font-bold mt-1 ${swocConfig[key].headerColor}`}>{swoc[key].length}</p>
                                    <p className="text-xs text-muted-foreground">{swocConfig[key].label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 rounded-xl border p-4 bg-gradient-to-r from-primary/5 to-transparent">
                            <p className="text-sm font-medium text-primary flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" /> AI Insight based on your SWOC:
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Based on your SWOC, focus on bridging your System Design weakness through daily study sessions (30 mins/day).
                                Leverage your React strength by building a portfolio project. The AI/ML market opportunity aligns perfectly
                                with your CSE-DS program — consider applying to AI-focused startups.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
