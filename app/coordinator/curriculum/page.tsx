"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BookOpen, Plus, Trash2, Pencil, Info } from "lucide-react";

const branches = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const careerRoles = ["Web Dev", "Data Science", "AI/ML", "Cloud/DevOps", "Cybersecurity", "Mobile Dev"];

type Relevance = "high" | "moderate" | "low";

interface Subject {
    id: number;
    name: string;
    code: string;
    topics: string;
    credits: number;
    branch: string;
    sem: string;
}

const relevanceMatrix: Record<string, Record<string, Relevance>> = {
    "Machine Learning": { "Web Dev": "low", "Data Science": "high", "AI/ML": "high", "Cloud/DevOps": "moderate", "Cybersecurity": "moderate", "Mobile Dev": "low" },
    "Web Technologies": { "Web Dev": "high", "Data Science": "low", "AI/ML": "low", "Cloud/DevOps": "moderate", "Cybersecurity": "moderate", "Mobile Dev": "moderate" },
    "DBMS": { "Web Dev": "high", "Data Science": "high", "AI/ML": "moderate", "Cloud/DevOps": "high", "Cybersecurity": "moderate", "Mobile Dev": "high" },
    "Computer Networks": { "Web Dev": "moderate", "Data Science": "low", "AI/ML": "low", "Cloud/DevOps": "high", "Cybersecurity": "high", "Mobile Dev": "moderate" },
    "Operating Systems": { "Web Dev": "moderate", "Data Science": "moderate", "AI/ML": "low", "Cloud/DevOps": "high", "Cybersecurity": "high", "Mobile Dev": "moderate" },
};

const initialSubjects: Subject[] = [
    { id: 1, name: "Machine Learning", code: "CS401", topics: "Supervised Learning, Unsupervised Learning, Neural Networks", credits: 4, branch: "CSE", sem: "5" },
    { id: 2, name: "Web Technologies", code: "CS301", topics: "HTML, CSS, JavaScript, React, REST APIs", credits: 3, branch: "CSE", sem: "4" },
    { id: 3, name: "DBMS", code: "CS302", topics: "SQL, Relational Models, Transactions, Indexing", credits: 4, branch: "CSE", sem: "4" },
    { id: 4, name: "Computer Networks", code: "CS303", topics: "TCP/IP, OSI Model, Routing, DNS, HTTP", credits: 3, branch: "CSE", sem: "5" },
    { id: 5, name: "Operating Systems", code: "CS304", topics: "Process Management, Memory Management, File Systems", credits: 4, branch: "CSE", sem: "5" },
];

const relevanceDot: Record<Relevance, string> = {
    high: "bg-green-500",
    moderate: "bg-yellow-400",
    low: "bg-gray-300",
};

const relevanceLabel: Record<Relevance, string> = {
    high: "High",
    moderate: "Moderate",
    low: "Low",
};

