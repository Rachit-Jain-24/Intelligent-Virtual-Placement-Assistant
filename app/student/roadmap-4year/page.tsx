"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Target, CheckCircle2, Circle, Sparkles, BookOpen, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

interface YearPlan {
    year: string;
    semester: string;
    focus: string;
    skills: string[];
    projects: string[];
    certifications: string[];
    internships: string;
    milestones: string[];
}

const dreamRoles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Full Stack Developer",
    "ML Engineer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Cloud Architect",
];

const roadmapData: Record<string, YearPlan[]> = {
    "Software Engineer": [
        {
            year: "1st Year",
            semester: "Sem 1-2",
            focus: "Programming Fundamentals & Problem Solving",
            skills: ["C/C++", "Python Basics", "Data Structures", "Git & GitHub"],
            projects: ["Calculator App", "Simple Games", "Portfolio Website"],
            certifications: ["Python for Everybody (Coursera)"],
            internships: "Focus on learning, no internship required",
            milestones: ["Solve 50+ coding problems", "Build 3 mini projects", "Learn version control"],
        },
        {
            year: "2nd Year",
            semester: "Sem 3-4",
            focus: "Advanced DSA & Web Development",
            skills: ["Advanced DSA", "JavaScript", "React", "Node.js", "SQL"],
            projects: ["E-commerce Website", "Task Manager App", "Blog Platform"],
            certifications: ["Meta Front-End Developer", "AWS Cloud Practitioner"],
            internships: "Summer internship (2 months) - Web Development",
            milestones: ["Solve 200+ LeetCode problems", "Build full-stack app", "Contribute to open source"],
        },
        {
            year: "3rd Year",
            semester: "Sem 5-6",
            focus: "System Design & Specialization",
            skills: ["System Design", "Docker", "Kubernetes", "Microservices", "Redis"],
            projects: ["Scalable Chat Application", "URL Shortener", "Real-time Collaboration Tool"],
            certifications: ["System Design Course", "Docker & Kubernetes"],
            internships: "6-month internship at product company",
            milestones: ["Master system design basics", "Build scalable applications", "Network with professionals"],
        },
        {
            year: "4th Year",
            semester: "Sem 7-8",
            focus: "Interview Prep & Placement",
            skills: ["Advanced System Design", "Behavioral Interview", "Negotiation", "Leadership"],
            projects: ["Capstone Project", "Open Source Contributions", "Technical Blog"],
            certifications: ["Advanced System Design", "Leadership Course"],
            internships: "Pre-placement offer (PPO) conversion focus",
            milestones: ["Crack 5+ company interviews", "Secure dream job offer", "Build strong portfolio"],
        },
    ],
    "Data Scientist": [
        {
            year: "1st Year",
            semester: "Sem 1-2",
            focus: "Mathematics & Programming Basics",
            skills: ["Python", "Statistics", "Linear Algebra", "Pandas", "NumPy"],
            projects: ["Data Analysis Projects", "Statistical Visualizations", "Simple ML Models"],
            certifications: ["Python for Data Science (IBM)"],
            internships: "Focus on learning fundamentals",
            milestones: ["Master Python basics", "Understand statistics", "Complete 5 data analysis projects"],
        },
        {
            year: "2nd Year",
            semester: "Sem 3-4",
            focus: "Machine Learning Fundamentals",
            skills: ["Scikit-learn", "ML Algorithms", "Data Visualization", "SQL", "Feature Engineering"],
            projects: ["Predictive Models", "Recommendation System", "Customer Segmentation"],
            certifications: ["Machine Learning Specialization (Stanford)", "SQL for Data Science"],
            internships: "Summer internship - Data Analysis",
            milestones: ["Build 10+ ML models", "Kaggle competitions", "Data cleaning expertise"],
        },
        {
            year: "3rd Year",
            semester: "Sem 5-6",
            focus: "Deep Learning & Big Data",
            skills: ["TensorFlow", "PyTorch", "Neural Networks", "NLP", "Computer Vision", "Spark"],
            projects: ["Image Classification", "Chatbot", "Time Series Forecasting"],
            certifications: ["Deep Learning Specialization", "Big Data with Spark"],
            internships: "6-month ML/AI internship",
            milestones: ["Deploy ML models", "Research paper publication", "Advanced portfolio"],
        },
        {
            year: "4th Year",
            semester: "Sem 7-8",
            focus: "Specialization & Placement",
            skills: ["MLOps", "Model Deployment", "A/B Testing", "Business Analytics"],
            projects: ["End-to-end ML Pipeline", "Research Project", "Industry Capstone"],
            certifications: ["MLOps", "Cloud ML (AWS/GCP)"],
            internships: "PPO conversion or research internship",
            milestones: ["Secure data science role", "Strong GitHub portfolio", "Interview success"],
        },
    ],
    "Full Stack Developer": [
        {
            year: "1st Year",
            semester: "Sem 1-2",
            focus: "Web Fundamentals",
            skills: ["HTML", "CSS", "JavaScript", "Git", "Responsive Design"],
            projects: ["Personal Portfolio", "Landing Pages", "Simple Web Apps"],
            certifications: ["Web Development Bootcamp"],
            internships: "Focus on building projects",
            milestones: ["Build 5 responsive websites", "Learn JavaScript ES6+", "Version control mastery"],
        },
        {
            year: "2nd Year",
            semester: "Sem 3-4",
            focus: "Frontend & Backend Development",
            skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind CSS"],
            projects: ["Social Media Clone", "E-commerce Platform", "Real-time Chat App"],
            certifications: ["MERN Stack Course", "React Advanced Patterns"],
            internships: "Summer internship - Full Stack Development",
            milestones: ["Build 3 full-stack apps", "Deploy to cloud", "API development"],
        },
        {
            year: "3rd Year",
            semester: "Sem 5-6",
            focus: "Advanced Stack & DevOps",
            skills: ["Next.js", "TypeScript", "GraphQL", "Docker", "CI/CD", "AWS"],
            projects: ["SaaS Application", "Microservices Project", "Progressive Web App"],
            certifications: ["AWS Solutions Architect", "Advanced TypeScript"],
            internships: "6-month product company internship",
            milestones: ["Production-ready apps", "DevOps pipeline", "System architecture"],
        },
        {
            year: "4th Year",
            semester: "Sem 7-8",
            focus: "Optimization & Placement",
            skills: ["Performance Optimization", "Security", "Testing", "Agile", "System Design"],
            projects: ["Scalable Web Platform", "Open Source Contributions", "Technical Writing"],
            certifications: ["System Design", "Web Security"],
            internships: "PPO or startup experience",
            milestones: ["Crack interviews", "Strong portfolio", "Secure full-stack role"],
        },
    ],
};

