"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Target, CheckCircle2, Circle, Sparkles } from "lucide-react";
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

export default function LongitudinalRoadmapPage() {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [showRoadmap, setShowRoadmap] = useState(false);

    const handleGenerateRoadmap = () => {
        if (selectedRole) {
            setShowRoadmap(true);
        }
    };

    const yearPlans = selectedRole ? roadmapData[selectedRole] || [] : [];

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">4-Year Career Roadmap</h1>
                    <p className="text-muted-foreground">
                        Your personalized journey from 1st year to placement
                    </p>
                </div>

                {/* Dream Role Selection */}
                {!showRoadmap && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                What's Your Dream Role?
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
                                    AI will generate a customized roadmap with skills, projects, certifications, and
                                    milestones for each year
                                </p>
                            </div>

                            <Button
                                onClick={handleGenerateRoadmap}
                                disabled={!selectedRole}
                                className="w-full"
                                size="lg"
                            >
                                Generate My 4-Year Roadmap
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Roadmap Display */}
                {showRoadmap && (
                    <>
                        {/* Header with selected role */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">Your Path to: {selectedRole}</h2>
                                        <p className="text-muted-foreground">
                                            Follow this roadmap to achieve your career goals
                                        </p>
                                    </div>
                                    <Button variant="outline" onClick={() => setShowRoadmap(false)}>
                                        Change Role
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Year-by-Year Roadmap */}
                        <div className="space-y-6">
                            {yearPlans.map((plan, index) => (
                                <Card key={plan.year} className="overflow-hidden">
                                    <div className="border-l-4 border-primary">
                                        <CardHeader className="bg-accent/50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-xl">{plan.year}</CardTitle>
                                                    <p className="text-sm text-muted-foreground">{plan.semester}</p>
                                                </div>
                                                <Badge variant="info" className="text-sm">
                                                    Year {index + 1}/4
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            {/* Focus Area */}
                                            <div className="mb-6 rounded-lg bg-primary/10 p-4">
                                                <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                                                    <Target className="h-4 w-4" />
                                                    Primary Focus
                                                </h3>
                                                <p className="text-sm">{plan.focus}</p>
                                            </div>

                                            <div className="grid gap-6 md:grid-cols-2">
                                                {/* Skills to Learn */}
                                                <div>
                                                    <h4 className="mb-3 font-semibold">Skills to Master</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {plan.skills.map((skill) => (
                                                            <Badge key={skill} variant="default">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Projects */}
                                                <div>
                                                    <h4 className="mb-3 font-semibold">Projects to Build</h4>
                                                    <ul className="space-y-2">
                                                        {plan.projects.map((project) => (
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
                                                        {plan.certifications.map((cert) => (
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

                                            {/* Milestones */}
                                            <div className="mt-6">
                                                <h4 className="mb-3 font-semibold">Key Milestones</h4>
                                                <div className="grid gap-3 md:grid-cols-3">
                                                    {plan.milestones.map((milestone) => (
                                                        <div
                                                            key={milestone}
                                                            className="rounded-lg border border-primary/20 bg-primary/5 p-3"
                                                        >
                                                            <p className="text-sm font-medium">{milestone}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
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
                                        Stay consistent with your roadmap and you'll be ready for your dream role by
                                        graduation!
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
