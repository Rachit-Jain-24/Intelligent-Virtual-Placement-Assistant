"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    completed: boolean;
}

const initialTasks: Task[] = [
    { id: 1, title: "Update Resume", description: "Optimize resume for ATS", category: "Resume", dueDate: "Week 1", completed: true },
    { id: 2, title: "Complete React Course", description: "Finish advanced React certification", category: "Skills", dueDate: "Week 2", completed: true },
    { id: 3, title: "Build Portfolio Website", description: "Create personal portfolio", category: "Projects", dueDate: "Week 3", completed: true },
    { id: 4, title: "Learn Docker", description: "Complete Docker fundamentals", category: "Skills", dueDate: "Week 4", completed: false },
    { id: 5, title: "Practice DSA", description: "Solve 50 LeetCode problems", category: "Interview Prep", dueDate: "Week 5", completed: false },
    { id: 6, title: "Mock Interviews", description: "Complete 5 mock interviews", category: "Interview Prep", dueDate: "Week 6", completed: false },
    { id: 7, title: "System Design Study", description: "Learn system design patterns", category: "Interview Prep", dueDate: "Week 7", completed: false },
    { id: 8, title: "Apply to Companies", description: "Submit 20 applications", category: "Applications", dueDate: "Week 8", completed: false },
];

export default function RoadmapPage() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const progress = (completedCount / totalCount) * 100;

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Career Roadmap</h1>
                    <p className="text-muted-foreground">Track your placement preparation journey</p>
                </div>

                {/* Overall Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {completedCount} of {totalCount} tasks completed
                            </span>
                            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} />
                    </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tasks.map((task, index) => (
                                <div key={task.id} className="flex gap-4">
                                    {/* Timeline Line */}
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-colors hover:bg-accent"
                                        >
                                            {task.completed ? (
                                                <CheckSquare className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <Square className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </button>
                                        {index < tasks.length - 1 && (
                                            <div className="h-full w-0.5 bg-border" style={{ minHeight: "60px" }} />
                                        )}
                                    </div>

                                    {/* Task Content */}
                                    <div className="flex-1 pb-8">
                                        <div className="rounded-lg border p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h4 className={`font-semibold ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                                                        {task.title}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                                </div>
                                                <Badge variant={task.completed ? "success" : "default"}>
                                                    {task.category}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
