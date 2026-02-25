"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { GitBranch, ChevronDown, ChevronUp, Lightbulb, BookOpen } from "lucide-react";
import Link from "next/link";

type Relevance = "Core" | "Supporting" | "General";

interface Subject {
    name: string;
    code: string;
    relevance: Relevance;
    explanation: string;
    extra?: string;
}

interface Semester {
    sem: number;
    subjects: Subject[];
}

const careerGoal = "Data Scientist";

const semesterData: Semester[] = [
    {
        sem: 1,
        subjects: [
            { name: "Mathematics I", code: "MA101", relevance: "Core", explanation: "Calculus & linear algebra form the backbone of all ML algorithms." },
            { name: "Programming Fundamentals (C)", code: "CS101", relevance: "Core", explanation: "Core logic building — everything in data science is built on programming fundamentals." },
            { name: "Engineering Physics", code: "PH101", relevance: "General", explanation: "Foundational science course, less directly applicable to data science.", extra: "Supplement with Python basics online to get a head start." },
            { name: "Communication Skills", code: "HS101", relevance: "Supporting", explanation: "Data scientists present insights to stakeholders — communication is crucial." },
        ],
    },
    {
        sem: 2,
        subjects: [
            { name: "Mathematics II", code: "MA102", relevance: "Core", explanation: "Probability & statistics are used daily in model evaluation and hypothesis testing." },
            { name: "Data Structures", code: "CS102", relevance: "Core", explanation: "Efficient data structures power large-scale data processing pipelines." },
            { name: "Object Oriented Programming", code: "CS103", relevance: "Supporting", explanation: "OOP concepts help when building reusable ML pipeline components." },
            { name: "Digital Electronics", code: "EC101", relevance: "General", explanation: "Low direct relevance to data science.", extra: "Start learning Pandas & NumPy to build practical skills early." },
        ],
    },
    {
        sem: 3,
        subjects: [
            { name: "Database Management Systems", code: "CS201", relevance: "Core", explanation: "SQL & database design are used daily for querying and storing data in data roles." },
            { name: "Statistics & Probability", code: "MA201", relevance: "Core", explanation: "The language of data science — all ML models rely on statistical foundations." },
            { name: "Computer Organisation", code: "CS202", relevance: "General", explanation: "Basic understanding of systems helps with performance optimisation.", extra: "Take a Kaggle beginner course to start building data intuition." },
            { name: "Discrete Mathematics", code: "MA202", relevance: "Supporting", explanation: "Graph theory and combinatorics appear in recommendation systems and graph ML." },
        ],
    },
    {
        sem: 4,
        subjects: [
            { name: "Machine Learning", code: "CS301", relevance: "Core", explanation: "This IS the core of your career — supervised, unsupervised, deep learning foundations." },
            { name: "Python for Data Science", code: "CS302", relevance: "Core", explanation: "Python is the primary language of all data science and ML work." },
            { name: "Linear Algebra", code: "MA301", relevance: "Core", explanation: "Matrix operations underpin neural networks, PCA, and all deep learning frameworks." },
            { name: "Software Engineering", code: "CS303", relevance: "Supporting", explanation: "Knowing how to build maintainable code helps when deploying ML pipelines." },
        ],
    },
    {
        sem: 5,
        subjects: [
            { name: "Deep Learning", code: "CS401", relevance: "Core", explanation: "Neural networks, CNNs, RNNs — the foundation of modern AI and advanced data science." },
            { name: "Big Data Analytics", code: "CS402", relevance: "Core", explanation: "Spark, Hadoop — essential for working with enterprise-scale datasets." },
            { name: "Natural Language Processing", code: "CS403", relevance: "Core", explanation: "Text data is everywhere — NLP is one of the hottest areas in data science." },
            { name: "Computer Networks", code: "CS404", relevance: "General", explanation: "Less directly relevant, but helpful for cloud data pipeline architectures.", extra: "Explore data engineering concepts like Kafka and Airflow alongside this." },
        ],
    },
];

const relevanceBadgeVariant: Record<Relevance, "success" | "info" | "default"> = {
    Core: "success",
    Supporting: "info",
    General: "default",
};

