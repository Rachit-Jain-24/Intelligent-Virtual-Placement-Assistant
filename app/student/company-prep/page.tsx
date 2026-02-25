"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import {
    Briefcase, GraduationCap, Code2, CheckCircle2, XCircle,
    CalendarDays, TrendingUp, Target, Flame, Circle,
    Clock, ChevronRight, Star, Plus, Trash2, BookOpen
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────────────────────

const myProfile = { cgpa: 8.7, leetcode: 187, backlogs: 0, currentSem: 6 };

type SemStatus = "past" | "current" | "upcoming";
type ReadyStatus = "behind" | "on-track" | "ready";

const semesterTimeline = [
    {
        sem: "Semester 5",
        period: "Aug – Oct 2025",
        semNum: 5,
        status: "past" as SemStatus,
        companies: [
            { name: "TCS", logo: "T", color: "bg-blue-700", ctc: "₹3.36–7 LPA", difficulty: "Low" },
            { name: "Infosys", logo: "I", color: "bg-indigo-500", ctc: "₹3.6–6.5 LPA", difficulty: "Low" },
            { name: "Wipro", logo: "W", color: "bg-violet-500", ctc: "₹3.5 LPA", difficulty: "Low" },
        ],
        prepGoals: [
            "Maintain CGPA ≥ 6.0 (no active backlogs)",
            "Complete 50+ LeetCode Easy problems",
            "Practice Aptitude & Verbal Ability daily",
            "Revise basics of one OOP language (Java/Python/C++)",
        ],
        myReadyStatus: "ready" as ReadyStatus,
        note: "Service companies — focus on aptitude + basics. You're already past this.",
    },
    {
        sem: "Semester 6",
        period: "Jan – Mar 2026",
        semNum: 6,
        status: "current" as SemStatus,
        companies: [
            { name: "Capgemini", logo: "C", color: "bg-teal-500", ctc: "₹4.5 LPA", difficulty: "Low-Medium" },
            { name: "Accenture", logo: "A", color: "bg-purple-500", ctc: "₹4.5 LPA", difficulty: "Low-Medium" },
            { name: "Cognizant", logo: "C", color: "bg-blue-400", ctc: "₹4 LPA", difficulty: "Low-Medium" },
        ],
        prepGoals: [
            "Solve 100+ LeetCode problems (Easy–Medium)",
            "Brush up on DBMS, OS basics, CN fundamentals",
            "Practice game-based & psychometric assessments",
            "Prepare 2–3 STAR-format HR answers",
        ],
        myReadyStatus: "on-track" as ReadyStatus,
        note: "Current wave! These companies are visiting now. Finish your LeetCode easy-medium streak.",
    },
    {
        sem: "Semester 7",
        period: "Aug – Nov 2026",
        semNum: 7,
        status: "upcoming" as SemStatus,
        companies: [
            { name: "Amazon", logo: "A", color: "bg-orange-500", ctc: "₹30 LPA", difficulty: "High" },
            { name: "Microsoft", logo: "M", color: "bg-green-600", ctc: "₹26 LPA", difficulty: "High" },
            { name: "Goldman Sachs", logo: "GS", color: "bg-blue-900", ctc: "₹20 LPA", difficulty: "High" },
        ],
        prepGoals: [
            "Solve 200+ LeetCode problems (Medium–Hard)",
            "Study System Design (HLD + LLD basics)",
            "Revise Amazon's 16 Leadership Principles (STAR format)",
            "Build 2 strong projects on GitHub",
            "Intern somewhere — even a 1-month internship counts",
        ],
        myReadyStatus: "behind" as ReadyStatus,
        note: "Start prepping now — 6 months is just enough time for Amazon/Microsoft.",
    },
    {
        sem: "Semester 8",
        period: "Jan – Mar 2027",
        semNum: 8,
        status: "upcoming" as SemStatus,
        companies: [
            { name: "Google", logo: "G", color: "bg-blue-500", ctc: "₹45 LPA", difficulty: "Very High" },
            { name: "Uber", logo: "U", color: "bg-gray-900", ctc: "₹40 LPA", difficulty: "Very High" },
            { name: "Adobe", logo: "Ad", color: "bg-red-600", ctc: "₹28 LPA", difficulty: "High" },
        ],
        prepGoals: [
            "250+ LeetCode (Hard problems included)",
            "Full System Design proficiency (Distributed Systems)",
            "Strong CS fundamentals — OOPS, OS, DBMS, Networks",
            "2+ significant projects / open source contributions",
            "Polish your resume & LinkedIn profile",
        ],
        myReadyStatus: "behind" as ReadyStatus,
        note: "Dream company season. Everything you do in Sem 6–7 builds toward this.",
    },
];

