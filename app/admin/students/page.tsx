"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Download } from "lucide-react";
import { useState } from "react";

interface Student {
    id: number;
    name: string;
    email: string;
    department: string;
    readiness: number;
    probability: number;
    risk: "low" | "medium" | "high";
}

const students: Student[] = [
    { id: 1, name: "Rachit Sharma", email: "rachit@university.edu", department: "Computer Science", readiness: 78, probability: 82, risk: "low" },
    { id: 2, name: "Jane Smith", email: "jane@university.edu", department: "Information Technology", readiness: 72, probability: 75, risk: "low" },
    { id: 3, name: "Rachit Verma", email: "rachit.verma@university.edu", department: "Computer Science", readiness: 45, probability: 38, risk: "high" },
    { id: 4, name: "Rachit Patel", email: "rachit.patel@university.edu", department: "Electronics", readiness: 65, probability: 68, risk: "medium" },
    { id: 5, name: "Rachit Kumar", email: "rachit.kumar@university.edu", department: "Mechanical", readiness: 58, probability: 55, risk: "medium" },
];

export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDept, setFilterDept] = useState("all");

    const filteredStudents = students.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = filterDept === "all" || student.department === filterDept;
        return matchesSearch && matchesDept;
    });

    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Students Management</h1>
                        <p className="text-muted-foreground">View and manage student profiles</p>
                    </div>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search students..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <select
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="all">All Departments</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Student List ({filteredStudents.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left font-medium">Name</th>
                                        <th className="pb-3 text-left font-medium">Email</th>
                                        <th className="pb-3 text-left font-medium">Department</th>
                                        <th className="pb-3 text-left font-medium">Readiness</th>
                                        <th className="pb-3 text-left font-medium">Probability</th>
                                        <th className="pb-3 text-left font-medium">Risk</th>
                                        <th className="pb-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="border-b">
                                            <td className="py-3">{student.name}</td>
                                            <td className="py-3 text-sm text-muted-foreground">{student.email}</td>
                                            <td className="py-3 text-sm">{student.department}</td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={
                                                        student.readiness >= 70
                                                            ? "success"
                                                            : student.readiness >= 60
                                                                ? "warning"
                                                                : "danger"
                                                    }
                                                >
                                                    {student.readiness}%
                                                </Badge>
                                            </td>
                                            <td className="py-3">{student.probability}%</td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={
                                                        student.risk === "low"
                                                            ? "success"
                                                            : student.risk === "medium"
                                                                ? "warning"
                                                                : "danger"
                                                    }
                                                >
                                                    {student.risk}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
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
