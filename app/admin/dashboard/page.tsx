"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useState } from "react";
import {
    Users, TrendingUp, AlertTriangle, Target, Code2, Trophy,
    GraduationCap, Building2, ChevronRight, Download, Flame,
    BarChart3, Star, UserCheck, CheckCircle2, Clock, FileText,
    Briefcase, Upload, Bell,
} from "lucide-react";

type AdminRole = "overview" | "director" | "dean" | "program_chair" | "faculty_mentor" | "placement_dept";

const roleConfig: Record<AdminRole, { label: string; scope: string; emoji: string }> = {
    overview: { label: "Overview", scope: "Combined Dashboard — All Sections", emoji: "🏠" },
    director: { label: "Director", scope: "All Programs — Institution-wide View", emoji: "🎓" },
    dean: { label: "Dean of Engineering", scope: "B.Tech Programs — Academic Overview", emoji: "🏛️" },
    program_chair: { label: "Program Chair", scope: "B.Tech CSE (Data Science) — Program View", emoji: "📋" },
    faculty_mentor: { label: "Faculty Mentor", scope: "Batch 2022-26 — Assigned Students", emoji: "🧑‍🏫" },
    placement_dept: { label: "Placement Dept.", scope: "Placement Operations — All Programs", emoji: "🏢" },
};

