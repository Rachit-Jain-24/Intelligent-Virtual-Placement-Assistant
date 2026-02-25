"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Download } from "lucide-react";
import { useState } from "react";

const reportTypes = [
    {
        id: 1,
        name: "Student Readiness Report",
        description: "Comprehensive readiness scores for all students",
        format: ["PDF", "Excel"],
    },
    {
        id: 2,
        name: "Skill Gap Analysis",
        description: "Detailed skill gap analysis by department",
        format: ["PDF", "Excel"],
    },
    {
        id: 3,
        name: "Placement Predictions",
        description: "AI-powered placement probability predictions",
        format: ["PDF", "Excel"],
    },
    {
        id: 4,
        name: "Department Performance",
        description: "Comparative performance across departments",
        format: ["PDF", "Excel"],
    },
    {
        id: 5,
        name: "At-Risk Students",
        description: "List of students requiring intervention",
        format: ["PDF", "Excel"],
    },
];

export default function ReportsPage() {
    const [generating, setGenerating] = useState<number | null>(null);

    const handleGenerate = (id: number, format: string) => {
        setGenerating(id);
        setTimeout(() => {
            alert(`${format} report generated successfully!`);
            setGenerating(null);
        }, 2000);
    };

    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">Generate and download comprehensive reports</p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">127</p>
                                <p className="text-sm text-muted-foreground">Reports Generated This Month</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">5</p>
                                <p className="text-sm text-muted-foreground">Report Templates Available</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">2.4 MB</p>
                                <p className="text-sm text-muted-foreground">Average Report Size</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Templates */}
                <div className="space-y-4">
                    {reportTypes.map((report) => (
                        <Card key={report.id}>
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-1 text-lg font-semibold">{report.name}</h3>
                                            <p className="text-sm text-muted-foreground">{report.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {report.format.map((format) => (
                                            <Button
                                                key={format}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleGenerate(report.id, format)}
                                                disabled={generating === report.id}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                {generating === report.id ? "Generating..." : format}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Custom Report */}
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Report Builder</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Report Name</label>
                            <input
                                type="text"
                                placeholder="Enter report name"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Select Data</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4" />
                                    <span className="text-sm">Student Readiness Scores</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4" />
                                    <span className="text-sm">Skill Distribution</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4" />
                                    <span className="text-sm">Placement Predictions</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4" />
                                    <span className="text-sm">Department Analytics</span>
                                </label>
                            </div>
                        </div>
                        <Button>Generate Custom Report</Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
