"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Link from "next/link";
import {
    Bell, TrendingUp, Target, Code2, Flame, Trophy, Zap,
    Star, AlertCircle, ChevronRight, BookOpen, GraduationCap, Compass, X
} from "lucide-react";


const skillData = [
    { skill: "DSA / Coding", value: 72 },
    { skill: "Web Dev", value: 85 },
    { skill: "Communication", value: 65 },
    { skill: "ML / AI", value: 70 },
    { skill: "Teamwork", value: 78 },
];

const notifications = [
    { id: 1, title: "AI Roadmap Updated", message: "Your 3rd-year roadmap has new recommendations based on your profile.", type: "info" as const },
    { id: 2, title: "LeetCode Streak 🔥", message: "You've solved 7 problems this week — keep it up!", type: "success" as const },
    { id: 3, title: "Skill Gap Detected", message: "Docker is trending in your target companies — consider learning it.", type: "warning" as const },
];

const roadmapProgress = [
    { label: "Resume Optimization", value: 100, done: true },
    { label: "DSA Practice (LeetCode)", value: 60, done: false },
    { label: "Core Skills Development", value: 75, done: false },
    { label: "Mock Interviews", value: 30, done: false },
    { label: "Live Projects", value: 50, done: false },
];

// Simulated LeetCode API data
const leetcodeData = {
    username: "rachitjain",
    totalSolved: 187,
    easy: 98,
    medium: 72,
    hard: 17,
    streak: 7,
    ranking: 124532,
    acceptanceRate: "68.3%",
};

// Year-wise focus areas
const yearFocus = {
    year: "3rd Year",
    program: "B.Tech CSE (Data Science)",
    focus: "Internship Prep & Domain Deepening",
    keyGoals: [
        "Solve 300+ LeetCode problems",
        "Complete one domain specialization",
        "Build 2 production-ready projects",
        "Secure a summer internship",
        "Attend at least 2 mock interviews",
    ],
    upcomingMilestone: "Pre-Placement Season — August 2025",
};

// SWOC preview
const swocPreview = {
    strengths: ["Strong React skills", "Good problem-solving"],
    weaknesses: ["System Design gaps", "Low mock interview practice"],
    opportunities: ["AI/ML boom in industry", "Strong NMIMS alumni network"],
    challenges: ["Competitive placement season", "Need DevOps skills"],
};

