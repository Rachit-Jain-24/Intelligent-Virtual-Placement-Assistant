"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useState } from "react";
import {
    Users, CheckCircle2, AlertTriangle, Trophy, StickyNote, X, Flag
} from "lucide-react";

interface Mentee {
    id: number;
    name: string;
    year: string;
    goal: string;
    readiness: number;
    lastActivity: string;
}

const mentees: Mentee[] = [
    { id: 1, name: "Rachit Jain", year: "3rd Year", goal: "Data Scientist", readiness: 82, lastActivity: "2 days ago" },
    { id: 2, name: "Priya Sharma", year: "2nd Year", goal: "Full Stack Developer", readiness: 65, lastActivity: "Today" },
    { id: 3, name: "Arjun Mehta", year: "3rd Year", goal: "ML Engineer", readiness: 74, lastActivity: "1 week ago" },
    { id: 4, name: "Sneha Verma", year: "4th Year", goal: "Software Engineer", readiness: 91, lastActivity: "Yesterday" },
    { id: 5, name: "Karan Gupta", year: "2nd Year", goal: "Cloud Architect", readiness: 42, lastActivity: "2 weeks ago" },
    { id: 6, name: "Divya Nair", year: "3rd Year", goal: "Cybersecurity Engineer", readiness: 58, lastActivity: "3 days ago" },
    { id: 7, name: "Rohit Patel", year: "1st Year", goal: "Undecided", readiness: 30, lastActivity: "5 days ago" },
    { id: 8, name: "Anita Reddy", year: "4th Year", goal: "Data Scientist", readiness: 88, lastActivity: "Today" },
    { id: 9, name: "Vikram Singh", year: "2nd Year", goal: "DevOps Engineer", readiness: 55, lastActivity: "1 week ago" },
    { id: 10, name: "Pooja Iyer", year: "3rd Year", goal: "Product Manager", readiness: 69, lastActivity: "Yesterday" },
    { id: 11, name: "Aditya Kumar", year: "1st Year", goal: "Undecided", readiness: 25, lastActivity: "3 weeks ago" },
    { id: 12, name: "Lakshmi Rao", year: "4th Year", goal: "Software Engineer", readiness: 95, lastActivity: "Today" },
];

export default function FacultyMentorDashboard() {
    const [atRisk, setAtRisk] = useState<number[]>([]);
    const [noteModal, setNoteModal] = useState<Mentee | null>(null);
    const [notes, setNotes] = useState<Record<number, string>>({});
    const [tempNote, setTempNote] = useState("");
    const [savedNotes, setSavedNotes] = useState<Record<number, string>>({});

    const toggleAtRisk = (id: number) => {
        setAtRisk(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    };

    const openNoteModal = (m: Mentee) => {
        setNoteModal(m);
        setTempNote(notes[m.id] || "");
    };

    const saveNote = () => {
        if (noteModal) {
            setSavedNotes(prev => ({ ...prev, [noteModal.id]: tempNote }));
            setNotes(prev => ({ ...prev, [noteModal.id]: tempNote }));
            setNoteModal(null);
        }
    };

    const readinessColor = (r: number) => r >= 80 ? "text-green-600" : r >= 60 ? "text-yellow-600" : "text-red-600";

    const stats = [
        { label: "Total Mentees", value: 12, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "On Track", value: 8, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        { label: "Needs Attention", value: 3, icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
        { label: "Placement Ready", value: 1, icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <DashboardLayout role="faculty_mentor" userName="Prof. Anand Sharma">
            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-2xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-transparent border border-teal-500/20 p-6">
                    <h1 className="text-3xl font-bold">Welcome, Prof. Anand Sharma 👨‍🏫</h1>
                    <p className="text-muted-foreground mt-1">Your Mentees Overview — {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map(stat => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label} className="card-hover">
                                <CardContent className="pt-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                            <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`rounded-xl p-3 ${stat.bg}`}>
                                            <Icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Mentees Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-teal-500" /> My Mentees
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground">
                                        <th className="pb-3 text-left font-medium">Name</th>
                                        <th className="pb-3 text-left font-medium">Year</th>
                                        <th className="pb-3 text-left font-medium">Career Goal</th>
                                        <th className="pb-3 text-left font-medium">Readiness</th>
                                        <th className="pb-3 text-left font-medium">Last Activity</th>
                                        <th className="pb-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {mentees.map(mentee => {
                                        const isAtRisk = atRisk.includes(mentee.id);
                                        return (
                                            <tr
                                                key={mentee.id}
                                                className={`transition-colors ${isAtRisk ? "bg-red-50 dark:bg-red-950/20" : "hover:bg-secondary/30"}`}
                                            >
                                                <td className="py-3 font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {mentee.name}
                                                        {savedNotes[mentee.id] && (
                                                            <span title="Has mentor note">
                                                                <StickyNote className="h-3.5 w-3.5 text-primary" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">{mentee.year}</td>
                                                <td className="py-3">
                                                    <Badge variant={mentee.goal === "Undecided" ? "warning" : "info"}>{mentee.goal}</Badge>
                                                </td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={mentee.readiness} className="w-20" />
                                                        <span className={`font-semibold ${readinessColor(mentee.readiness)}`}>{mentee.readiness}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-muted-foreground">{mentee.lastActivity}</td>
                                                <td className="py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => openNoteModal(mentee)}>
                                                            <StickyNote className="h-3.5 w-3.5 mr-1" /> Add Note
                                                        </Button>
                                                        <button
                                                            onClick={() => toggleAtRisk(mentee.id)}
                                                            title={isAtRisk ? "Remove At-Risk flag" : "Flag as At-Risk"}
                                                            className={`rounded-lg p-1.5 transition-colors ${isAtRisk ? "bg-red-100 text-red-600 hover:bg-red-200" : "text-muted-foreground hover:bg-secondary hover:text-red-500"}`}
                                                        >
                                                            <Flag className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Note Modal */}
                {noteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <Card className="w-full max-w-md shadow-2xl">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">
                                        <StickyNote className="inline h-4 w-4 mr-2 text-primary" />
                                        Mentor Note — {noteModal.name}
                                    </CardTitle>
                                    <button onClick={() => setNoteModal(null)} className="rounded-lg p-1 hover:bg-secondary">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-xs text-muted-foreground">This note is private and only visible to you.</p>
                                <textarea
                                    value={tempNote}
                                    onChange={e => setTempNote(e.target.value)}
                                    placeholder="Write your observations, action items, or follow-up notes here..."
                                    rows={5}
                                    className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                />
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1" onClick={() => setNoteModal(null)}>Cancel</Button>
                                    <Button className="flex-1" onClick={saveNote}>Save Note</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