// ─── Overview (Default) View ─────────────────────────────────────────────────
function OverviewView() {
    return (
        <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Students", value: "215", sub: "Across all years", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Avg Readiness", value: "68%", sub: "+4% vs last month", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                    { label: "At-Risk Students", value: "27", sub: "Needs immediate action", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                    { label: "Placement Rate", value: "76%", sub: "Current batch (4th year)", icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <Card key={i} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{s.label}</p>
                                        <p className="text-2xl font-bold mt-1">{s.value}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
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

            {/* Program-wise Stats */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" /> Program-wise Overview
                        </CardTitle>
                        <Button variant="outline" size="sm">Details <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            { program: "B.Tech CSE", students: 120, placed: 78, ready: 82, avgLeetcode: 214, color: "bg-blue-500" },
                            { program: "B.Tech CSE (DS)", students: 95, placed: 72, ready: 88, avgLeetcode: 268, color: "bg-purple-500" },
                        ].map(p => (
                            <div key={p.program} className="rounded-xl border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-3 w-3 rounded-full ${p.color}`} />
                                        <h4 className="font-semibold">{p.program}</h4>
                                    </div>
                                    <Badge variant="success">{p.ready}% Ready</Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div className="rounded-lg bg-secondary p-2">
                                        <p className="text-lg font-bold">{p.students}</p>
                                        <p className="text-xs text-muted-foreground">Students</p>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-2">
                                        <p className="text-lg font-bold text-green-700">{p.placed}</p>
                                        <p className="text-xs text-muted-foreground">Placed</p>
                                    </div>
                                    <div className="rounded-lg bg-orange-50 p-2">
                                        <p className="text-lg font-bold text-orange-700">{p.avgLeetcode}</p>
                                        <p className="text-xs text-muted-foreground">Avg LC</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Readiness</span>
                                        <span className="font-medium">{p.ready}%</span>
                                    </div>
                                    <Progress value={p.ready} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Year-wise Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" /> Year-wise Progress
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { year: "1st Year", count: 85, readiness: 42, focus: "Foundations", tagColor: "bg-green-500" },
                            { year: "2nd Year", count: 90, readiness: 58, focus: "Skill Discovery", tagColor: "bg-blue-500" },
                            { year: "3rd Year", count: 78, readiness: 72, focus: "Internship Prep", tagColor: "bg-yellow-500" },
                            { year: "4th Year", count: 62, readiness: 85, focus: "Placement Ready", tagColor: "bg-red-500" },
                        ].map(y => (
                            <div key={y.year} className="rounded-xl border p-4 space-y-3">
                                <div className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${y.tagColor}`}>
                                    {y.year}
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{y.count}</p>
                                    <p className="text-xs text-muted-foreground">students</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Avg Readiness</span>
                                        <span className="font-medium">{y.readiness}%</span>
                                    </div>
                                    <Progress value={y.readiness} />
                                </div>
                                <p className="text-xs text-muted-foreground">Focus: {y.focus}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* At-Risk + Company Readiness */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" /> At-Risk Students
                            </CardTitle>
                            <Button variant="outline" size="sm">View All <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { id: 1, name: "Anjali Mehta", program: "CSE-DS", year: "3rd", score: 38, leetcode: 42, risk: "High", issue: "Low LeetCode activity, no internship" },
                            { id: 2, name: "Vikas Patel", program: "CE", year: "4th", score: 52, leetcode: 89, risk: "Medium", issue: "Skill gaps in System Design" },
                            { id: 3, name: "Sneha Rao", program: "CSE-DS", year: "3rd", score: 44, leetcode: 35, risk: "High", issue: "Incomplete profile & no projects" },
                        ].map(s => (
                            <div key={s.id} className="rounded-xl border p-3 hover:bg-secondary/40 transition-colors">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="h-7 w-7 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
                                                {s.name.split(" ").map(x => x[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{s.name}</p>
                                                <p className="text-xs text-muted-foreground">{s.program} • {s.year} Year</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{s.issue}</p>
                                        <div className="mt-2 flex gap-2 text-xs">
                                            <span className="px-2 py-0.5 rounded-full bg-secondary">Score: {s.score}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700">LC: {s.leetcode}</span>
                                        </div>
                                    </div>
                                    <Badge variant={s.risk === "High" ? "danger" : "warning"}>{s.risk}</Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" /> Company Readiness
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { company: "TCS / Infosys / Wipro", minScore: 60, ready: 89, color: "bg-green-500" },
                            { company: "Capgemini / Accenture", minScore: 65, ready: 74, color: "bg-blue-500" },
                            { company: "Amazon / Flipkart", minScore: 78, ready: 38, color: "bg-yellow-500" },
                            { company: "Google / Microsoft", minScore: 90, ready: 12, color: "bg-red-500" },
                        ].map(c => (
                            <div key={c.company}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-medium">{c.company}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">Min: {c.minScore}%</span>
                                        <span className="text-sm font-bold">{c.ready} students</span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${c.color} transition-all`}
                                        style={{ width: `${(c.ready / 95) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button className="w-full mt-2" variant="outline">
                            <Building2 className="h-4 w-4 mr-2" /> Upload New JD for Matching
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* LeetCode Leaderboard + Activity Feed */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code2 className="h-5 w-5 text-orange-500" /> LeetCode Leaderboard
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { name: "Arjun Singh", solved: 412, rank: 45231, program: "CSE" },
                                { name: "Ananya Gupta", solved: 387, rank: 56782, program: "CSE-DS" },
                                { name: "Rachit Jain", solved: 187, rank: 124532, program: "CSE-DS" },
                                { name: "Rohan Sharma", solved: 163, rank: 148901, program: "CSE" },
                            ].map((s, i) => (
                                <div key={s.name} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-secondary/40 transition-colors">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-orange-500 text-white" : "bg-secondary text-muted-foreground"
                                        }`}>
                                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{s.name}</p>
                                        <p className="text-xs text-muted-foreground">{s.program} • #{s.rank.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-orange-600">{s.solved}</p>
                                        <p className="text-xs text-muted-foreground">solved</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Flame className="h-5 w-5 text-primary" /> Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { action: "Rachit Jain uploaded resume", time: "10m ago", type: "info" },
                                { action: "Priya Sharma solved 5 LeetCode problems", time: "25m ago", type: "success" },
                                { action: "Batch 2022 mock interview scheduled", time: "1h ago", type: "info" },
                                { action: "Skill gap alert: Docker for 23 students", time: "2h ago", type: "warning" },
                                { action: "New JD uploaded: Amazon SDE-1", time: "3h ago", type: "success" },
                            ].map((a, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${a.type === "success" ? "bg-green-500" : a.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm">{a.action}</p>
                                        <p className="text-xs text-muted-foreground">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-4">
                        {[
                            { label: "Download Batch Report", icon: Download, desc: "PDF/Excel shortlist" },
                            { label: "Upload Company JD", icon: Building2, desc: "AI matching" },
                            { label: "Send Notifications", icon: Star, desc: "Students & faculty" },
                            { label: "Schedule Mock Drive", icon: Trophy, desc: "Campus event" },
                        ].map(action => {
                            const Icon = action.icon;
                            return (
                                <button key={action.label} className="rounded-xl border p-4 text-left hover:bg-white transition-colors card-hover">
                                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="font-semibold text-sm">{action.label}</p>
                                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ─── Director View ────────────────────────────────────────────────────────────
function DirectorView() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: "Total Students", value: "248", sub: "CSE + CSE-DS", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Avg Readiness", value: "71%", sub: "+4% this month", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Placed (2025)", value: "82%", sub: "204/248 students", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "At-Risk", value: "18", sub: "Need intervention", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                ].map(s => {
                    const Icon = s.icon; return (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{s.label}</p>
                                        <p className="text-3xl font-bold mt-1">{s.value}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                                    </div>
                                    <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Program-wise Performance</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { program: "B.Tech CSE (DS)", students: 124, placed: 106, readiness: 78 },
                            { program: "B.Tech CSE", students: 124, placed: 98, readiness: 69 },
                        ].map(p => (
                            <div key={p.program} className="rounded-xl border p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-sm">{p.program}</p>
                                    <Badge variant="info">{p.students} students</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="text-center rounded-lg bg-secondary p-2">
                                        <p className="text-xl font-bold text-green-600">{p.placed}</p>
                                        <p className="text-xs text-muted-foreground">Placed</p>
                                    </div>
                                    <div className="text-center rounded-lg bg-secondary p-2">
                                        <p className="text-xl font-bold">{p.readiness}%</p>
                                        <p className="text-xs text-muted-foreground">Avg Readiness</p>
                                    </div>
                                </div>
                                <Progress value={p.readiness} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /> At-Risk Students</CardTitle></CardHeader>
                    <CardContent>
                        {[
                            { name: "Rahul D.", issue: "CGPA < 6 + Low LeetCode", risk: "High", lc: 12, cgpa: 5.4 },
                            { name: "Priya L.", issue: "No internships, 0 certs", risk: "High", lc: 34, cgpa: 6.1 },
                            { name: "Arun K.", issue: "Weak DSA skills", risk: "Medium", lc: 28, cgpa: 6.8 },
                            { name: "Simran G.", issue: "Low profile completion", risk: "Medium", lc: 45, cgpa: 7.0 },
                        ].map(s => (
                            <div key={s.name} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className="h-9 w-9 rounded-full gradient-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                                    {s.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{s.name}</p>
                                    <p className="text-xs text-muted-foreground">{s.issue}</p>
                                </div>
                                <Badge variant={s.risk === "High" ? "danger" : "warning"}>{s.risk}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Year-wise Progression</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-4">
                        {[
                            { year: "1st Year", count: 62, readiness: 35, focus: "Foundations", color: "bg-green-500" },
                            { year: "2nd Year", count: 64, readiness: 52, focus: "DSA + Projects", color: "bg-blue-500" },
                            { year: "3rd Year", count: 60, readiness: 71, focus: "Internships + LC", color: "bg-yellow-500" },
                            { year: "4th Year", count: 62, readiness: 89, focus: "Placement Ready", color: "bg-red-500" },
                        ].map(y => (
                            <div key={y.year} className="rounded-xl border p-4 text-center">
                                <div className={`h-12 w-12 rounded-full ${y.color} text-white font-bold text-xl flex items-center justify-center mx-auto mb-3`}>
                                    {y.year[0]}
                                </div>
                                <p className="font-bold">{y.year}</p>
                                <p className="text-2xl font-black mt-1">{y.readiness}%</p>
                                <p className="text-xs text-muted-foreground">avg readiness</p>
                                <p className="text-xs mt-2 font-medium text-primary">{y.focus}</p>
                                <Progress value={y.readiness} className="mt-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ─── Dean View ────────────────────────────────────────────────────────────────
function DeanView() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-purple-50 border-purple-200 p-4">
                <p className="text-sm text-purple-800 font-medium">📌 Dean's academic overview — cross-program academic & placement health across B.Tech programs.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { label: "Overall Avg CGPA", value: "7.8", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
                    { label: "Faculty Mentors", value: "12", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
                    { label: "Internships (2025)", value: "187", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
                ].map(s => {
                    const Icon = s.icon; return (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>
                                    <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Skill Gap Analysis by Program</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { skill: "Data Structures & Algorithms", cse: 72, cseds: 68 },
                            { skill: "Machine Learning Concepts", cse: 41, cseds: 79 },
                            { skill: "Web Development", cse: 65, cseds: 58 },
                            { skill: "System Design", cse: 33, cseds: 38 },
                            { skill: "Communication & Soft Skills", cse: 61, cseds: 64 },
                        ].map(s => (
                            <div key={s.skill} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium">{s.skill}</span>
                                    <span className="text-muted-foreground">CSE: {s.cse}% | DS: {s.cseds}%</span>
                                </div>
                                <div className="flex gap-1 h-2">
                                    <div className="flex-1 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.cse}%` }} />
                                    </div>
                                    <div className="flex-1 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${s.cseds}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" /> CSE</span>
                            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-500 inline-block" /> CSE-DS</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Faculty Mentor Performance</CardTitle></CardHeader>
                    <CardContent>
                        {[
                            { name: "Dr. Vikram Shah", students: 42, improved: 38, avgScore: 74 },
                            { name: "Ms. Priya Nataraj", students: 38, improved: 32, avgScore: 81 },
                            { name: "Dr. Anjali Iyer", students: 40, improved: 29, avgScore: 68 },
                            { name: "Prof. Rajan Mehta", students: 45, improved: 37, avgScore: 76 },
                        ].map(m => (
                            <div key={m.name} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className="h-9 w-9 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                                    {m.name.split(" ")[1][0]}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{m.name}</p>
                                    <p className="text-xs text-muted-foreground">{m.students} students • {m.improved} improved</p>
                                </div>
                                <Badge variant={m.avgScore >= 75 ? "success" : "warning"}>{m.avgScore}%</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// ─── Program Chair View ───────────────────────────────────────────────────────
function ProgramChairView() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-indigo-50 border-indigo-200 p-4">
                <p className="text-sm text-indigo-800 font-medium">📋 Program Chair – B.Tech CSE (Data Science). You manage student progression, mentors, and course-level insights for this program.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: "CSE-DS Students", value: "124", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Avg CGPA", value: "7.9", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
                    { label: "Placed (2025)", value: "92%", icon: Trophy, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Skill Gaps", value: "3", icon: Target, color: "text-red-600", bg: "bg-red-50" },
                ].map(s => {
                    const Icon = s.icon; return (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>
                                    <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Year-wise Student Health</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { year: "1st Year (2024-28)", count: 31, readiness: 32, atRisk: 4 },
                            { year: "2nd Year (2023-27)", count: 32, readiness: 56, atRisk: 3 },
                            { year: "3rd Year (2022-26)", count: 30, readiness: 74, atRisk: 2 },
                            { year: "4th Year (2021-25)", count: 31, readiness: 91, atRisk: 1 },
                        ].map(y => (
                            <div key={y.year} className="flex items-center gap-4 p-3 rounded-xl border">
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm font-medium">{y.year}</p>
                                        <span className="text-sm font-bold">{y.readiness}%</span>
                                    </div>
                                    <Progress value={y.readiness} />
                                </div>
                                <div className="text-center shrink-0">
                                    <p className="text-xs text-muted-foreground">{y.count} students</p>
                                    {y.atRisk > 0 && <Badge variant="danger">{y.atRisk} at-risk</Badge>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Course Performance</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { course: "Data Structures", completion: 88, avgGrade: "B+" },
                            { course: "Machine Learning", completion: 76, avgGrade: "B" },
                            { course: "Database Systems", completion: 91, avgGrade: "A-" },
                            { course: "Cloud Computing", completion: 64, avgGrade: "B-" },
                            { course: "Big Data", completion: 71, avgGrade: "B" },
                        ].map(c => (
                            <div key={c.course}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{c.course}</span>
                                    <div className="flex gap-2">
                                        <span className="text-muted-foreground">{c.completion}%</span>
                                        <Badge variant={c.avgGrade.startsWith("A") ? "success" : c.avgGrade.startsWith("B+") ? "info" : "default"}>{c.avgGrade}</Badge>
                                    </div>
                                </div>
                                <Progress value={c.completion} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// ─── Faculty Mentor View ──────────────────────────────────────────────────────
function FacultyMentorView() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-teal-50 border-teal-200 p-4">
                <p className="text-sm text-teal-800 font-medium">🧑‍🏫 Faculty Mentor — You are mentoring 42 students in Batch 2022-26. Here's your assigned mentee dashboard.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: "My Students", value: "42", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
                    { label: "Need Attention", value: "6", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                    { label: "Meetings This Week", value: "8", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Avg Readiness", value: "68%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                ].map(s => {
                    const Icon = s.icon; return (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>
                                    <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /> Students Needing Attention</CardTitle></CardHeader>
                    <CardContent>
                        {[
                            { name: "Rahul Doshi", issue: "No LeetCode activity in 2 weeks", readiness: 28 },
                            { name: "Pooja Mehta", issue: "CGPA dropped below 6.5", readiness: 42 },
                            { name: "Ravi Kumar", issue: "No internship applications", readiness: 51 },
                            { name: "Anjali Tiwari", issue: "Missed 3 counseling sessions", readiness: 38 },
                            { name: "Sona Roy", issue: "Skills section empty", readiness: 30 },
                            { name: "Akash Nair", issue: "Low placement score", readiness: 44 },
                        ].map(s => (
                            <div key={s.name} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className="h-9 w-9 rounded-full bg-red-100 text-red-700 font-bold text-sm flex items-center justify-center shrink-0">
                                    {s.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{s.name}</p>
                                    <p className="text-xs text-muted-foreground">{s.issue}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-red-500">{s.readiness}%</p>
                                    <Button size="sm" className="h-6 text-xs mt-1">Message</Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>This Week's Schedule</CardTitle></CardHeader>
                    <CardContent>
                        {[
                            { day: "Mon", time: "10:00 AM", student: "Rachit Jain", topic: "Internship Review" },
                            { day: "Tue", time: "2:00 PM", student: "Priya Sharma", topic: "Resume Feedback" },
                            { day: "Wed", time: "11:00 AM", student: "Karan Patel", topic: "LeetCode Strategy" },
                            { day: "Thu", time: "3:00 PM", student: "Sneha Reddy", topic: "Goal Setting" },
                            { day: "Fri", time: "9:00 AM", student: "Group Session", topic: "Mock Interview Prep" },
                        ].map(s => (
                            <div key={s.day + s.time} className="flex items-center gap-3 py-2 border-b last:border-0">
                                <div className="text-center w-10 shrink-0">
                                    <p className="text-xs font-bold text-primary">{s.day}</p>
                                    <p className="text-xs text-muted-foreground">{s.time}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{s.student}</p>
                                    <p className="text-xs text-muted-foreground">{s.topic}</p>
                                </div>
                                <Badge variant="info">Upcoming</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// ─── Placement Dept View ──────────────────────────────────────────────────────
function PlacementDeptView() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-orange-50 border-orange-200 p-4">
                <p className="text-sm text-orange-800 font-medium">🏢 Placement Department — Full operational view for managing placement drives, JDs, and student readiness pipeline.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: "Total Eligible", value: "198", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Fully Ready", value: "89", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Active Drives", value: "6", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Offers Received", value: "142", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
                ].map(s => {
                    const Icon = s.icon; return (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between">
                                    <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-3xl font-bold mt-1">{s.value}</p></div>
                                    <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Company Readiness Pipeline</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { company: "TCS", eligible: 198, matched: 167, readiness: 84 },
                            { company: "Infosys", eligible: 185, matched: 152, readiness: 82 },
                            { company: "Capgemini", eligible: 165, matched: 132, readiness: 80 },
                            { company: "Amazon", eligible: 78, matched: 31, readiness: 40 },
                            { company: "Google", eligible: 42, matched: 18, readiness: 43 },
                        ].map(c => (
                            <div key={c.company}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{c.company}</span>
                                    <span className="text-muted-foreground">{c.matched}/{c.eligible} matched</span>
                                </div>
                                <Progress value={c.readiness} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            {[
                                { icon: Download, label: "Download Placement Report (PDF)", variant: "primary" as const, color: "text-blue-600" },
                                { icon: Upload, label: "Upload New JD", variant: "outline" as const, color: "text-green-600" },
                                { icon: Bell, label: "Send Batch Notification", variant: "outline" as const, color: "text-orange-600" },
                                { icon: Users, label: "Schedule Mock Drive", variant: "outline" as const, color: "text-purple-600" },
                                { icon: FileText, label: "Generate Eligibility List", variant: "outline" as const, color: "text-teal-600" },
                            ].map(a => {
                                const Icon = a.icon;
                                return (
                                    <Button key={a.label} variant={a.variant} className="w-full justify-start gap-3 h-11">
                                        <Icon className={`h-5 w-5 ${a.color}`} />
                                        {a.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>LeetCode Leaderboard (Top 5)</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[
                            { rank: 1, name: "Aryan Mehta", program: "CSE-DS", solved: 342, score: 98 },
                            { rank: 2, name: "Aman Gupta", program: "CSE", solved: 310, score: 94 },
                            { rank: 3, name: "Priya Sharma", program: "CSE", solved: 274, score: 91 },
                            { rank: 4, name: "Ananya Kumar", program: "CSE-DS", solved: 256, score: 87 },
                            { rank: 5, name: "Rachit Jain", program: "CSE-DS", solved: 187, score: 82 },
                        ].map(s => (
                            <div key={s.rank} className="flex items-center gap-4 p-3 rounded-xl border hover:bg-secondary/40 transition-colors">
                                <span className="text-xl font-black w-8 text-center">
                                    {s.rank === 1 ? "🥇" : s.rank === 2 ? "🥈" : s.rank === 3 ? "🥉" : `#${s.rank}`}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{s.name}</p>
                                    <p className="text-xs text-muted-foreground">{s.program}</p>
                                </div>
                                <Badge variant="info">{s.solved} solved</Badge>
                                <span className={`font-bold text-sm ${s.score >= 90 ? "text-green-600" : "text-yellow-600"}`}>{s.score}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const [role, setRole] = useState<AdminRole>("overview");
    const config = roleConfig[role];

    const roleViews: Record<AdminRole, React.ReactNode> = {
        overview: <OverviewView />,
        director: <DirectorView />,
        dean: <DeanView />,
        program_chair: <ProgramChairView />,
        faculty_mentor: <FacultyMentorView />,
        placement_dept: <PlacementDeptView />,
    };

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className="space-y-6 animate-fade-in-up">
                {/* Header Banner + Role Switcher */}
                <div className="rounded-2xl border bg-gradient-to-r from-card to-secondary p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <UserCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-semibold text-muted-foreground">Viewing as:</span>
                                <Badge variant="default">{config.emoji} {config.label}</Badge>
                            </div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-muted-foreground mt-1">{config.scope}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Export Report
                            </Button>
                            <Button className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" /> View Analytics
                            </Button>
                        </div>
                    </div>
                    {/* Role Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {(Object.entries(roleConfig) as [AdminRole, typeof roleConfig[AdminRole]][]).map(([r, cfg]) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${role === r
                                    ? "bg-primary text-primary-foreground border-transparent shadow-sm"
                                    : "border-input hover:bg-secondary text-muted-foreground"
                                    }`}
                            >
                                {cfg.emoji} {cfg.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Role-specific content */}
                {roleViews[role]}
            </div>
        </DashboardLayout>
    );
}