export default function StudentDashboard() {
    const [careerGoalSet, setCareerGoalSet] = useState(false);
    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6">
                {/* Career Discovery Banner */}
                {!careerGoalSet ? (
                    <div className="relative rounded-2xl bg-gradient-to-r from-violet-600/20 via-primary/15 to-transparent border border-primary/30 p-5 overflow-hidden">
                        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/10" />
                        <div className="absolute right-4 bottom-0 h-16 w-16 rounded-full bg-violet-500/10" />
                        <div className="relative flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-primary/20 p-2.5 shrink-0">
                                    <Compass className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-base">🎯 Discover Your Career Path</p>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        You haven&apos;t set a career goal yet. Take a 2-minute quiz to get a personalized roadmap tailored to your subjects and interests.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Link href="/student/role-discovery">
                                    <Button size="sm" className="whitespace-nowrap">
                                        Start Career Discovery →
                                    </Button>
                                </Link>
                                <button
                                    onClick={() => setCareerGoalSet(true)}
                                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
                                    title="Dismiss"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 w-fit">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Your Goal: <span className="text-primary font-bold">Data Scientist</span></span>
                        <span className="text-muted-foreground">|</span>
                        <Link href="/student/role-discovery" className="text-xs text-primary hover:underline underline-offset-2">Change →</Link>
                    </div>
                )}

                {/* Greeting Header */}

                <div className="rounded-2xl gradient-primary p-6 text-white overflow-hidden relative">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                    <div className="absolute -right-2 bottom-0 h-20 w-20 rounded-full bg-white/5" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="h-5 w-5 text-white/80" />
                            <span className="text-sm text-white/80">{yearFocus.program} • {yearFocus.year}</span>
                        </div>
                        <h1 className="text-3xl font-bold">Good morning, Rachit! 👋</h1>
                        <p className="mt-1 text-white/80">Focus: <span className="font-semibold text-white">{yearFocus.focus}</span></p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {yearFocus.keyGoals.slice(0, 3).map((g, i) => (
                                <span key={i} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium border border-white/30">
                                    ✦ {g}
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-white/60">📅 Next milestone: {yearFocus.upcomingMilestone}</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "Readiness Score", value: "78/100", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", trend: "+4 this week" },
                        { label: "Skills Mastered", value: "12/20", icon: Target, color: "text-blue-600", bg: "bg-blue-50", trend: "2 in progress" },
                        { label: "LeetCode Solved", value: `${leetcodeData.totalSolved}`, icon: Code2, color: "text-orange-600", bg: "bg-orange-50", trend: `Streak: ${leetcodeData.streak} days 🔥` },
                        { label: "Placement Score", value: "82%", icon: Trophy, color: "text-purple-600", bg: "bg-purple-50", trend: "AI predicted" },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={i} className="card-hover">
                                <CardContent className="pt-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                                        </div>
                                        <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                                            <Icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Content Row 1 */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Readiness Gauge */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" /> Career Readiness Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart value={78} label="Overall Readiness" />
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div className="rounded-lg bg-green-50 p-2">
                                    <p className="text-sm font-bold text-green-700">Strong</p>
                                    <p className="text-xs text-muted-foreground">Technical Skills</p>
                                </div>
                                <div className="rounded-lg bg-yellow-50 p-2">
                                    <p className="text-sm font-bold text-yellow-700">Growing</p>
                                    <p className="text-xs text-muted-foreground">Soft Skills</p>
                                </div>
                                <div className="rounded-lg bg-red-50 p-2">
                                    <p className="text-sm font-bold text-red-700">Needs Work</p>
                                    <p className="text-xs text-muted-foreground">Interview Prep</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skills Radar */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadarChart data={skillData} />
                        </CardContent>
                    </Card>
                </div>

                {/* LeetCode Dashboard */}
                <Card className="border-orange-200 bg-gradient-to-br from-orange-50/50 to-transparent">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-orange-500" /> LeetCode Dashboard
                                <Badge variant="warning">@{leetcodeData.username}</Badge>
                            </CardTitle>
                            <a href={`https://leetcode.com/${leetcodeData.username}`} target="_blank" rel="noreferrer">
                                <Button variant="outline" size="sm">View Profile</Button>
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                                { label: "Total Solved", value: leetcodeData.totalSolved, color: "text-foreground" },
                                { label: "Easy", value: leetcodeData.easy, color: "text-green-600" },
                                { label: "Medium", value: leetcodeData.medium, color: "text-yellow-600" },
                                { label: "Hard", value: leetcodeData.hard, color: "text-red-600" },
                            ].map(s => (
                                <div key={s.label} className="rounded-xl border bg-white p-3 text-center card-hover">
                                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                    <p className="text-xs text-muted-foreground">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="rounded-xl bg-orange-50 border border-orange-200 p-3">
                                <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                                <p className="text-lg font-bold text-orange-600">{leetcodeData.streak} days</p>
                                <p className="text-xs text-muted-foreground">Current Streak</p>
                            </div>
                            <div className="rounded-xl bg-secondary border p-3">
                                <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                                <p className="text-lg font-bold">#{leetcodeData.ranking.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Global Ranking</p>
                            </div>
                            <div className="rounded-xl bg-secondary border p-3">
                                <Target className="h-5 w-5 text-green-500 mx-auto mb-1" />
                                <p className="text-lg font-bold text-green-600">{leetcodeData.acceptanceRate}</p>
                                <p className="text-xs text-muted-foreground">Acceptance Rate</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Row 2: Roadmap + SWOC Preview */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Roadmap Progress */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Roadmap Progress</CardTitle>
                                <Button variant="outline" size="sm">Full Roadmap <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {roadmapProgress.map(item => (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className={`text-sm font-medium flex items-center gap-2 ${item.done ? "text-green-600 line-through opacity-60" : ""}`}>
                                            {item.done && "✓"} {item.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{item.value}%</span>
                                    </div>
                                    <Progress value={item.value} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* SWOC Preview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Flame className="h-5 w-5 text-orange-500" /> SWOC Analysis
                                </CardTitle>
                                <Button variant="outline" size="sm">Full SWOC <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="swoc-strengths rounded-xl border p-3">
                                    <p className="text-xs font-bold text-green-700 mb-2">💪 STRENGTHS</p>
                                    {swocPreview.strengths.map(s => (
                                        <p key={s} className="text-xs text-green-800 mb-1">• {s}</p>
                                    ))}
                                </div>
                                <div className="swoc-weaknesses rounded-xl border p-3">
                                    <p className="text-xs font-bold text-red-700 mb-2">⚠️ WEAKNESSES</p>
                                    {swocPreview.weaknesses.map(s => (
                                        <p key={s} className="text-xs text-red-800 mb-1">• {s}</p>
                                    ))}
                                </div>
                                <div className="swoc-opportunities rounded-xl border p-3">
                                    <p className="text-xs font-bold text-blue-700 mb-2">🚀 OPPORTUNITIES</p>
                                    {swocPreview.opportunities.map(s => (
                                        <p key={s} className="text-xs text-blue-800 mb-1">• {s}</p>
                                    ))}
                                </div>
                                <div className="swoc-challenges rounded-xl border p-3">
                                    <p className="text-xs font-bold text-yellow-700 mb-2">🔥 CHALLENGES</p>
                                    {swocPreview.challenges.map(s => (
                                        <p key={s} className="text-xs text-yellow-800 mb-1">• {s}</p>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" /> Recent Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex items-start gap-3 rounded-xl border p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                                <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0 ${notif.type === "success" ? "text-green-500" :
                                    notif.type === "warning" ? "text-yellow-500" : "text-blue-500"
                                    }`} />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{notif.title}</p>
                                    <p className="text-xs text-muted-foreground">{notif.message}</p>
                                </div>
                                <Badge variant={notif.type}>{notif.type}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
