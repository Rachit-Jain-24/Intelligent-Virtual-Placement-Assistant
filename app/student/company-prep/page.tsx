"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useState } from "react";
import {
    Building2, Search, Upload, Star, Target, Code2,
    ChevronRight, Flame, CheckCircle2, XCircle, Clock, FileText
} from "lucide-react";

const companies = [
    {
        id: 1, name: "Google", logo: "G", color: "bg-blue-500",
        roles: ["SDE-1", "SDE-2", "ML Engineer"],
        minCGPA: 7.5, minLeetcode: 200,
        skills: ["DSA", "System Design", "Python/Java", "ML Basics"],
        process: ["Online Test", "3 Tech Rounds", "HR Round"],
        myReadiness: 45, difficulty: "High", visits: "Dec 2025",
        jdUploaded: true,
    },
    {
        id: 2, name: "Amazon", logo: "A", color: "bg-orange-500",
        roles: ["SDE-1", "Data Engineer"],
        minCGPA: 7.0, minLeetcode: 150,
        skills: ["DSA", "OOP", "System Design", "SQL"],
        process: ["OA", "2 Tech Rounds", "LP Round", "HR"],
        myReadiness: 62, difficulty: "High", visits: "Nov 2025",
        jdUploaded: true,
    },
    {
        id: 3, name: "Microsoft", logo: "M", color: "bg-green-600",
        roles: ["SWE", "Data Scientist"],
        minCGPA: 7.0, minLeetcode: 120,
        skills: ["DSA", "OOP", "Azure", "Python"],
        process: ["Online Assessment", "3 Interview Rounds"],
        myReadiness: 58, difficulty: "Medium-High", visits: "Jan 2026",
        jdUploaded: true,
    },
    {
        id: 4, name: "TCS", logo: "T", color: "bg-blue-700",
        roles: ["Systems Engineer", "Digital", "Ninja"],
        minCGPA: 6.0, minLeetcode: 50,
        skills: ["Programming Basics", "Aptitude", "English"],
        process: ["TCS NQT", "Technical Interview", "HR"],
        myReadiness: 92, difficulty: "Low", visits: "Aug 2025",
        jdUploaded: true,
    },
    {
        id: 5, name: "Infosys", logo: "I", color: "bg-indigo-500",
        roles: ["Systems Engineer", "Power Programmer"],
        minCGPA: 6.5, minLeetcode: 30,
        skills: ["Coding Basics", "Aptitude", "Communication"],
        process: ["Infosys Placement Test", "HR Interview"],
        myReadiness: 88, difficulty: "Low-Medium", visits: "Aug 2025",
        jdUploaded: false,
    },
    {
        id: 6, name: "Capgemini", logo: "C", color: "bg-teal-500",
        roles: ["Analyst", "Senior Analyst"],
        minCGPA: 6.0, minLeetcode: 20,
        skills: ["Aptitude", "Logical Reasoning", "English"],
        process: ["Game Based Assessment", "Technical", "HR"],
        myReadiness: 80, difficulty: "Low-Medium", visits: "Sep 2025",
        jdUploaded: false,
    },
];

