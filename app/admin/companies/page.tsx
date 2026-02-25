"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building2, Upload, Search, Users, CheckCircle2, Clock, Trash2, Plus, FileText, Download } from "lucide-react";
import { useState } from "react";

const companies = [
    {
        id: 1, name: "Google", sector: "Tech", roles: ["SDE-1", "ML Engineer"], minCGPA: 7.5,
        minLeetcode: 200, eligibleCount: 42, matchedCount: 18, status: "Active",
        driveDate: "Dec 2025", package: "28-45 LPA", jdFile: "google_jd_2025.pdf",
    },
    {
        id: 2, name: "Amazon", sector: "Tech", roles: ["SDE-1", "Data Engineer"], minCGPA: 7.0,
        minLeetcode: 150, eligibleCount: 78, matchedCount: 31, status: "Active",
        driveDate: "Nov 2025", package: "18-30 LPA", jdFile: "amazon_jd_2025.pdf",
    },
    {
        id: 3, name: "Microsoft", sector: "Tech", roles: ["SWE", "PM Intern"], minCGPA: 7.0,
        minLeetcode: 120, eligibleCount: 92, matchedCount: 44, status: "Upcoming",
        driveDate: "Jan 2026", package: "20-35 LPA", jdFile: null,
    },
    {
        id: 4, name: "TCS", sector: "IT Services", roles: ["Systems Engineer", "Digital"], minCGPA: 6.0,
        minLeetcode: 50, eligibleCount: 198, matchedCount: 167, status: "Active",
        driveDate: "Aug 2025", package: "3.5-7 LPA", jdFile: "tcs_jd_2025.pdf",
    },
    {
        id: 5, name: "Infosys", sector: "IT Services", roles: ["SE", "Power Programmer"], minCGPA: 6.5,
        minLeetcode: 30, eligibleCount: 185, matchedCount: 152, status: "Active",
        driveDate: "Aug 2025", package: "3.6-8 LPA", jdFile: null,
    },
    {
        id: 6, name: "Deloitte", sector: "Consulting", roles: ["Analyst", "Tech Analyst"], minCGPA: 6.5,
        minLeetcode: 0, eligibleCount: 210, matchedCount: 178, status: "Upcoming",
        driveDate: "Sep 2025", package: "7-12 LPA", jdFile: "deloitte_jd_2025.pdf",
    },
];

export default function AdminCompaniesPage() {
    const [search, setSearch] = useState("");
    const [sectorFilter, setSectorFilter] = useState("All");

    const sectors = ["All", ...Array.from(new Set(companies.map(c => c.sector)))];
    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) &&
        (sectorFilter === "All" || c.sector === sectorFilter)
    );

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Building2 className="h-8 w-8 text-primary" /> Company JD Management
                        </h1>
                        <p className="text-muted-foreground">Manage job descriptions, drive schedules & student matching</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2"><Download className="h-4 w-4" /> Export Report</Button>
                        <Button className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload JD</Button>
                        <Button variant="outline" className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Company</Button>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Total Companies", value: companies.length, icon: "🏢" },
                        { label: "Active Drives", value: companies.filter(c => c.status === "Active").length, icon: "✅" },
                        { label: "JDs Uploaded", value: companies.filter(c => c.jdFile).length, icon: "📄" },
                        { label: "Total Eligible Slots", value: companies.reduce((s, c) => s + c.eligibleCount, 0), icon: "👥" },
                    ].map(s => (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5 text-center">
                                <div className="text-3xl mb-1">{s.icon}</div>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search + Filter */}
                <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search company..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    {sectors.map(sec => (
                        <button
                            key={sec}
                            onClick={() => setSectorFilter(sec)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${sectorFilter === sec ? "bg-primary text-white border-primary" : "border-input hover:bg-secondary"
                                }`}
                        >
                            {sec}
                        </button>
                    ))}
                </div>

                {/* Company Table */}
                <Card>
                    <CardContent className="pt-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground text-xs uppercase">
                                        <th className="pb-3 text-left font-medium">Company</th>
                                        <th className="pb-3 text-left font-medium">Roles</th>
                                        <th className="pb-3 text-center font-medium">Min CGPA</th>
                                        <th className="pb-3 text-center font-medium">Min LC</th>
                                        <th className="pb-3 text-center font-medium">Eligible</th>
                                        <th className="pb-3 text-center font-medium">Matched</th>
                                        <th className="pb-3 text-left font-medium">Drive Date</th>
                                        <th className="pb-3 text-left font-medium">Package</th>
                                        <th className="pb-3 text-center font-medium">JD</th>
                                        <th className="pb-3 text-center font-medium">Status</th>
                                        <th className="pb-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filtered.map(c => (
                                        <tr key={c.id} className="hover:bg-secondary/40 transition-colors">
                                            <td className="py-3 pr-4">
                                                <p className="font-semibold">{c.name}</p>
                                                <p className="text-xs text-muted-foreground">{c.sector}</p>
                                            </td>
                                            <td className="py-3 pr-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {c.roles.slice(0, 2).map(r => (
                                                        <span key={r} className="text-xs bg-secondary px-2 py-0.5 rounded-full">{r}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 text-center font-medium">{c.minCGPA}</td>
                                            <td className="py-3 text-center font-medium">{c.minLeetcode || "—"}</td>
                                            <td className="py-3 text-center">
                                                <span className="flex items-center justify-center gap-1">
                                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> {c.eligibleCount}
                                                </span>
                                            </td>
                                            <td className="py-3 text-center">
                                                <span className="flex items-center justify-center gap-1 text-green-600 font-medium">
                                                    <CheckCircle2 className="h-3.5 w-3.5" /> {c.matchedCount}
                                                </span>
                                            </td>
                                            <td className="py-3 pr-4">
                                                <span className="flex items-center gap-1 text-sm">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {c.driveDate}
                                                </span>
                                            </td>
                                            <td className="py-3 pr-4 text-sm font-medium text-green-700">{c.package}</td>
                                            <td className="py-3 text-center">
                                                {c.jdFile
                                                    ? <button className="flex items-center gap-1 text-xs text-primary underline mx-auto"><FileText className="h-3.5 w-3.5" /> View</button>
                                                    : <button className="text-xs text-muted-foreground underline flex items-center gap-1 mx-auto"><Upload className="h-3.5 w-3.5" /> Upload</button>
                                                }
                                            </td>
                                            <td className="py-3 text-center">
                                                <Badge variant={c.status === "Active" ? "success" : "warning"}>{c.status}</Badge>
                                            </td>
                                            <td className="py-3 text-center">
                                                <button className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
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