// Prep checklists per company
const companyChecklists: Record<string, { task: string; category: string }[]> = {
    "TCS": [
        { task: "Complete TCS NQT preparation (IndiaBix)", category: "Aptitude" },
        { task: "Solve 50 LeetCode Easy problems", category: "Coding" },
        { task: "Revise OOP basics in Java or Python", category: "Coding" },
        { task: "Practise verbal ability & email writing", category: "Soft Skills" },
        { task: "Give 1 mock TCS NQT test", category: "Mock Test" },
    ],
    "Infosys": [
        { task: "Complete HackWithInfy previous papers", category: "Coding" },
        { task: "Revise quantitative aptitude formulas", category: "Aptitude" },
        { task: "Practise 5 mock HR interview answers", category: "Soft Skills" },
        { task: "Know your projects well for technical interview", category: "Projects" },
    ],
    "Capgemini": [
        { task: "Practice SHL-style game-based assessments", category: "Assessment" },
        { task: "Solve 80 LeetCode Easy–Medium", category: "Coding" },
        { task: "Revise logical reasoning patterns", category: "Aptitude" },
        { task: "Prepare 3 STAR-format HR answers", category: "Soft Skills" },
    ],
    "Amazon": [
        { task: "Solve 200+ LeetCode (Arrays, Trees, DP, Graphs)", category: "Coding" },
        { task: "Study all 16 Amazon Leadership Principles", category: "Behavioural" },
        { task: "Prepare 10 STAR-format LP stories", category: "Behavioural" },
        { task: "Revise DBMS: joins, indexing, normalization", category: "CS Basics" },
        { task: "Study HLD basics: load balancer, caching, queues", category: "System Design" },
        { task: "Give 3 mock coding interviews", category: "Mock Test" },
    ],
    "Microsoft": [
        { task: "Solve 150+ LeetCode Medium problems", category: "Coding" },
        { task: "Revise OOP + SOLID principles thoroughly", category: "CS Basics" },
        { task: "Write clean code — practice on paper", category: "Coding" },
        { task: "Learn Azure basics (AZ-900 intro)", category: "Cloud" },
        { task: "Build 1 full-stack project with clean GitHub history", category: "Projects" },
    ],
    "Google": [
        { task: "Solve 250+ LeetCode (Hard included)", category: "Coding" },
        { task: "Study System Design deeply (Designing Data-Intensive Apps)", category: "System Design" },
        { task: "Know Big-O for every solution", category: "Coding" },
        { task: "Master: Tries, Segment Trees, Bit Manipulation", category: "Coding" },
        { task: "Contribute to 1 open-source project", category: "Projects" },
        { task: "Give 5+ mock interviews on Pramp / interviewing.io", category: "Mock Test" },
    ],
};

type Tab = "timeline" | "tracker";

