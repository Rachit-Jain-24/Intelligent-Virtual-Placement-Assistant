"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Code2, Trophy, TrendingUp, Users, Star, RefreshCw, Download, Search } from "lucide-react";
import { useState } from "react";

const leaderboard = [
    { rank: 1, name: "Aryan Mehta", program: "CSE-DS", year: "4th", solved: 342, easy: 156, medium: 143, hard: 43, streak: 45, score: 98 },
    { rank: 2, name: "Rachit Jain", program: "CSE-DS", year: "3rd", solved: 187, easy: 98, medium: 72, hard: 17, streak: 7, score: 82 },
    { rank: 3, name: "Priya Sharma", program: "CSE", year: "4th", solved: 274, easy: 142, medium: 108, hard: 24, streak: 21, score: 91 },
    { rank: 4, name: "Karan Patel", program: "CSE", year: "3rd", solved: 165, easy: 89, medium: 58, hard: 18, streak: 12, score: 75 },
    { rank: 5, name: "Sneha Reddy", program: "CSE-DS", year: "2nd", solved: 98, easy: 64, medium: 30, hard: 4, streak: 5, score: 58 },
    { rank: 6, name: "Aman Gupta", program: "CSE", year: "4th", solved: 310, easy: 148, medium: 130, hard: 32, streak: 30, score: 94 },
    { rank: 7, name: "Divya Nair", program: "CSE-DS", year: "3rd", solved: 143, easy: 78, medium: 55, hard: 10, streak: 9, score: 68 },
    { rank: 8, name: "Rohan Singh", program: "CSE", year: "2nd", solved: 87, easy: 56, medium: 28, hard: 3, streak: 3, score: 52 },
    { rank: 9, name: "Ananya Kumar", program: "CSE-DS", year: "4th", solved: 256, easy: 130, medium: 100, hard: 26, streak: 18, score: 87 },
    { rank: 10, name: "Varun Tiwari", program: "CSE", year: "3rd", solved: 134, easy: 72, medium: 50, hard: 12, streak: 6, score: 62 },
];

const programStats = [
    { program: "CSE-DS", avgSolved: 204, atLeast50: 82, atLeast150: 54, topScore: 98 },
    { program: "CSE", avgSolved: 188, atLeast50: 78, atLeast150: 48, topScore: 94 },
];

export default function AdminLeetCodePage() {
    const [search, setSearch] = useState("");
    const [yearFilter, setYearFilter] = useState("All");

    const filtered = leaderboard.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.program.toLowerCase().includes(search.toLowerCase());
        const matchYear = yearFilter === "All" || s.year === yearFilter;
        return matchSearch && matchYear;
    });

    const rankMedal = (r: number) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : `#${r}`;

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Code2 className="h-8 w-8 text-orange-500" /> LeetCode Overview
                        </h1>
                        <p className="text-muted-foreground">Batch-wide coding performance & leaderboard</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Sync</Button>
                        <Button className="flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Total Students", value: "248", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Avg Problems Solved", value: "142", icon: Code2, color: "text-orange-600", bg: "bg-orange-50" },
                        { label: "Solved 150+", value: "89", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
                        { label: "Avg Score", value: "71%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                    ].map(s => {
                        const Icon = s.icon;
                        return (
                            <Card key={s.label} className="card-hover">
                                <CardContent className="pt-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{s.label}</p>
                                            <p className="text-3xl font-bold mt-1">{s.value}</p>
                                        </div>
                                        <div className={`rounded-xl p-2.5 ${s.bg}`}>
                                            <Icon className={`h-6 w-6 ${s.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Program Stats */}
                <div className="grid gap-4 md:grid-cols-2">
                    {programStats.map(p => (
                        <Card key={p.program}>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> {p.program} Stats</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: "Avg Solved", value: p.avgSolved },
                                        { label: "Solved 50+", value: `${p.atLeast50}%` },
                                        { label: "Solved 150+", value: `${p.atLeast150}%` },
                                        { label: "Top Score", value: `${p.topScore}%` },
                                    ].map(item => (
                                        <div key={item.label} className="rounded-lg bg-secondary p-3 text-center">
                                            <p className="text-xl font-bold">{item.value}</p>
                                            <p className="text-xs text-muted-foreground">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Leaderboard */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500" /> Batch Leaderboard</CardTitle>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search student..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="pl-8 pr-3 h-8 rounded-lg border border-input bg-background text-sm w-44 focus:outline-none focus:ring-1 focus:ring-ring"
                                    />
                                </div>
                                {["All", "1st", "2nd", "3rd", "4th"].map(y => (
                                    <button
                                        key={y}
                                        onClick={() => setYearFilter(y)}
                                        className={`px-3 h-8 rounded-lg text-xs font-medium border transition-colors ${yearFilter === y ? "bg-primary text-white border-primary" : "border-input hover:bg-secondary"
                                            }`}
                                    >
                                        {y === "All" ? "All Years" : `${y} Year`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground text-xs uppercase">
                                        <th className="pb-3 text-left font-medium">Rank</th>
                                        <th className="pb-3 text-left font-medium">Student</th>
                                        <th className="pb-3 text-left font-medium">Program</th>
                                        <th className="pb-3 text-center font-medium">Easy</th>
                                        <th className="pb-3 text-center font-medium">Medium</th>
                                        <th className="pb-3 text-center font-medium">Hard</th>
                                        <th className="pb-3 text-center font-medium">Total</th>
                                        <th className="pb-3 text-center font-medium">Streak</th>
                                        <th className="pb-3 text-center font-medium">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filtered.map(s => (
                                        <tr key={s.rank} className={`hover:bg-secondary/40 transition-colors ${s.name === "Rachit Jain" ? "bg-primary/5" : ""}`}>
                                            <td className="py-3 pr-4 font-bold text-lg">{rankMedal(s.rank)}</td>
                                            <td className="py-3 pr-4">
                                                <p className="font-semibold">{s.name}</p>
                                                <p className="text-xs text-muted-foreground">{s.year} Year</p>
                                            </td>
                                            <td className="py-3 pr-4"><Badge variant="info">{s.program}</Badge></td>
                                            <td className="py-3 text-center text-green-600 font-medium">{s.easy}</td>
                                            <td className="py-3 text-center text-yellow-600 font-medium">{s.medium}</td>
                                            <td className="py-3 text-center text-red-500 font-medium">{s.hard}</td>
                                            <td className="py-3 text-center font-bold">{s.solved}</td>
                                            <td className="py-3 text-center">🔥 {s.streak}d</td>
                                            <td className="py-3 text-center">
                                                <span className={`font-bold ${s.score >= 90 ? "text-green-600" : s.score >= 70 ? "text-yellow-600" : "text-red-500"}`}>
                                                    {s.score}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
