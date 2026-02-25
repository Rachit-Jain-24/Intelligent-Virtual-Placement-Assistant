"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import {
    Trophy, Star, Flame, Target, TrendingUp, Zap,
    CheckCircle2, Circle, Award, GraduationCap, Heart
} from "lucide-react";

const motivationQuote = {
    text: "The secret of getting ahead is getting started. Your future is created by what you do TODAY.",
    author: "Mark Twain",
};

const milestones = [
    { id: 1, title: "Profile Completed", desc: "Set up your complete student profile", done: true, points: 50 },
    { id: 2, title: "First 50 LeetCode Problems", desc: "Solved 50 coding challenges", done: true, points: 100 },
    { id: 3, title: "First Internship", desc: "Secured your first internship", done: true, points: 200 },
    { id: 4, title: "100 LeetCode Problems", desc: "Halfway to 200 — keep going!", done: true, points: 150 },
    { id: 5, title: "First Certification", desc: "Earned a professional certification", done: true, points: 75 },
    { id: 6, title: "200 LeetCode Problems", desc: "Solve 200 coding challenges", done: false, points: 200, progress: 94 },
    { id: 7, title: "Mock Interview Completed", desc: "Complete 5 mock interviews", done: false, points: 100, progress: 40 },
    { id: 8, title: "Hackathon Participant", desc: "Participate in a hackathon", done: false, points: 150, progress: 0 },
    { id: 9, title: "Dream Company Offer", desc: "Receive placement offer from target company", done: false, points: 500, progress: 0 },
];

const streaks = [
    { label: "LeetCode Streak", current: 7, best: 21, icon: "🔥" },
    { label: "Daily Study Streak", current: 12, best: 34, icon: "📚" },
    { label: "Profile Update Streak", current: 3, best: 7, icon: "✏️" },
];

const companiesProgress = [
    { company: "TCS", readiness: 88, status: "Ready" },
    { company: "Infosys", readiness: 82, status: "Ready" },
    { company: "Capgemini", readiness: 71, status: "Almost" },
    { company: "Amazon", readiness: 45, status: "Developing" },
    { company: "Google", readiness: 20, status: "Early Stage" },
];

const weeklyActivity = [
    { day: "Mon", problems: 3, study: 2 },
    { day: "Tue", problems: 2, study: 3 },
    { day: "Wed", problems: 4, study: 2.5 },
    { day: "Thu", problems: 1, study: 1 },
    { day: "Fri", problems: 3, study: 4 },
    { day: "Sat", problems: 5, study: 3 },
    { day: "Sun", problems: 2, study: 1.5 },
];

const totalPoints = milestones.filter(m => m.done).reduce((sum, m) => sum + m.points, 0);
const level = Math.floor(totalPoints / 200) + 1;
const nextLevelPoints = level * 200;
const levelProgress = ((totalPoints % 200) / 200) * 100;

export default function MotivationPage() {
    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Trophy className="h-8 w-8 text-yellow-500" /> Motivation Board
                    </h1>
                    <p className="text-muted-foreground">Your placement journey — progress, milestones & streaks</p>
                </div>

                {/* Quote Banner */}
                <div className="rounded-2xl gradient-primary p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                    <div className="absolute right-10 bottom-0 h-16 w-16 rounded-full bg-white/5" />
                    <div className="relative">
                        <Heart className="h-6 w-6 mb-3 text-white/80" />
                        <p className="text-xl font-semibold italic">"{motivationQuote.text}"</p>
                        <p className="mt-2 text-white/70 text-sm">— {motivationQuote.author}</p>
                    </div>
                </div>

                {/* Level & Points */}
                <Card>
                    <CardContent className="pt-5">
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary text-white text-center shrink-0 shadow-lg">
                                <div>
                                    <p className="text-xs font-medium opacity-80">LEVEL</p>
                                    <p className="text-3xl font-black">{level}</p>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-xl">{totalPoints} XP</p>
                                        <p className="text-sm text-muted-foreground">{nextLevelPoints - totalPoints} XP to Level {level + 1}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant="warning">Level {level} Achiever</Badge>
                                    </div>
                                </div>
                                <Progress value={levelProgress} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats Row */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Milestones Done", value: milestones.filter(m => m.done).length, icon: "✅", sub: `of ${milestones.length}` },
                        { label: "Total XP", value: totalPoints, icon: "⭐", sub: "Experience Points" },
                        { label: "Readiness", value: "78%", icon: "🎯", sub: "Overall score" },
                        { label: "Days to Placement", value: "186", icon: "📅", sub: "Aug 2025 season" },
                    ].map(s => (
                        <Card key={s.label} className="card-hover text-center">
                            <CardContent className="pt-5">
                                <div className="text-3xl mb-1">{s.icon}</div>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                                <p className="text-xs text-muted-foreground">{s.sub}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Company Readiness Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" /> Closeness to Your Dream Companies
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {companiesProgress.map(c => (
                            <div key={c.company}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="font-medium">{c.company}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold">{c.readiness}%</span>
                                        <Badge variant={c.status === "Ready" ? "success" : c.status === "Almost" ? "warning" : "default"}>
                                            {c.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                                    <div
                                        className={`h-full rounded-full progress-animated ${c.readiness >= 80 ? "bg-green-500" :
                                                c.readiness >= 60 ? "bg-yellow-500" :
                                                    c.readiness >= 40 ? "bg-orange-500" : "bg-red-400"
                                            }`}
                                        style={{ width: `${c.readiness}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Streaks */}
                <div className="grid gap-4 md:grid-cols-3">
                    {streaks.map(s => (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5 text-center">
                                <div className="text-4xl mb-2">{s.icon}</div>
                                <p className="text-3xl font-black text-primary">{s.current}</p>
                                <p className="text-sm font-medium">{s.label}</p>
                                <p className="text-xs text-muted-foreground">Best: {s.best} days</p>
                                <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full gradient-primary rounded-full" style={{ width: `${(s.current / s.best) * 100}%` }} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Milestones Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" /> Your Milestone Journey
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {milestones.map((m, i) => (
                                <div key={m.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${m.done ? "gradient-primary text-white" : "bg-secondary border-2 border-border"
                                            }`}>
                                            {m.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                        </div>
                                        {i < milestones.length - 1 && (
                                            <div className={`w-0.5 flex-1 mt-1 min-h-[24px] ${m.done ? "bg-primary/30" : "bg-border"}`} />
                                        )}
                                    </div>
                                    <div className={`flex-1 pb-4 ${m.done ? "" : "opacity-70"}`}>
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <h4 className={`font-semibold ${m.done ? "text-foreground" : "text-muted-foreground"}`}>
                                                {m.title}
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={m.done ? "success" : "default"}>+{m.points} XP</Badge>
                                                {m.done && <Badge variant="success">✓ Done</Badge>}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                                        {!m.done && m.progress !== undefined && m.progress > 0 && (
                                            <div className="mt-2">
                                                <Progress value={m.progress} />
                                                <p className="text-xs text-muted-foreground mt-1">{m.progress}% complete</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
