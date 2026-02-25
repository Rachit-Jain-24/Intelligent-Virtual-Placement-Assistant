"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GraduationCap, Search, Briefcase, MapPin, Linkedin, Mail, Star, Building2, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const alumni = [
    { id: 1, name: "Rahul Agarwal", batch: "2022", program: "CSE-DS", company: "Google", role: "SDE-2", location: "Bangalore", cgpa: 8.9, mentoring: true, linkedin: "#", email: "r@g.com", rating: 4.8 },
    { id: 2, name: "Meera Nair", batch: "2021", program: "CSE", company: "Amazon", role: "Data Engineer", location: "Hyderabad", cgpa: 9.1, mentoring: true, linkedin: "#", email: "m@a.com", rating: 4.9 },
    { id: 3, name: "Vikram Joshi", batch: "2023", program: "CSE-DS", company: "Microsoft", role: "SWE", location: "Pune", cgpa: 8.7, mentoring: false, linkedin: "#", email: "v@m.com", rating: 4.5 },
    { id: 4, name: "Prarthana Singh", batch: "2022", program: "CSE", company: "TCS", role: "Systems Engineer", location: "Mumbai", cgpa: 8.2, mentoring: true, linkedin: "#", email: "p@t.com", rating: 4.3 },
    { id: 5, name: "Arjun Reddy", batch: "2020", program: "CSE", company: "Deloitte", role: "Consultant", location: "Hyderabad", cgpa: 8.5, mentoring: true, linkedin: "#", email: "a@d.com", rating: 4.7 },
    { id: 6, name: "Kavya Krishnan", batch: "2023", program: "CSE-DS", company: "Flipkart", role: "ML Engineer", location: "Bangalore", cgpa: 9.3, mentoring: false, linkedin: "#", email: "k@f.com", rating: 4.6 },
    { id: 7, name: "Siddharth Rao", batch: "2021", program: "CSE", company: "Infosys", role: "Tech Lead", location: "Chennai", cgpa: 8.0, mentoring: true, linkedin: "#", email: "s@i.com", rating: 4.2 },
    { id: 8, name: "Neha Gupta", batch: "2022", program: "CSE-DS", company: "Cognizant", role: "Data Analyst", location: "Hyderabad", cgpa: 7.8, mentoring: false, linkedin: "#", email: "n@c.com", rating: 4.0 },
];

const topCompanies = [
    { name: "Google", count: 8 },
    { name: "Amazon", count: 14 },
    { name: "Microsoft", count: 11 },
    { name: "TCS", count: 32 },
    { name: "Infosys", count: 27 },
    { name: "Deloitte", count: 12 },
];

export default function AdminAlumniPage() {
    const [search, setSearch] = useState("");
    const [batchFilter, setBatchFilter] = useState("All");
    const [mentorFilter, setMentorFilter] = useState(false);

    const batches = ["All", ...Array.from(new Set(alumni.map(a => a.batch))).sort().reverse()];
    const filtered = alumni.filter(a => {
        const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.company.toLowerCase().includes(search.toLowerCase());
        const matchBatch = batchFilter === "All" || a.batch === batchFilter;
        const matchMentor = !mentorFilter || a.mentoring;
        return matchSearch && matchBatch && matchMentor;
    });

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <GraduationCap className="h-8 w-8 text-green-600" /> Alumni Network
                        </h1>
                        <p className="text-muted-foreground">Manage alumni profiles, mentorship & placement insights</p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Invite Alumni
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Total Alumni", value: "248", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
                        { label: "Active Mentors", value: "64", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
                        { label: "Companies", value: "42", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Avg Package", value: "14.2 LPA", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
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

                {/* Top Companies */}
                <Card>
                    <CardHeader><CardTitle>Alumni by Company</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {topCompanies.map(c => (
                                <div key={c.name} className="flex items-center gap-2 rounded-xl border px-4 py-2 bg-secondary/40">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium text-sm">{c.name}</span>
                                    <Badge variant="info">{c.count}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Search/Filter */}
                <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search alumni or company..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    {batches.map(b => (
                        <button key={b} onClick={() => setBatchFilter(b)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${batchFilter === b ? "bg-primary text-white border-primary" : "border-input hover:bg-secondary"}`}>
                            {b === "All" ? "All Batches" : `Batch ${b}`}
                        </button>
                    ))}
                    <button
                        onClick={() => setMentorFilter(!mentorFilter)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${mentorFilter ? "bg-green-600 text-white border-green-600" : "border-input hover:bg-secondary"}`}>
                        ⭐ Mentors Only
                    </button>
                </div>

                {/* Alumni Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map(a => (
                        <Card key={a.id} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-full gradient-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                                        {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{a.name}</p>
                                            {a.mentoring && <Badge variant="success">Mentor</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Batch {a.batch} • {a.program}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Briefcase className="h-3.5 w-3.5 shrink-0" />
                                        <span>{a.role} @ <span className="font-medium text-foreground">{a.company}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        <span>{a.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star className="h-3.5 w-3.5 shrink-0 text-yellow-500" />
                                        <span className="font-medium text-foreground">{a.rating}</span>
                                        <span>mentor rating</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <a href={a.linkedin} className="flex-1">
                                        <Button size="sm" variant="outline" className="w-full flex items-center gap-1.5">
                                            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                                        </Button>
                                    </a>
                                    <a href={`mailto:${a.email}`} className="flex-1">
                                        <Button size="sm" className="w-full flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5" /> Contact
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
