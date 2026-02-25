"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UserPlus, Trash2 } from "lucide-react";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Faculty" | "Coordinator";
    department: string;
    status: "active" | "inactive";
}

const initialUsers: User[] = [
    { id: 1, name: "Admin User", email: "admin@university.edu", role: "Admin", department: "Administration", status: "active" },
    { id: 2, name: "Dr. Smith", email: "smith@university.edu", role: "Faculty", department: "Computer Science", status: "active" },
    { id: 3, name: "Prof. Johnson", email: "johnson@university.edu", role: "Faculty", department: "Information Technology", status: "active" },
    { id: 4, name: "Placement Coordinator", email: "placement@university.edu", role: "Coordinator", department: "Placement Cell", status: "active" },
];

export default function AdminSettingsPage() {
    const [users, setUsers] = useState(initialUsers);

    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Admin Settings</h1>
                    <p className="text-muted-foreground">Manage system settings and user roles</p>
                </div>

                {/* Role Management */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>User Role Management</CardTitle>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left font-medium">Name</th>
                                        <th className="pb-3 text-left font-medium">Email</th>
                                        <th className="pb-3 text-left font-medium">Role</th>
                                        <th className="pb-3 text-left font-medium">Department</th>
                                        <th className="pb-3 text-left font-medium">Status</th>
                                        <th className="pb-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-3">{user.name}</td>
                                            <td className="py-3 text-sm text-muted-foreground">{user.email}</td>
                                            <td className="py-3">
                                                <Badge variant="info">{user.role}</Badge>
                                            </td>
                                            <td className="py-3 text-sm">{user.department}</td>
                                            <td className="py-3">
                                                <Badge variant={user.status === "active" ? "success" : "default"}>
                                                    {user.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* System Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>System Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Send automated email notifications to students</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">AI Predictions</p>
                                <p className="text-sm text-muted-foreground">Enable AI-powered placement predictions</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Auto-generate Reports</p>
                                <p className="text-sm text-muted-foreground">Automatically generate weekly reports</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Student Profile Visibility</p>
                                <p className="text-sm text-muted-foreground">Allow recruiters to view student profiles</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>

                {/* Data Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="mb-2 font-semibold">Database Backup</h4>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Last backup: February 3, 2024 at 2:00 AM
                            </p>
                            <Button variant="outline">Create Backup Now</Button>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="mb-2 font-semibold">Data Export</h4>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Export all student data for archival purposes
                            </p>
                            <Button variant="outline">Export All Data</Button>
                        </div>
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                            <h4 className="mb-2 font-semibold text-red-900 dark:text-red-100">Danger Zone</h4>
                            <p className="mb-4 text-sm text-red-700 dark:text-red-300">
                                Permanently delete all student data. This action cannot be undone.
                            </p>
                            <Button variant="outline">Clear All Data</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
