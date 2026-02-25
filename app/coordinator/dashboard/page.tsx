"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookOpen, GitBranch, LayoutGrid, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Subjects Uploaded", value: 24, icon: BookOpen, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Branches Covered", value: 3, icon: GitBranch, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Career Roles Mapped", value: 6, icon: LayoutGrid, color: "text-purple-600", bg: "bg-purple-50" },
];

const recentActivity = [
    { action: "Added subject", subject: "Machine Learning", branch: "CSE", sem: "Sem 5", time: "2 hours ago", color: "bg-purple-500" },
    { action: "Updated topics", subject: "Big Data Analytics", branch: "CSE", sem: "Sem 5", time: "Yesterday", color: "bg-blue-500" },
    { action: "Added subject", subject: "Natural Language Processing", branch: "CSE", sem: "Sem 5", time: "2 days ago", color: "bg-green-500" },
    { action: "Added subject", subject: "Cloud Computing", branch: "IT", sem: "Sem 6", time: "3 days ago", color: "bg-yellow-500" },
    { action: "Mapped career alignment", subject: "Deep Learning → AI/ML, Data Science", branch: "CSE", sem: "Sem 6", time: "5 days ago", color: "bg-pink-500" },
];

const quickActions = [
    {
        title: "Manage Curriculum",
        description: "Add, edit or delete subjects and topics across branches and semesters.",
        href: "/coordinator/curriculum",
        icon: BookOpen,
        gradient: "from-cyan-500/20 to-blue-500/10",
        border: "border-cyan-500/30",
    },
    {
        title: "View Career Alignment Matrix",
        description: "See how your curriculum maps to industry career paths in real time.",
        href: "/coordinator/alignment",
        icon: LayoutGrid,
        gradient: "from-purple-500/20 to-pink-500/10",
        border: "border-purple-500/30",
    },
];

export default function CoordinatorDashboard() {
    return (
        <DashboardLayout role="course_coordinator" userName="Dr. Rekha Nambiar">
            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-transparent border border-cyan-500/20 p-6">
                    <h1 className="text-3xl font-bold">Welcome, Dr. Rekha Nambiar 📚</h1>
                    <p className="text-muted-foreground mt-1">Curriculum Management Center</p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
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

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2">
                    {quickActions.map(action => {
                        const Icon = action.icon;
                        return (
                            <Link key={action.title} href={action.href}>
                                <Card className={`h-full card-hover cursor-pointer bg-gradient-to-br ${action.gradient} border ${action.border}`}>
                                    <CardContent className="pt-6 space-y-3 flex flex-col h-full">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-background p-2.5 shadow-sm border">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <h3 className="font-bold text-lg">{action.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground flex-1">{action.description}</p>
                                        <div className="flex items-center text-primary text-sm font-medium">
                                            Open <ChevronRight className="h-4 w-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-cyan-500" /> Recent Activity
                            </CardTitle>
                            <Link href="/coordinator/curriculum">
                                <Button variant="outline" size="sm">View All <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentActivity.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-xl border p-3 hover:bg-secondary/30 transition-colors">
                                <div className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs text-muted-foreground font-medium uppercase">{item.action}</span>
                                        <Badge variant="info" className="text-xs">{item.branch} · {item.sem}</Badge>
                                    </div>
                                    <p className="text-sm font-medium mt-0.5 truncate">{item.subject}</p>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
