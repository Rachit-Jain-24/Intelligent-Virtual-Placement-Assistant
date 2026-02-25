"use client";

import { Bell, Search, User, ChevronDown, GraduationCap } from "lucide-react";
import { UserRole } from "./Sidebar";
import { useState } from "react";

interface NavbarProps {
    userName: string;
    role: UserRole;
    userYear?: string;
    userProgram?: string;
}

const roleLabel: Record<UserRole, string> = {
    student: "Student",
    admin: "Admin",
    dean: "Dean",
    director: "Director",
    program_chair: "Program Chair",
    faculty_mentor: "Faculty Mentor",
    course_coordinator: "Course Coordinator",
    placement_dept: "Placement Dept.",
    alumni: "Alumni",
};

export function Navbar({ userName, role, userYear, userProgram }: NavbarProps) {
    const [notifOpen, setNotifOpen] = useState(false);

    const notifications = [
        { id: 1, msg: "AI Mentor has a new tip for you!", time: "2m ago", type: "info" },
        { id: 2, msg: "Your LeetCode streak is at 7 days 🔥", time: "1h ago", type: "success" },
        { id: 3, msg: "Skill gap detected: Docker", time: "3h ago", type: "warning" },
    ];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card/90 backdrop-blur-md px-6">
            {/* Search */}
            <div className="flex-1">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search anything..."
                        className="h-9 w-full rounded-lg border border-input bg-secondary/60 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all"
                    />
                </div>
            </div>

            {/* Year & Program badge (student only) */}
            {role === "student" && userYear && (
                <div className="hidden md:flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{userYear}</span>
                    {userProgram && <span className="text-xs text-muted-foreground">• {userProgram}</span>}
                </div>
            )}

            {/* Notifications */}
            <div className="relative">
                <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative rounded-full p-2 hover:bg-secondary transition-colors"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                </button>

                {notifOpen && (
                    <div className="absolute right-0 top-12 w-80 rounded-xl border bg-card shadow-xl z-50 overflow-hidden">
                        <div className="border-b px-4 py-3">
                            <h4 className="font-semibold text-sm">Notifications</h4>
                        </div>
                        <div className="divide-y">
                            {notifications.map((n) => (
                                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.type === "info" ? "bg-blue-500" :
                                            n.type === "success" ? "bg-green-500" : "bg-yellow-500"
                                        }`} />
                                    <div>
                                        <p className="text-sm">{n.msg}</p>
                                        <p className="text-xs text-muted-foreground">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t px-4 py-2">
                            <button className="text-xs text-primary hover:underline">View all notifications</button>
                        </div>
                    </div>
                )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3 rounded-xl border bg-secondary/50 px-3 py-1.5 cursor-pointer hover:bg-secondary transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-white text-sm font-bold">
                    {userName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold leading-none">{userName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{roleLabel[role]}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
        </header>
    );
}
