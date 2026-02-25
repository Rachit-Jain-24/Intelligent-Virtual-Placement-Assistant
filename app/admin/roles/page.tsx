"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UserCheck, Search, Shield, Edit2, Trash2, Plus, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type RoleType = "director" | "dean" | "program_chair" | "faculty_mentor" | "course_coordinator" | "placement_dept" | "admin";

interface RoleUser {
    id: number;
    name: string;
    email: string;
    role: RoleType;
    department: string;
    assignedTo: string;
    active: boolean;
    lastLogin: string;
}

const roleUsers: RoleUser[] = [
    { id: 1, name: "Dr. Rajesh Kumar", email: "r.kumar@nmims.edu.in", role: "director", department: "Administration", assignedTo: "All Programs", active: true, lastLogin: "2h ago" },
    { id: 2, name: "Dr. Sunita Iyer", email: "s.iyer@nmims.edu.in", role: "dean", department: "Engineering", assignedTo: "B.Tech Programs", active: true, lastLogin: "Today" },
    { id: 3, name: "Prof. Anil Menon", email: "a.menon@nmims.edu.in", role: "program_chair", department: "CSE-DS", assignedTo: "B.Tech CSE-DS", active: true, lastLogin: "Yesterday" },
    { id: 4, name: "Prof. Kavitha Rao", email: "k.rao@nmims.edu.in", role: "program_chair", department: "CSE", assignedTo: "B.Tech CSE", active: true, lastLogin: "3d ago" },
    { id: 5, name: "Dr. Vikram Shah", email: "v.shah@nmims.edu.in", role: "faculty_mentor", department: "CSE", assignedTo: "Batch 2022-26 (42 s)", active: true, lastLogin: "2d ago" },
    { id: 6, name: "Ms. Priya Nataraj", email: "p.nataraj@nmims.edu.in", role: "faculty_mentor", department: "CSE-DS", assignedTo: "Batch 2023-27 (38 s)", active: true, lastLogin: "Today" },
    { id: 7, name: "Mr. Ravi Desai", email: "r.desai@nmims.edu.in", role: "placement_dept", department: "Placement Cell", assignedTo: "All Students", active: true, lastLogin: "1h ago" },
    { id: 8, name: "Ms. Anita Singh", email: "a.singh@nmims.edu.in", role: "placement_dept", department: "Placement Cell", assignedTo: "CSE Programs", active: true, lastLogin: "Today" },
    { id: 9, name: "Dr. Mohan Pillai", email: "m.pillai@nmims.edu.in", role: "course_coordinator", department: "CSE", assignedTo: "Data Structures", active: false, lastLogin: "1w ago" },
    { id: 10, name: "System Admin", email: "admin@nmims.edu.in", role: "admin", department: "IT", assignedTo: "System", active: true, lastLogin: "30m ago" },
];

const roleMeta: Record<RoleType, { label: string; color: string; bg: string; permissions: string[] }> = {
    director: { label: "Director", color: "text-gray-700", bg: "bg-gray-100", permissions: ["View All", "Approve", "Full Access"] },
    dean: { label: "Dean", color: "text-purple-700", bg: "bg-purple-100", permissions: ["View Programs", "View Reports", "Manage Faculty"] },
    program_chair: { label: "Program Chair", color: "text-indigo-700", bg: "bg-indigo-100", permissions: ["View Program", "View Students", "Manage Mentors"] },
    faculty_mentor: { label: "Faculty Mentor", color: "text-teal-700", bg: "bg-teal-100", permissions: ["View Assigned Students", "Add Notes", "View Reports"] },
    course_coordinator: { label: "Course Coordinator", color: "text-cyan-700", bg: "bg-cyan-100", permissions: ["View Course Students", "View Skill Gaps"] },
    placement_dept: { label: "Placement Dept.", color: "text-orange-700", bg: "bg-orange-100", permissions: ["View All Students", "Manage JDs", "Download Reports", "Send Notifications"] },
    admin: { label: "Admin", color: "text-red-700", bg: "bg-red-100", permissions: ["Full System Access", "Manage Roles"] },
};

