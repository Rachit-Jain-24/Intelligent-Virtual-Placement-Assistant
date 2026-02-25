"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building, Calendar, FileText } from "lucide-react";
import { useState } from "react";

interface Application {
    id: number;
    jobTitle: string;
    company: string;
    appliedDate: string;
    status: "applied" | "screening" | "interview" | "offered" | "rejected";
    notes: string;
}

const initialApplications: Application[] = [
    {
        id: 1,
        jobTitle: "Frontend Developer",
        company: "TechCorp Inc.",
        appliedDate: "2024-01-15",
        status: "interview",
        notes: "Technical interview scheduled for next week",
    },
    {
        id: 2,
        jobTitle: "React Developer",
        company: "StartupXYZ",
        appliedDate: "2024-01-20",
        status: "screening",
        notes: "HR screening completed, waiting for next round",
    },
    {
        id: 3,
        jobTitle: "Full Stack Engineer",
        company: "BigTech Solutions",
        appliedDate: "2024-01-25",
        status: "applied",
        notes: "Application submitted",
    },
    {
        id: 4,
        jobTitle: "Software Engineer",
        company: "InnovateLabs",
        appliedDate: "2024-01-10",
        status: "offered",
        notes: "Offer received! Reviewing compensation package",
    },
    {
        id: 5,
        jobTitle: "Backend Developer",
        company: "CloudSystems",
        appliedDate: "2024-01-05",
        status: "rejected",
        notes: "Position filled with another candidate",
    },
];

const statusColors = {
    applied: "default" as const,
    screening: "info" as const,
    interview: "warning" as const,
    offered: "success" as const,
    rejected: "danger" as const,
};

export default function ApplicationsPage() {
    const [applications, setApplications] = useState(initialApplications);
    const [filter, setFilter] = useState<string>("all");

    const filteredApplications = filter === "all"
        ? applications
        : applications.filter(app => app.status === filter);

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Applications Tracker</h1>
                    <p className="text-muted-foreground">Monitor your job application status</p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{applications.length}</p>
                                <p className="text-sm text-muted-foreground">Total</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{applications.filter(a => a.status === "applied").length}</p>
                                <p className="text-sm text-muted-foreground">Applied</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{applications.filter(a => a.status === "screening").length}</p>
                                <p className="text-sm text-muted-foreground">Screening</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{applications.filter(a => a.status === "interview").length}</p>
                                <p className="text-sm text-muted-foreground">Interview</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{applications.filter(a => a.status === "offered").length}</p>
                                <p className="text-sm text-muted-foreground">Offered</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={filter === "all" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("all")}
                            >
                                All
                            </Button>
                            <Button
                                variant={filter === "applied" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("applied")}
                            >
                                Applied
                            </Button>
                            <Button
                                variant={filter === "screening" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("screening")}
                            >
                                Screening
                            </Button>
                            <Button
                                variant={filter === "interview" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("interview")}
                            >
                                Interview
                            </Button>
                            <Button
                                variant={filter === "offered" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("offered")}
                            >
                                Offered
                            </Button>
                            <Button
                                variant={filter === "rejected" ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setFilter("rejected")}
                            >
                                Rejected
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.map((app) => (
                        <Card key={app.id}>
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h3 className="text-lg font-semibold">{app.jobTitle}</h3>
                                            <Badge variant={statusColors[app.status]}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Building className="h-4 w-4" />
                                                <span>{app.company}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <p className="text-sm">{app.notes}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Update
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