// Curriculum-aligned subjects per year (mock data for "Data Scientist" goal)
const curriculumSubjects: Record<string, { subject: string; relevance: string }[]> = {
    "1st Year": [
        { subject: "Mathematics I", relevance: "Core — Linear algebra powers ML models" },
        { subject: "Statistics & Probability", relevance: "Core — Foundation of all ML algorithms" },
        { subject: "Programming Fundamentals", relevance: "Core — Python is the #1 data science language" },
        { subject: "Engineering Physics", relevance: "General — Broad scientific foundation" },
    ],
    "2nd Year": [
        { subject: "Data Structures", relevance: "Core — Efficient data processing at scale" },
        { subject: "DBMS & SQL", relevance: "Core — Querying and storing structured datasets" },
        { subject: "Discrete Mathematics", relevance: "Supporting — Combinatorics in recommender systems" },
        { subject: "Object Oriented Programming", relevance: "Supporting — Building modular ML pipelines" },
    ],
    "3rd Year": [
        { subject: "Machine Learning", relevance: "Core — Your primary domain subject" },
        { subject: "Big Data Analytics", relevance: "Core — Spark & Hadoop for enterprise data" },
        { subject: "Deep Learning", relevance: "Core — Neural networks & advanced AI models" },
        { subject: "NLP", relevance: "Core — Text data and LLM foundations" },
    ],
    "4th Year": [
        { subject: "MLOps", relevance: "Core — Deploying and monitoring ML models in production" },
        { subject: "Cloud Computing", relevance: "Core — AWS/GCP for scalable model deployment" },
        { subject: "Research Methodology", relevance: "Supporting — For R&D and publication-track roles" },
        { subject: "Business Analytics", relevance: "Supporting — Communicating insights to stakeholders" },
    ],
};