export default function AdminRolesPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"All" | RoleType>("All");

    const filtered = roleUsers.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "All" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    return (
        <DashboardLayout role="admin" userName="Admin">
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <UserCheck className="h-8 w-8 text-primary" /> Role Management
                        </h1>
                        <p className="text-muted-foreground">Manage user roles, permissions & access control</p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add User & Role
                    </Button>
                </div>

                {/* Role Summary Cards */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {(Object.entries(roleMeta) as [RoleType, typeof roleMeta[RoleType]][]).slice(0, 4).map(([role, meta]) => (
                        <Card key={role} className="card-hover cursor-pointer" onClick={() => setRoleFilter(role)}>
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>{meta.label}</span>
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-2xl font-bold">{roleUsers.filter(u => u.role === role).length}</p>
                                <p className="text-xs text-muted-foreground">{roleUsers.filter(u => u.role === role && u.active).length} active</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Permission Overview */}
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Role Permissions Matrix</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {(Object.entries(roleMeta) as [RoleType, typeof roleMeta[RoleType]][]).map(([role, meta]) => (
                                <div key={role} className={`rounded-xl border p-3 ${meta.bg} border-opacity-40`}>
                                    <p className={`text-sm font-bold mb-2 ${meta.color}`}>{meta.label}</p>
                                    <ul className="space-y-1">
                                        {meta.permissions.map(p => (
                                            <li key={p} className="flex items-center gap-1.5 text-xs text-gray-700">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" /> {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Search + Filter */}
                <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text" placeholder="Search by name or email..."
                            value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <button onClick={() => setRoleFilter("All")}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${roleFilter === "All" ? "bg-primary text-white border-primary" : "border-input hover:bg-secondary"}`}>
                        All Roles
                    </button>
                    {(Object.entries(roleMeta) as [RoleType, typeof roleMeta[RoleType]][]).map(([role, meta]) => (
                        <button key={role} onClick={() => setRoleFilter(role)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${roleFilter === role ? `${meta.bg} ${meta.color} border-opacity-40` : "border-input hover:bg-secondary"}`}>
                            {meta.label}
                        </button>
                    ))}
                </div>

                {/* Users Table */}
                <Card>
                    <CardContent className="pt-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground text-xs uppercase">
                                        <th className="pb-3 text-left font-medium">Name</th>
                                        <th className="pb-3 text-left font-medium">Email</th>
                                        <th className="pb-3 text-left font-medium">Role</th>
                                        <th className="pb-3 text-left font-medium">Assigned To</th>
                                        <th className="pb-3 text-center font-medium">Status</th>
                                        <th className="pb-3 text-left font-medium">Last Login</th>
                                        <th className="pb-3 text-center font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filtered.map(u => {
                                        const meta = roleMeta[u.role];
                                        return (
                                            <tr key={u.id} className="hover:bg-secondary/40 transition-colors">
                                                <td className="py-3 pr-4 font-semibold">{u.name}</td>
                                                <td className="py-3 pr-4 text-muted-foreground text-xs">{u.email}</td>
                                                <td className="py-3 pr-4">
                                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${meta.bg} ${meta.color}`}>
                                                        {meta.label}
                                                    </span>
                                                </td>
                                                <td className="py-3 pr-4 text-xs text-muted-foreground">{u.assignedTo}</td>
                                                <td className="py-3 text-center">
                                                    <Badge variant={u.active ? "success" : "default"}>{u.active ? "Active" : "Inactive"}</Badge>
                                                </td>
                                                <td className="py-3 pr-4 text-xs text-muted-foreground">{u.lastLogin}</td>
                                                <td className="py-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <a href={`mailto:${u.email}`} className="text-muted-foreground hover:text-blue-500 transition-colors p-1">
                                                            <Mail className="h-4 w-4" />
                                                        </a>
                                                        <button className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                                                            <Trash2 className="h-4 w-4" />
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
            </div>
        </DashboardLayout>
    );
}