const statusConfig = {
    ready: { label: "Ready ✅", bg: "bg-green-100", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
    "on-track": { label: "On Track 🔄", bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
    behind: { label: "Behind 🔴", bg: "bg-red-100", text: "text-red-600", border: "border-red-200", dot: "bg-red-500" },
};

const semStatusStyle = {
    past: "border-gray-200 bg-gray-50/50 opacity-75",
    current: "border-primary/40 bg-primary/5 shadow-md ring-1 ring-primary/20",
    upcoming: "border-gray-200 bg-white",
};

const ALL_TARGET_COMPANIES = Object.keys(companyChecklists);

// ──────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

export default function PlacementPrepPage() {
    const [tab, setTab] = useState<Tab>("timeline");
    const [targetCompanies, setTargetCompanies] = useState<string[]>(["Amazon", "Google"]);
    const [checked, setChecked] = useState<Record<string, Set<number>>>({});
    const [addingCompany, setAddingCompany] = useState(false);

    const toggleTask = (company: string, idx: number) => {
        setChecked(prev => {
            const s = new Set(prev[company] || []);
            s.has(idx) ? s.delete(idx) : s.add(idx);
            return { ...prev, [company]: s };
        });
    };

    const getProgress = (company: string) => {
        const tasks = companyChecklists[company]?.length ?? 0;
        const done = checked[company]?.size ?? 0;
        return tasks > 0 ? Math.round((done / tasks) * 100) : 0;
    };

    const addCompany = (name: string) => {
        if (!targetCompanies.includes(name)) setTargetCompanies(p => [...p, name]);
        setAddingCompany(false);
    };

    const removeCompany = (name: string) => setTargetCompanies(p => p.filter(c => c !== name));

    const availableToAdd = ALL_TARGET_COMPANIES.filter(c => !targetCompanies.includes(c));

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Briefcase className="h-8 w-8 text-primary" /> Placement Prep
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Know when companies visit, track your prep, and never miss a deadline
                    </p>
                </div>

                {/* My Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: GraduationCap, label: "My CGPA", value: myProfile.cgpa, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                        { icon: Code2, label: "LeetCode Solved", value: myProfile.leetcode, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
                        { icon: CheckCircle2, label: "Active Backlogs", value: myProfile.backlogs, color: "text-green-600", bg: "bg-green-50 border-green-100" },
                    ].map(({ icon: Icon, label, value, color, bg }) => (
                        <div key={label} className={`rounded-xl border p-4 flex items-center gap-3 ${bg}`}>
                            <div className="rounded-lg bg-white p-2 shadow-sm border">
                                <Icon className={`h-5 w-5 ${color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{label}</p>
                                <p className={`text-xl font-bold ${color}`}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 rounded-xl border bg-secondary/50 p-1 w-fit">
                    {([
                        { key: "timeline", label: "📅 Campus Timeline", icon: CalendarDays },
                        { key: "tracker", label: "✅ My Prep Tracker", icon: Target },
                    ] as const).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === key
                                ? "bg-white shadow-sm text-primary border border-primary/20"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── TAB A: CAMPUS TIMELINE ── */}
                {tab === "timeline" && (
                    <div className="relative">
                        {/* Vertical connector line */}
                        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-border hidden md:block" />

                        <div className="space-y-5">
                            {semesterTimeline.map((sem) => {
                                const isCurrent = sem.status === "current";
                                const sc = statusConfig[sem.myReadyStatus];

                                return (
                                    <div key={sem.sem} className="flex gap-5 items-start">
                                        {/* Timeline dot */}
                                        <div className="relative hidden md:flex flex-col items-center shrink-0 mt-5">
                                            <div className={`h-3.5 w-3.5 rounded-full border-2 border-white shadow-md z-10 ${sc.dot} ${isCurrent ? "scale-125 ring-4 ring-primary/20" : ""}`} />
                                        </div>

                                        {/* Card */}
                                        <Card className={`flex-1 border-2 transition-all ${semStatusStyle[sem.status]}`}>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between flex-wrap gap-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <CardTitle className="text-lg">{sem.sem}</CardTitle>
                                                            {isCurrent && (
                                                                <span className="rounded-full bg-primary text-white text-xs font-bold px-2.5 py-0.5 animate-pulse-glow">
                                                                    CURRENT
                                                                </span>
                                                            )}
                                                            {sem.status === "past" && (
                                                                <span className="rounded-full bg-gray-200 text-gray-500 text-xs font-medium px-2.5 py-0.5">
                                                                    PASSED
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                                            <Clock className="h-3.5 w-3.5" /> {sem.period}
                                                        </p>
                                                    </div>
                                                    <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${sc.bg} ${sc.text} ${sc.border}`}>
                                                        <div className={`h-2 w-2 rounded-full ${sc.dot}`} />
                                                        {sc.label}
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                {/* Companies visiting */}
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                                        Companies Visiting
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {sem.companies.map((c) => (
                                                            <div key={c.name} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-1.5 shadow-sm">
                                                                <div className={`h-6 w-6 rounded-md ${c.color} text-white text-xs font-bold flex items-center justify-center`}>
                                                                    {c.logo}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium leading-none">{c.name}</p>
                                                                    <p className="text-xs text-muted-foreground">{c.ctc}</p>
                                                                </div>
                                                                <Badge variant={c.difficulty === "Very High" ? "danger" : c.difficulty === "High" ? "warning" : c.difficulty === "Low" ? "success" : "default"} className="ml-1 text-xs">
                                                                    {c.difficulty}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Prep goals */}
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                                        What to Prepare
                                                    </p>
                                                    <div className="grid gap-1.5 sm:grid-cols-2">
                                                        {sem.prepGoals.map((goal, i) => (
                                                            <div key={i} className="flex items-start gap-2 text-sm">
                                                                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                                                <span>{goal}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Note */}
                                                <div className={`rounded-xl border px-4 py-2.5 text-sm flex items-start gap-2 ${isCurrent ? "border-primary/20 bg-primary/5 text-primary" : "border-border bg-secondary/40 text-muted-foreground"}`}>
                                                    <Flame className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                                                    {sem.note}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── TAB C: PREP TRACKER ── */}
                {tab === "tracker" && (
                    <div className="space-y-5">
                        {/* Add company row */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <p className="text-sm font-medium text-muted-foreground">Tracking {targetCompanies.length} companies:</p>
                            {!addingCompany ? (
                                <button
                                    onClick={() => setAddingCompany(true)}
                                    className="flex items-center gap-1.5 rounded-lg border border-dashed border-primary/40 px-3 py-1.5 text-sm text-primary hover:bg-primary/5 transition-colors"
                                >
                                    <Plus className="h-3.5 w-3.5" /> Add company
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 flex-wrap">
                                    {availableToAdd.map(name => (
                                        <button
                                            key={name}
                                            onClick={() => addCompany(name)}
                                            className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                                        >
                                            + {name}
                                        </button>
                                    ))}
                                    <button onClick={() => setAddingCompany(false)} className="text-xs text-muted-foreground hover:underline">cancel</button>
                                </div>
                            )}
                        </div>

                        {targetCompanies.length === 0 && (
                            <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                                <Star className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                <p>No target companies yet. Add one to start tracking your prep!</p>
                            </div>
                        )}

                        <div className="grid gap-5 md:grid-cols-2">
                            {targetCompanies.map(company => {
                                const tasks = companyChecklists[company] ?? [];
                                const done = checked[company]?.size ?? 0;
                                const total = tasks.length;
                                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                                const readyStatus = pct >= 80 ? "ready" : pct >= 40 ? "on-track" : "behind";
                                const sc = statusConfig[readyStatus];

                                // Group tasks by category
                                const categories: Record<string, { task: string; idx: number }[]> = {};
                                tasks.forEach((t, i) => {
                                    if (!categories[t.category]) categories[t.category] = [];
                                    categories[t.category].push({ task: t.task, idx: i });
                                });

                                return (
                                    <Card key={company} className="border-2 border-border hover:border-primary/30 transition-colors">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                    {company}
                                                </CardTitle>
                                                <button
                                                    onClick={() => removeCompany(company)}
                                                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
                                                    title="Remove"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Progress ring + bar */}
                                            <div className="flex items-center gap-4 mt-2">
                                                {/* Ring */}
                                                <div className="relative h-16 w-16 shrink-0">
                                                    <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                                                        <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
                                                        <circle
                                                            cx="32" cy="32" r="26" fill="none"
                                                            stroke={pct >= 80 ? "#16a34a" : pct >= 40 ? "#ca8a04" : "#ef4444"}
                                                            strokeWidth="6"
                                                            strokeDasharray={`${2 * Math.PI * 26}`}
                                                            strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                                                            strokeLinecap="round"
                                                            className="transition-all duration-500"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className={`text-sm font-bold ${pct >= 80 ? "text-green-600" : pct >= 40 ? "text-yellow-600" : "text-red-500"}`}>
                                                            {pct}%
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2 ${sc.bg} ${sc.text} ${sc.border}`}>
                                                        <div className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                                                        {sc.label}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{done} of {total} tasks done</p>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            {Object.entries(categories).map(([category, catTasks]) => (
                                                <div key={category}>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{category}</p>
                                                    <div className="space-y-1.5">
                                                        {catTasks.map(({ task, idx }) => {
                                                            const isChecked = checked[company]?.has(idx) ?? false;
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => toggleTask(company, idx)}
                                                                    className={`flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left text-sm transition-all ${isChecked
                                                                        ? "border-green-200 bg-green-50"
                                                                        : "border-border hover:bg-secondary/50"
                                                                        }`}
                                                                >
                                                                    {isChecked
                                                                        ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                                                        : <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                                                    }
                                                                    <span className={isChecked ? "line-through text-muted-foreground" : ""}>{task}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Motivational footer */}
                                            {pct === 100 && (
                                                <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 font-medium text-center">
                                                    🎉 You're fully prepped for {company}! Go get it!
                                                </div>
                                            )}
                                            {pct > 0 && pct < 100 && (
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                                                    {total - done} task{total - done !== 1 ? "s" : ""} left to complete your {company} prep
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Overall summary */}
                        {targetCompanies.length > 0 && (
                            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                                <CardContent className="pt-4 pb-4">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-primary/10 p-2.5">
                                                <Star className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">Overall Placement Readiness</p>
                                                <p className="text-sm text-muted-foreground">Averaged across all your target companies</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-primary">
                                                {targetCompanies.length > 0
                                                    ? Math.round(targetCompanies.reduce((sum, c) => sum + getProgress(c), 0) / targetCompanies.length)
                                                    : 0}%
                                            </p>
                                            <p className="text-xs text-muted-foreground">ready</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