// Semester milestone checklist per year
const semesterMilestones: Record<string, string[]> = {
    "1st Year": [
        "Complete Python for Data Science (Coursera)",
        "Solve 30+ beginner LeetCode problems",
        "Build 2 data analysis projects with Pandas",
        "Set up GitHub profile with first repos",
        "Learn Git & version control basics",
    ],
    "2nd Year": [
        "Complete SQL for Data Science certification",
        "Solve 100+ LeetCode problems (Easy + Medium)",
        "Build a predictive ML model (Titanic / House prices)",
        "Enter first Kaggle competition",
        "Secure a data analysis summer internship",
    ],
    "3rd Year": [
        "Complete Deep Learning Specialization (Coursera)",
        "Deploy a ML model to cloud (FastAPI + AWS)",
        "Build NLP project (sentiment analysis or chatbot)",
        "Publish a technical article or research paper",
        "Secure a 6-month ML/AI internship",
    ],
    "4th Year": [
        "Complete MLOps & model monitoring course",
        "Build an end-to-end data pipeline project",
        "Crack 5+ data science interview rounds",
        "Present capstone project to industry panel",
        "Secure final placement as Data Scientist",
    ],
};


export default function LongitudinalRoadmapPage() {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [curriculumAligned, setCurriculumAligned] = useState(false);
    // checkedTasks: { "1st Year": Set of checked task indices }
    const [checkedTasks, setCheckedTasks] = useState<Record<string, Set<number>>>({});

    const handleGenerateRoadmap = () => {
        if (selectedRole) setShowRoadmap(true);
    };

    const toggleTask = (year: string, idx: number) => {
        setCheckedTasks(prev => {
            const yearSet = new Set(prev[year] || []);
            if (yearSet.has(idx)) yearSet.delete(idx);
            else yearSet.add(idx);
            return { ...prev, [year]: yearSet };
        });
    };

    const getYearProgress = (year: string) => {
        const tasks = semesterMilestones[year] || [];
        const checked = checkedTasks[year]?.size || 0;
        return tasks.length > 0 ? Math.round((checked / tasks.length) * 100) : 0;
    };

    const yearPlans = selectedRole ? roadmapData[selectedRole] || [] : [];

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">4-Year Career Roadmap</h1>
                    <p className="text-muted-foreground">Your personalized journey from 1st year to placement</p>
                </div>

                {/* Dream Role Selection */}
                {!showRoadmap && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                What&apos;s Your Dream Role?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="mb-3 block text-sm font-medium">
                                    Select your target role to generate a personalized 4-year roadmap
                                </label>
                                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {dreamRoles.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setSelectedRole(role)}
                                            className={`rounded-lg border-2 p-4 text-left transition-all ${selectedRole === role
                                                ? "border-primary bg-accent"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{role}</span>
                                                {selectedRole === role && (
                                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                                <Sparkles className="h-5 w-5 text-blue-600" />
                                <p className="text-sm text-blue-900 dark:text-blue-100">
                                    AI will generate a customized roadmap with skills, projects, certifications, and milestones for each year
                                </p>
                            </div>

                            <Button onClick={handleGenerateRoadmap} disabled={!selectedRole} className="w-full" size="lg">
                                Generate My 4-Year Roadmap
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Roadmap Display */}
                {showRoadmap && (
                    <>
                        {/* Personalization Banner */}
                        <div className="rounded-xl bg-gradient-to-r from-primary/15 via-violet-500/10 to-transparent border border-primary/20 px-5 py-3.5 flex items-center gap-3 flex-wrap">
                            <Sparkles className="h-4 w-4 text-primary shrink-0" />
                            <p className="text-sm">
                                <span className="font-semibold">This roadmap is personalized</span> based on your goal:{" "}
                                <span className="text-primary font-bold">{selectedRole}</span> and your NMIMS college curriculum.
                            </p>
                        </div>

                        {/* Header with selected role + curriculum toggle */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">Your Path to: {selectedRole}</h2>
                                        <p className="text-muted-foreground">Follow this roadmap to achieve your career goals</p>
                                    </div>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        {/* Curriculum Aligned Toggle */}
                                        <button
                                            onClick={() => setCurriculumAligned(!curriculumAligned)}
                                            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${curriculumAligned
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border text-muted-foreground hover:border-primary/40"
                                                }`}
                                        >
                                            {curriculumAligned
                                                ? <ToggleRight className="h-4 w-4" />
                                                : <ToggleLeft className="h-4 w-4" />
                                            }
                                            Curriculum Aligned
                                        </button>
                                        <Button variant="outline" onClick={() => setShowRoadmap(false)}>
                                            Change Role
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Year-by-Year Roadmap */}
                        <div className="space-y-6">
                            {yearPlans.map((plan, index) => {
                                const yearProgress = getYearProgress(plan.year);
                                const milestones = semesterMilestones[plan.year] || [];
                                const subjects = curriculumSubjects[plan.year] || [];
                                const checked = checkedTasks[plan.year] || new Set();

                                return (
                                    <Card key={plan.year} className="overflow-hidden">
                                        <div className="border-l-4 border-primary">
                                            <CardHeader className="bg-accent/50">
                                                <div className="flex items-center justify-between flex-wrap gap-3">
                                                    <div>
                                                        <CardTitle className="text-xl">{plan.year}</CardTitle>
                                                        <p className="text-sm text-muted-foreground">{plan.semester}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right">
                                                            <p className="text-xs text-muted-foreground mb-1">Milestone Progress</p>
                                                            <div className="flex items-center gap-2">
                                                                <Progress value={yearProgress} className="w-24" />
                                                                <span className="text-xs font-semibold text-primary">{yearProgress}%</span>
                                                            </div>
                                                        </div>
                                                        <Badge variant="info" className="text-sm">Year {index + 1}/4</Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-6 space-y-6">
                                                {/* Curriculum Aligned Section */}
                                                {curriculumAligned && subjects.length > 0 && (
                                                    <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 dark:bg-cyan-950/20 p-4 space-y-3">
                                                        <h3 className="flex items-center gap-2 font-semibold text-cyan-700 dark:text-cyan-400 text-sm">
                                                            <BookOpen className="h-4 w-4" />
                                                            Subjects This Year That Help You
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {subjects.map(s => (
                                                                <div key={s.subject} className="flex items-start gap-2.5 text-sm">
                                                                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 mt-0.5 shrink-0" />
                                                                    <div>
                                                                        <span className="font-medium">{s.subject}</span>
                                                                        <span className="text-muted-foreground"> — {s.relevance}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Focus Area */}
                                                <div className="rounded-lg bg-primary/10 p-4">
                                                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                                                        <Target className="h-4 w-4" /> Primary Focus
                                                    </h3>
                                                    <p className="text-sm">{plan.focus}</p>
                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2">
                                                    {/* Skills */}
                                                    <div>
                                                        <h4 className="mb-3 font-semibold">Skills to Master</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {plan.skills.map(skill => (
                                                                <Badge key={skill} variant="default">{skill}</Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Projects */}
                                                    <div>
                                                        <h4 className="mb-3 font-semibold">Projects to Build</h4>
                                                        <ul className="space-y-2">
                                                            {plan.projects.map(project => (
                                                                <li key={project} className="flex items-start gap-2 text-sm">
                                                                    <Circle className="mt-1 h-3 w-3 fill-primary text-primary" />
                                                                    {project}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Certifications */}
                                                    <div>
                                                        <h4 className="mb-3 font-semibold">Recommended Certifications</h4>
                                                        <ul className="space-y-2">
                                                            {plan.certifications.map(cert => (
                                                                <li key={cert} className="flex items-start gap-2 text-sm">
                                                                    <CheckCircle2 className="mt-1 h-3 w-3 text-green-600" />
                                                                    {cert}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Internships */}
                                                    <div>
                                                        <h4 className="mb-3 font-semibold">Internship Goals</h4>
                                                        <p className="rounded-lg border p-3 text-sm">{plan.internships}</p>
                                                    </div>
                                                </div>

                                                {/* Semester Milestone Checklist */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="font-semibold">Semester Milestone Checklist</h4>
                                                        <span className="text-xs text-muted-foreground">{checked.size}/{milestones.length} completed</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {milestones.map((milestone, idx) => {
                                                            const isChecked = checked.has(idx);
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => toggleTask(plan.year, idx)}
                                                                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all ${isChecked
                                                                        ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                                                                        : "border-border hover:bg-secondary/50"
                                                                        }`}
                                                                >
                                                                    {isChecked
                                                                        ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                                                                        : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                                                                    }
                                                                    <span className={isChecked ? "line-through text-muted-foreground" : ""}>{milestone}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Overall Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Journey Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="mb-2 flex justify-between text-sm">
                                            <span>Overall Completion</span>
                                            <span className="font-semibold">25% (1st Year)</span>
                                        </div>
                                        <Progress value={25} />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Stay consistent with your roadmap and you'll be ready for your dream role by graduation!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}


