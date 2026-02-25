"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { useState } from "react";
import {
    Globe, Database, Brain, Shield, Cpu, Cloud, Smartphone, Gamepad2,
    CheckCircle2, ChevronRight, ChevronLeft, Compass, Star, Target
} from "lucide-react";
import Link from "next/link";

const interests = [
    { id: "web", label: "Web Development", icon: Globe, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "data", label: "Data Science", icon: Database, color: "text-green-500", bg: "bg-green-50" },
    { id: "ai", label: "AI / ML", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
    { id: "security", label: "Cybersecurity", icon: Shield, color: "text-red-500", bg: "bg-red-50" },
    { id: "embedded", label: "Embedded Systems", icon: Cpu, color: "text-yellow-600", bg: "bg-yellow-50" },
    { id: "cloud", label: "Cloud & DevOps", icon: Cloud, color: "text-sky-500", bg: "bg-sky-50" },
    { id: "mobile", label: "Mobile Development", icon: Smartphone, color: "text-pink-500", bg: "bg-pink-50" },
    { id: "game", label: "Game Development", icon: Gamepad2, color: "text-orange-500", bg: "bg-orange-50" },
];

const personalityQuestions = [
    {
        id: "q1", question: "Do you prefer building things visually or solving logical puzzles?",
        options: [
            { value: "visual", label: "🎨 Building visual interfaces & designs" },
            { value: "logical", label: "🧩 Solving logical & algorithmic puzzles" },
        ],
    },
    {
        id: "q2", question: "Do you like working with data & numbers or creating user experiences?",
        options: [
            { value: "data", label: "📊 Analysing data, finding patterns & insights" },
            { value: "ux", label: "✨ Crafting smooth & beautiful user experiences" },
        ],
    },
    {
        id: "q3", question: "How do you like to approach problems?",
        options: [
            { value: "systematic", label: "🔬 Systematically, step by step" },
            { value: "creative", label: "💡 Creatively, exploring different angles" },
        ],
    },
    {
        id: "q4", question: "What excites you more?",
        options: [
            { value: "scale", label: "⚙️ Making systems work at massive scale" },
            { value: "impact", label: "🌍 Products that directly impact people's lives" },
        ],
    },
    {
        id: "q5", question: "How do you feel about maths & statistics?",
        options: [
            { value: "love", label: "🤓 I love it — logic and numbers are my thing" },
            { value: "okay", label: "😊 It's okay, but I prefer practical building" },
        ],
    },
];

const branches = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const cgpaRanges = ["9.0 - 10.0", "8.0 - 8.9", "7.0 - 7.9", "6.0 - 6.9", "Below 6.0"];

const careerResultsMap: Record<string, { role: string; match: number; description: string; subjects: string[] }[]> = {
    default: [
        {
            role: "Data Scientist",
            match: 92,
            description: "You'll build ML models, analyse large datasets and derive insights that drive business decisions.",
            subjects: ["Statistics", "Machine Learning", "DBMS", "Python Programming"],
        },
        {
            role: "Full Stack Developer",
            match: 85,
            description: "You'll build end-to-end web applications, from beautiful frontends to robust backend APIs.",
            subjects: ["Web Technologies", "Database Management", "OS", "Software Engineering"],
        },
        {
            role: "Software Engineer",
            match: 78,
            description: "You'll design and build scalable software systems, solve complex engineering problems and ship products.",
            subjects: ["DSA", "OOP", "Computer Networks", "System Design"],
        },
    ],
    ai: [
        {
            role: "ML Engineer",
            match: 94,
            description: "You'll design, train and deploy machine learning models that power intelligent applications.",
            subjects: ["Machine Learning", "Deep Learning", "Linear Algebra", "Python Programming"],
        },
        {
            role: "Data Scientist",
            match: 88,
            description: "You'll work with large datasets, build predictive models and communicate insights to stakeholders.",
            subjects: ["Statistics", "Machine Learning", "DBMS", "Data Visualisation"],
        },
        {
            role: "AI Research Engineer",
            match: 81,
            description: "You'll push the boundaries of AI by researching novel architectures and publishing your work.",
            subjects: ["Deep Learning", "Advanced Mathematics", "Research Methodology", "NLP"],
        },
    ],
};

export default function RoleDiscoveryPage() {
    const [step, setStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [background, setBackground] = useState({ branch: "", year: "", cgpa: "", coding: "" });
    const [goalSet, setGoalSet] = useState<string | null>(null);

    const totalSteps = 4;
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    const toggleInterest = (id: string) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(selectedInterests.filter(i => i !== id));
        } else if (selectedInterests.length < 3) {
            setSelectedInterests([...selectedInterests, id]);
        }
    };

    const results = selectedInterests.includes("ai")
        ? careerResultsMap["ai"]
        : careerResultsMap["default"];

    const canProceedStep1 = selectedInterests.length > 0;
    const canProceedStep2 = Object.keys(answers).length === personalityQuestions.length;
    const canProceedStep3 = background.branch && background.year && background.cgpa && background.coding;

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        <Compass className="h-4 w-4" /> Career Discovery
                    </div>
                    <h1 className="text-3xl font-bold">Find Your Path 🎯</h1>
                    <p className="text-muted-foreground">
                        A 2-minute quiz to match you with the best career direction based on your personality and interests.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Step {step} of {totalSteps}</span>
                        <span className="font-medium text-primary">{Math.round(progress)}% complete</span>
                    </div>
                    <Progress value={progress} />
                    <div className="grid grid-cols-4 text-xs text-center text-muted-foreground mt-1">
                        {["Interests", "Personality", "Background", "Results"].map((label, i) => (
                            <span key={label} className={step === i + 1 ? "text-primary font-semibold" : ""}>{label}</span>
                        ))}
                    </div>
                </div>

                {/* Step 1: Interests */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">🌟 What interests you?</CardTitle>
                            <p className="text-sm text-muted-foreground">Select up to 3 areas that excite you the most. Don't overthink it!</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                {interests.map(interest => {
                                    const Icon = interest.icon;
                                    const selected = selectedInterests.includes(interest.id);
                                    const disabled = !selected && selectedInterests.length === 3;
                                    return (
                                        <button
                                            key={interest.id}
                                            onClick={() => toggleInterest(interest.id)}
                                            disabled={disabled}
                                            className={`relative rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${selected
                                                ? "border-primary bg-primary/5 shadow-sm"
                                                : disabled
                                                    ? "border-border opacity-40 cursor-not-allowed"
                                                    : "border-border hover:border-primary/40"
                                                }`}
                                        >
                                            {selected && (
                                                <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
                                            )}
                                            <div className={`inline-flex rounded-lg p-2 mb-2 ${interest.bg}`}>
                                                <Icon className={`h-5 w-5 ${interest.color}`} />
                                            </div>
                                            <p className="font-medium text-sm">{interest.label}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedInterests.length === 3 && (
                                <p className="text-xs text-muted-foreground text-center">✓ Maximum 3 selected. Deselect one to change.</p>
                            )}
                            <Button
                                className="w-full"
                                disabled={!canProceedStep1}
                                onClick={() => setStep(2)}
                            >
                                Continue <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Personality */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">🧠 How do you like to work?</CardTitle>
                            <p className="text-sm text-muted-foreground">There are no right or wrong answers — just pick what feels more like you.</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {personalityQuestions.map((q, idx) => (
                                <div key={q.id} className="space-y-2">
                                    <p className="text-sm font-medium">{idx + 1}. {q.question}</p>
                                    <div className="grid gap-2">
                                        {q.options.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => setAnswers({ ...answers, [q.id]: option.value })}
                                                className={`rounded-lg border p-3 text-left text-sm transition-all ${answers[q.id] === option.value
                                                    ? "border-primary bg-primary/5 font-medium text-primary"
                                                    : "border-border hover:border-primary/30 hover:bg-secondary/50"
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                <Button className="flex-1" disabled={!canProceedStep2} onClick={() => setStep(3)}>
                                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Background */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">📚 Your Academic Background</CardTitle>
                            <p className="text-sm text-muted-foreground">This helps us tailor the roadmap to exactly where you are right now.</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "Branch / Stream", key: "branch", options: branches, placeholder: "Select your branch" },
                                { label: "Current Year", key: "year", options: years, placeholder: "Select year" },
                                { label: "CGPA Range", key: "cgpa", options: cgpaRanges, placeholder: "Select CGPA range" },
                            ].map(field => (
                                <div key={field.key} className="space-y-1.5">
                                    <label className="text-sm font-medium">{field.label}</label>
                                    <select
                                        value={(background as Record<string, string>)[field.key]}
                                        onChange={e => setBackground({ ...background, [field.key]: e.target.value })}
                                        className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">{field.placeholder}</option>
                                        {field.options.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Prior Coding Experience?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["Yes", "No"].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => setBackground({ ...background, coding: option })}
                                            className={`rounded-lg border p-3 text-sm font-medium transition-all ${background.coding === option
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border hover:border-primary/30"
                                                }`}
                                        >
                                            {option === "Yes" ? "✅ Yes, I have some experience" : "🌱 No, I'm starting fresh"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                <Button className="flex-1" disabled={!canProceedStep3} onClick={() => setStep(4)}>
                                    Get My Results <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 4: Results */}
                {step === 4 && (
                    <div className="space-y-4">
                        {goalSet ? (
                            <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 p-6 text-center space-y-3">
                                <div className="text-4xl">🎉</div>
                                <h2 className="text-2xl font-bold">Goal Set Successfully!</h2>
                                <p className="text-muted-foreground">
                                    Your career goal is now set to <span className="text-primary font-semibold">{goalSet}</span>. Your roadmap and curriculum map are now personalised!
                                </p>
                                <div className="flex gap-3 justify-center flex-wrap">
                                    <Link href="/student/roadmap-4year">
                                        <Button>View My Roadmap →</Button>
                                    </Link>
                                    <Link href="/student/curriculum-map">
                                        <Button variant="outline">Explore Curriculum Map</Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="text-center space-y-1">
                                    <h2 className="text-2xl font-bold">🎯 Your Top Career Matches</h2>
                                    <p className="text-sm text-muted-foreground">Based on your interests and personality, here are your best-fit roles.</p>
                                </div>
                                {results.map((result, idx) => (
                                    <Card key={result.role} className={`${idx === 0 ? "border-primary/50 shadow-md" : ""}`}>
                                        <CardContent className="pt-5 space-y-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    {idx === 0 && <Star className="h-5 w-5 text-yellow-500 shrink-0" />}
                                                    <div>
                                                        <h3 className="font-bold text-lg">{result.role}</h3>
                                                        {idx === 0 && <Badge variant="success">Best Match</Badge>}
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className={`text-2xl font-black ${idx === 0 ? "text-primary" : "text-muted-foreground"}`}>{result.match}%</p>
                                                    <p className="text-xs text-muted-foreground">match</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{result.description}</p>
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground mb-1.5">📖 Subjects that will help you:</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {result.subjects.map(s => (
                                                        <span key={s} className="rounded-full bg-primary/10 text-primary border border-primary/20 text-xs px-2 py-0.5">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <Button
                                                className="w-full"
                                                variant={idx === 0 ? "primary" : "outline"}
                                                onClick={() => setGoalSet(result.role)}
                                            >
                                                <Target className="mr-2 h-4 w-4" /> Set "{result.role}" as My Goal
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                                <div className="text-center">
                                    <button className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                                        Skip for now — I'll decide later
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