const relevanceColor: Record<Relevance, string> = {
    Core: "bg-green-50 border-green-200",
    Supporting: "bg-blue-50 border-blue-200",
    General: "bg-gray-50 border-gray-200",
};

export default function CurriculumMapPage() {
    const [openSems, setOpenSems] = useState<number[]>([1]);

    const toggleSem = (sem: number) => {
        setOpenSems(prev =>
            prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
        );
    };

    const coreCounts = semesterData.map(s => s.subjects.filter(sub => sub.relevance === "Core").length);

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">
                {/* Header */}
                <div className="rounded-2xl bg-gradient-to-r from-primary/15 via-purple-500/10 to-transparent border border-primary/20 p-6">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <GitBranch className="h-6 w-6 text-primary" />
                                <h1 className="text-3xl font-bold">How Your Subjects Connect to Your Career</h1>
                            </div>
                            <p className="text-muted-foreground">See exactly why you&apos;re studying what you&apos;re studying</p>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                <span className="text-sm text-muted-foreground">Your Goal:</span>
                                <Badge variant="success" className="text-sm px-3 py-1">🎯 {careerGoal}</Badge>
                                <Link href="/student/role-discovery">
                                    <Button size="sm" variant="outline">Change Goal →</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-6 flex-wrap text-sm">
                            <span className="font-medium text-muted-foreground">Relevance to {careerGoal}:</span>
                            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green-500" /> <span>Core — used almost daily</span></div>
                            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-400" /> <span>Supporting — important context</span></div>
                            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-gray-400" /> <span>General — foundational education</span></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Semester Accordions */}
                <div className="space-y-3">
                    {semesterData.map((semester, semIdx) => {
                        const isOpen = openSems.includes(semester.sem);
                        const coreCount = coreCounts[semIdx];
                        return (
                            <Card key={semester.sem} className="overflow-hidden">
                                <button
                                    onClick={() => toggleSem(semester.sem)}
                                    className="w-full text-left"
                                >
                                    <CardHeader className="py-4 hover:bg-secondary/30 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                                                    S{semester.sem}
                                                </div>
                                                <CardTitle className="text-base">Semester {semester.sem}</CardTitle>
                                                <Badge variant={coreCount >= 3 ? "success" : coreCount >= 2 ? "info" : "default"} className="text-xs">
                                                    {coreCount} Core subjects
                                                </Badge>
                                            </div>
                                            {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                                        </div>
                                    </CardHeader>
                                </button>
                                {isOpen && (
                                    <CardContent className="pt-0 space-y-3">
                                        {semester.subjects.map(subject => (
                                            <div
                                                key={subject.code}
                                                className={`rounded-xl border p-4 space-y-2 ${relevanceColor[subject.relevance]}`}
                                            >
                                                <div className="flex items-start justify-between gap-2 flex-wrap">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                                                        <div>
                                                            <span className="font-semibold text-sm">{subject.name}</span>
                                                            <span className="text-xs text-muted-foreground ml-2">({subject.code})</span>
                                                        </div>
                                                    </div>
                                                    <Badge variant={relevanceBadgeVariant[subject.relevance]}>{subject.relevance}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground pl-6">
                                                    <span className="font-medium text-foreground">{subject.name}</span> → {subject.explanation}
                                                </p>
                                                {subject.extra && (
                                                    <div className="flex items-start gap-2 rounded-lg bg-yellow-50 border border-yellow-200 p-2 pl-6">
                                                        <Lightbulb className="h-3.5 w-3.5 text-yellow-600 shrink-0 mt-0.5" />
                                                        <p className="text-xs text-yellow-800">
                                                            <span className="font-semibold">What to do extra:</span> {subject.extra}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </CardContent>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
                    <CardContent className="pt-5">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <p className="font-semibold">Ready to build your preparation plan?</p>
                                <p className="text-sm text-muted-foreground">Use your 4-Year Roadmap to see semester-aligned tasks →</p>
                            </div>
                            <Link href="/student/roadmap-4year">
                                <Button>View 4-Year Roadmap →</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