export default function CompanyPrepPage() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<typeof companies[0] | null>(companies[0]);
    const [filter, setFilter] = useState<"all" | "ready" | "developing">("all");

    const filtered = companies.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "all" ? true :
                filter === "ready" ? c.myReadiness >= 75 :
                    c.myReadiness < 75;
        return matchSearch && matchFilter;
    });

    const readinessColor = (v: number) =>
        v >= 80 ? "text-green-600" : v >= 60 ? "text-yellow-600" : v >= 40 ? "text-orange-500" : "text-red-500";

    const readinessBg = (v: number) =>
        v >= 80 ? "bg-green-500" : v >= 60 ? "bg-yellow-500" : v >= 40 ? "bg-orange-500" : "bg-red-400";

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Building2 className="h-8 w-8 text-primary" /> Company Prep
                        </h1>
                        <p className="text-muted-foreground">AI-powered readiness for each company's hiring process</p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Upload JD (PDF)
                    </Button>
                </div>

                {/* Search + Filter */}
                <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    {(["all", "ready", "developing"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize border transition-colors ${filter === f ? "bg-primary text-white border-primary" : "border-input hover:bg-secondary"
                                }`}
                        >
                            {f === "all" ? "All Companies" : f === "ready" ? "✅ Ready" : "🔄 Developing"}
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
                    {/* Company List */}
                    <div className="space-y-2">
                        {filtered.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelected(c)}
                                className={`w-full rounded-xl border p-4 text-left transition-all ${selected?.id === c.id
                                        ? "border-primary/40 bg-primary/5 shadow-sm"
                                        : "hover:bg-secondary/50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl ${c.color} text-white font-bold text-lg flex items-center justify-center shrink-0`}>
                                        {c.logo}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{c.name}</p>
                                            <span className={`text-sm font-bold ${readinessColor(c.myReadiness)}`}>
                                                {c.myReadiness}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{c.roles[0]} • {c.difficulty}</p>
                                        <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                                            <div className={`h-full ${readinessBg(c.myReadiness)} rounded-full`}
                                                style={{ width: `${c.myReadiness}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-center py-8 text-muted-foreground text-sm">No companies match your filter.</p>
                        )}
                    </div>

                    {/* Company Detail */}
                    {selected ? (
                        <div className="space-y-4">
                            {/* Header */}
                            <Card>
                                <CardContent className="pt-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`h-16 w-16 rounded-2xl ${selected.color} text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-lg`}>
                                            {selected.logo}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h2 className="text-2xl font-bold">{selected.name}</h2>
                                                <Badge variant={selected.myReadiness >= 80 ? "success" : selected.myReadiness >= 60 ? "warning" : "danger"}>
                                                    {selected.myReadiness >= 80 ? "Ready" : selected.myReadiness >= 60 ? "Almost Ready" : "Needs Work"}
                                                </Badge>
                                                {selected.jdUploaded && <Badge variant="info">JD Available</Badge>}
                                            </div>
                                            <p className="text-muted-foreground text-sm mt-1">
                                                Roles: {selected.roles.join(", ")} • Expected Visit: {selected.visits}
                                            </p>
                                            <div className="mt-3">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">My Readiness</span>
                                                    <span className={`font-bold ${readinessColor(selected.myReadiness)}`}>{selected.myReadiness}%</span>
                                                </div>
                                                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                                                    <div className={`h-full ${readinessBg(selected.myReadiness)} rounded-full progress-animated`}
                                                        style={{ width: `${selected.myReadiness}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Eligibility */}
                                <Card>
                                    <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Star className="h-4 w-4 text-yellow-500" /> Eligibility</CardTitle></CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                                            <span className="text-sm">Min CGPA</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">{selected.minCGPA}</span>
                                                {8.7 >= selected.minCGPA
                                                    ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    : <XCircle className="h-4 w-4 text-red-500" />}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                                            <span className="text-sm">Min LeetCode</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">{selected.minLeetcode}</span>
                                                {187 >= selected.minLeetcode
                                                    ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    : <XCircle className="h-4 w-4 text-red-500" />}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                                            <span className="text-sm">Backlogs</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">0</span>
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Required Skills */}
                                <Card>
                                    <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Target className="h-4 w-4 text-primary" /> Required Skills</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {selected.skills.map(skill => (
                                                <div key={skill} className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${["Python", "React", "SQL", "Machine Learning", "Git"].includes(skill) ? "bg-green-500" : "bg-red-400"}`} />
                                                    <span className="text-sm">{skill}</span>
                                                    <span className={`text-xs ml-auto font-medium ${["Python", "React", "SQL", "Machine Learning", "Git"].includes(skill) ? "text-green-600" : "text-red-500"}`}>
                                                        {["Python", "React", "SQL", "Machine Learning", "Git"].includes(skill) ? "✓ Have it" : "✗ Missing"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Hiring Process */}
                                <Card>
                                    <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Clock className="h-4 w-4 text-blue-500" /> Hiring Process</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {selected.process.map((step, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                                                        {i + 1}
                                                    </div>
                                                    <span className="text-sm">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* AI Tip */}
                                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                                    <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Flame className="h-4 w-4 text-orange-500" /> AI Prep Tip</CardTitle></CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {selected.myReadiness >= 80
                                                ? `You're well-prepared for ${selected.name}! Focus on mock interviews and behavioral questions. Review their leadership principles.`
                                                : selected.myReadiness >= 60
                                                    ? `Good progress! To close the gap for ${selected.name}, focus on: ${selected.skills.filter(s => !["Python", "React", "SQL"].includes(s)).slice(0, 2).join(" and ")}. Aim for ${selected.minLeetcode + 30} LeetCode problems.`
                                                    : `Start with the fundamentals for ${selected.name}. Practice ${selected.minLeetcode} LeetCode problems in Arrays, Trees, and DP. Your CGPA is good — focus on coding skills.`}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                            <Button size="sm" className="flex items-center gap-1.5">
                                                <Code2 className="h-3.5 w-3.5" /> Practice Problems
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                                                <FileText className="h-3.5 w-3.5" /> View JD
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                            <div className="text-center">
                                <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>Select a company to see your readiness details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