export default function CoordinatorCurriculum() {
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [filterBranch, setFilterBranch] = useState("CSE");
    const [filterSem, setFilterSem] = useState("5");
    const [form, setForm] = useState({ name: "", code: "", topics: "", credits: "", branch: "CSE", sem: "5" });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [nextId, setNextId] = useState(6);
    const [hoveredCell, setHoveredCell] = useState<{ subject: string; role: string } | null>(null);

    const filteredSubjects = subjects.filter(s => s.branch === filterBranch && s.sem === filterSem);
    const matrixSubjects = filteredSubjects.filter(s => relevanceMatrix[s.name]);

    const handleAdd = () => {
        if (!form.name || !form.code || !form.credits) return;
        if (editingId !== null) {
            setSubjects(subjects.map(s => s.id === editingId ? { ...s, ...form, credits: parseInt(form.credits) } : s));
            setEditingId(null);
        } else {
            setSubjects([...subjects, { ...form, id: nextId, credits: parseInt(form.credits) }]);
            setNextId(nextId + 1);
        }
        setForm({ name: "", code: "", topics: "", credits: "", branch: filterBranch, sem: filterSem });
    };

    const handleEdit = (s: Subject) => {
        setForm({ name: s.name, code: s.code, topics: s.topics, credits: String(s.credits), branch: s.branch, sem: s.sem });
        setEditingId(s.id);
    };

    const handleDelete = (id: number) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    return (
        <DashboardLayout role="course_coordinator" userName="Dr. Rekha Nambiar">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2"><BookOpen className="h-8 w-8 text-cyan-500" /> Curriculum Manager</h1>
                    <p className="text-muted-foreground mt-1">Upload, manage and visualise the curriculum mapped to industry career roles.</p>
                </div>

                {/* Section A: Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-primary" />
                            {editingId ? "Edit Subject" : "Add New Subject"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Branch</label>
                                <select value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}
                                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Semester</label>
                                <select value={form.sem} onChange={e => setForm({ ...form, sem: e.target.value })}
                                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                    {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Subject Name</label>
                                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Machine Learning"
                                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Subject Code</label>
                                <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="e.g. CS401"
                                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Credits</label>
                                <input type="number" value={form.credits} onChange={e => setForm({ ...form, credits: e.target.value })} placeholder="e.g. 4"
                                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Topics Covered <span className="text-muted-foreground">(comma separated)</span></label>
                            <textarea value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })}
                                rows={2} placeholder="e.g. Supervised Learning, Neural Networks, Clustering"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={handleAdd} disabled={!form.name || !form.code || !form.credits}>
                                <Plus className="mr-2 h-4 w-4" /> {editingId ? "Save Changes" : "Add Subject"}
                            </Button>
                            {editingId && (
                                <Button variant="outline" onClick={() => { setEditingId(null); setForm({ name: "", code: "", topics: "", credits: "", branch: filterBranch, sem: filterSem }); }}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Subject Table with filter */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <CardTitle>Uploaded Subjects</CardTitle>
                            <div className="flex items-center gap-2">
                                <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)}
                                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none">
                                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                <select value={filterSem} onChange={e => setFilterSem(e.target.value)}
                                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none">
                                    {semesters.map(s => <option key={s} value={s}>Sem {s}</option>)}
                                </select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredSubjects.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No subjects added for {filterBranch} · Sem {filterSem} yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead><tr className="border-b text-muted-foreground">
                                        <th className="pb-3 text-left font-medium">Subject</th>
                                        <th className="pb-3 text-left font-medium">Code</th>
                                        <th className="pb-3 text-left font-medium">Topics</th>
                                        <th className="pb-3 text-center font-medium">Credits</th>
                                        <th className="pb-3 text-right font-medium">Actions</th>
                                    </tr></thead>
                                    <tbody className="divide-y">
                                        {filteredSubjects.map(s => (
                                            <tr key={s.id} className="hover:bg-secondary/30 transition-colors">
                                                <td className="py-3 font-medium">{s.name}</td>
                                                <td className="py-3 text-muted-foreground">{s.code}</td>
                                                <td className="py-3 text-muted-foreground text-xs max-w-[200px] truncate">{s.topics}</td>
                                                <td className="py-3 text-center"><Badge variant="info">{s.credits}</Badge></td>
                                                <td className="py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => handleEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-600 hover:border-red-300"><Trash2 className="h-3.5 w-3.5" /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Section B: Career Alignment Matrix */}
                {matrixSubjects.length > 0 && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between flex-wrap gap-3">
                                <div>
                                    <CardTitle>Career Alignment Preview</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">How your curriculum maps to industry career paths.</p>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-800">
                                    <Info className="h-3.5 w-3.5 shrink-0" />
                                    This mapping is used to guide students in career planning.
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-green-500" /> High relevance</div>
                                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-yellow-400" /> Moderate</div>
                                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-gray-300" /> Low</div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="pb-3 pr-4 text-left font-medium text-muted-foreground">Subject</th>
                                            {careerRoles.map(role => (
                                                <th key={role} className="pb-3 px-4 text-center font-medium text-muted-foreground whitespace-nowrap">{role}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {matrixSubjects.map(subject => (
                                            <tr key={subject.id} className="hover:bg-secondary/20 transition-colors">
                                                <td className="py-3 pr-4 font-medium">{subject.name}</td>
                                                {careerRoles.map(role => {
                                                    const rel: Relevance = relevanceMatrix[subject.name]?.[role] ?? "low";
                                                    const isHovered = hoveredCell?.subject === subject.name && hoveredCell?.role === role;
                                                    return (
                                                        <td key={role} className="py-3 px-4 text-center"
                                                            onMouseEnter={() => setHoveredCell({ subject: subject.name, role })}
                                                            onMouseLeave={() => setHoveredCell(null)}
                                                        >
                                                            <div className="relative flex justify-center">
                                                                <div className={`h-4 w-4 rounded-full transition-transform cursor-pointer ${relevanceDot[rel]} ${isHovered ? "scale-150" : ""}`} />
                                                                {isHovered && (
                                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap shadow-lg z-10">
                                                                        {relevanceLabel[rel]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
