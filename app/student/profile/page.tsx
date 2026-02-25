"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    User, Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin,
    Plus, Trash2, Edit3, Save, X, Upload, Award, Briefcase,
    BookOpen, Code2, Star, CheckCircle2, GraduationCap, Flame, ExternalLink,
    Trophy, Target
} from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
    id: number; title: string; tech: string; description: string; link: string; year: string;
}
interface Certification {
    id: number; name: string; issuer: string; year: string; link: string;
}
interface Internship {
    id: number; role: string; company: string; period: string; description: string;
}
interface Achievement {
    id: number; title: string; description: string; year: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const initialProfile = {
    name: "Rachit Jain",
    email: "rachit.jain@nmims.edu.in",
    phone: "+91 98765 43210",
    location: "NMIMS Hyderabad Campus",
    program: "B.Tech CSE (Data Science)",
    year: "3rd Year",
    batch: "2022-2026",
    cgpa: "8.7",
    rollNo: "C22098",
    githubUrl: "https://github.com/rachitjain",
    linkedinUrl: "https://linkedin.com/in/rachitjain",
    leetcodeUrl: "https://leetcode.com/rachitjain",
    resumeUrl: "",
    bio: "Passionate about AI/ML and full-stack development. Looking to build impactful products that solve real-world problems.",
    placementStatus: "Actively Preparing",
    interests: ["Machine Learning", "React", "Cloud Computing", "Open Source"],
};

const initialSkills = ["Python", "React", "TypeScript", "Machine Learning", "SQL", "Git", "Django", "TensorFlow"];

const initialProjects: Project[] = [
    { id: 1, title: "Virtual Placement Assistant", tech: "Next.js, Python, Gemini AI", description: "AI-powered placement prep dashboard for NMIMS students built with Next.js and Google Gemini.", link: "https://github.com/rachitjain/vpa", year: "2024" },
    { id: 2, title: "Sentiment Analysis API", tech: "Python, FastAPI, BERT", description: "REST API for real-time sentiment analysis using BERT transformer model with 93% accuracy.", link: "", year: "2023" },
];

const initialCertifications: Certification[] = [
    { id: 1, name: "Google Cloud Associate Cloud Engineer", issuer: "Google", year: "2024", link: "" },
    { id: 2, name: "Deep Learning Specialization", issuer: "Coursera (Andrew Ng)", year: "2023", link: "" },
];

const initialInternships: Internship[] = [
    { id: 1, role: "ML Engineer Intern", company: "TCS iON", period: "May - Jul 2024", description: "Built recommendation models and automated data pipelines using Python and Spark." },
];

const initialAchievements: Achievement[] = [
    { id: 1, title: "Smart India Hackathon Finalist", description: "Top 10 national finalist for AI-based water quality monitoring system.", year: "2024" },
    { id: 2, title: "NMIMS Coding Championship", description: "1st place in inter-department competitive programming contest.", year: "2023" },
];

// ─── Tab helper ───────────────────────────────────────────────────────────────
const tabs = ["Overview", "Projects", "Certifications", "Internships", "Achievements", "Skills"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [profile, setProfile] = useState(initialProfile);
    const [editingBasic, setEditingBasic] = useState(false);
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState("");
    const [projects, setProjects] = useState(initialProjects);
    const [certs, setCerts] = useState(initialCertifications);
    const [internships, setInternships] = useState(initialInternships);
    const [achievements, setAchievements] = useState(initialAchievements);
    const [interests, setInterests] = useState(initialProfile.interests);
    const [newInterest, setNewInterest] = useState("");
    const [saved, setSaved] = useState(false);

    // Adding forms
    const [addingProject, setAddingProject] = useState(false);
    const [addingCert, setAddingCert] = useState(false);
    const [addingInternship, setAddingInternship] = useState(false);
    const [addingAchievement, setAddingAchievement] = useState(false);

    const [newProject, setNewProject] = useState<Omit<Project, "id">>({ title: "", tech: "", description: "", link: "", year: new Date().getFullYear().toString() });
    const [newCert, setNewCert] = useState<Omit<Certification, "id">>({ name: "", issuer: "", year: "", link: "" });
    const [newInternship, setNewInternship] = useState<Omit<Internship, "id">>({ role: "", company: "", period: "", description: "" });
    const [newAchievement, setNewAchievement] = useState<Omit<Achievement, "id">>({ title: "", description: "", year: "" });

    const handleSave = () => {
        setSaved(true);
        setEditingBasic(false);
        setTimeout(() => setSaved(false), 3000);
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (s: string) => setSkills(skills.filter(sk => sk !== s));
    const addInterest = () => {
        if (newInterest.trim() && !interests.includes(newInterest.trim())) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest("");
        }
    };

    const completionFields = [
        profile.name, profile.email, profile.phone, profile.bio,
        profile.githubUrl, profile.linkedinUrl, profile.resumeUrl, profile.cgpa,
        skills.length > 0 ? "yes" : "", projects.length > 0 ? "yes" : "",
        certs.length > 0 ? "yes" : "",
    ];
    const completionPct = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);

    const yearGradient: Record<string, string> = {
        "1st Year": "year-badge-1",
        "2nd Year": "year-badge-2",
        "3rd Year": "year-badge-3",
        "4th Year": "year-badge-4",
    };

    return (
        <DashboardLayout role="student" userName={profile.name} userYear={profile.year} userProgram={profile.program}>
            <div className="space-y-6 animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">My Profile</h1>
                        <p className="text-muted-foreground">Manage your career portfolio — visible to faculty &amp; admins</p>
                    </div>
                    {saved && (
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2 text-green-700 text-sm font-medium animate-fade-in-up">
                            <CheckCircle2 className="h-4 w-4" /> Profile saved!
                        </div>
                    )}
                </div>

                {/* Hero Profile Card */}
                <Card className="overflow-hidden">
                    <div className="h-24 gradient-primary relative">
                        <div className={`absolute top-2 right-4 text-white text-xs font-bold px-3 py-1 rounded-full ${yearGradient[profile.year] || "bg-white/20"} bg-white/20 border border-white/40`}>
                            {profile.year}
                        </div>
                    </div>
                    <CardContent className="relative pt-0">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="-mt-10 relative shrink-0">
                                <div className="h-20 w-20 rounded-2xl gradient-primary text-white text-3xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
                                    {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" title="Active" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 pt-2">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                                        <p className="text-muted-foreground text-sm">{profile.rollNo} &bull; {profile.batch}</p>
                                        <p className="text-sm font-medium text-primary mt-0.5">{profile.program}</p>
                                        <p className="mt-2 text-sm text-muted-foreground max-w-lg">{profile.bio}</p>

                                        {/* Interests */}
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {interests.map(i => (
                                                <span key={i} className="skill-pill">✦ {i}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Profile Completion */}
                                    <div className="shrink-0 text-center p-4 rounded-xl bg-secondary border min-w-[130px]">
                                        <div className="text-3xl font-bold text-primary">{completionPct}%</div>
                                        <p className="text-xs text-muted-foreground mt-0.5">Profile Complete</p>
                                        <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full gradient-primary rounded-full progress-animated"
                                                style={{ width: `${completionPct}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {completionPct < 100 ? "Fill more to stand out!" : "🎉 Complete!"}
                                        </p>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {profile.githubUrl && (
                                        <a href={profile.githubUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="h-4 w-4" /> GitHub
                                        </a>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            <Linkedin className="h-4 w-4" /> LinkedIn
                                        </a>
                                    )}
                                    {profile.leetcodeUrl && (
                                        <a href={profile.leetcodeUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            <Code2 className="h-4 w-4" /> LeetCode
                                        </a>
                                    )}
                                    {profile.resumeUrl && (
                                        <a href={profile.resumeUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                                            <ExternalLink className="h-4 w-4" /> View Resume
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="shrink-0 flex flex-row md:flex-col gap-3">
                                <div className="rounded-xl bg-secondary p-3 text-center min-w-[80px]">
                                    <p className="text-xl font-bold text-primary">{profile.cgpa}</p>
                                    <p className="text-xs text-muted-foreground">CGPA</p>
                                </div>
                                <div className="rounded-xl bg-secondary p-3 text-center min-w-[80px]">
                                    <p className="text-xl font-bold text-blue-600">{projects.length}</p>
                                    <p className="text-xs text-muted-foreground">Projects</p>
                                </div>
                                <div className="rounded-xl bg-secondary p-3 text-center min-w-[80px]">
                                    <p className="text-xl font-bold text-green-600">{certs.length}</p>
                                    <p className="text-xs text-muted-foreground">Certs</p>
                                </div>
                            </div>
                        </div>

                        {/* Placement Status badge */}
                        <div className="mt-4 flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">Status:</span>
                            <Badge variant="warning">{profile.placementStatus}</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <div className="flex gap-1 border-b overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                ? "tab-active text-primary border-b-2 border-primary"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── Tab: Overview ─────────────────────────────────────────── */}
                {activeTab === "Overview" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" /> Personal Information
                                    </CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => editingBasic ? handleSave() : setEditingBasic(true)}
                                        className="flex items-center gap-1.5"
                                    >
                                        {editingBasic ? <><Save className="h-3.5 w-3.5" /> Save</> : <><Edit3 className="h-3.5 w-3.5" /> Edit</>}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {editingBasic ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {[
                                            { label: "Full Name", key: "name", icon: User },
                                            { label: "Email", key: "email", icon: Mail },
                                            { label: "Phone", key: "phone", icon: Phone },
                                            { label: "CGPA", key: "cgpa", icon: Star },
                                            { label: "GitHub URL", key: "githubUrl", icon: Github },
                                            { label: "LinkedIn URL", key: "linkedinUrl", icon: Linkedin },
                                            { label: "LeetCode URL", key: "leetcodeUrl", icon: Code2 },
                                            { label: "Resume Link", key: "resumeUrl", icon: LinkIcon },
                                        ].map(({ label, key, icon: Icon }) => (
                                            <div key={key} className="space-y-1.5">
                                                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                    <Icon className="h-3.5 w-3.5" /> {label}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={(profile as unknown as Record<string, string>)[key] || ""}
                                                    onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                                                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                                />
                                            </div>
                                        ))}
                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Bio</label>
                                            <textarea
                                                value={profile.bio}
                                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                                rows={3}
                                                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className="text-xs font-medium text-muted-foreground">Placement Status</label>
                                            <select
                                                value={profile.placementStatus}
                                                onChange={e => setProfile({ ...profile, placementStatus: e.target.value })}
                                                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            >
                                                <option>Actively Preparing</option>
                                                <option>Ready for Placement</option>
                                                <option>Placed</option>
                                                <option>Higher Studies</option>
                                                <option>Not Interested Yet</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2 flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => setEditingBasic(false)} className="flex items-center gap-1.5">
                                                <X className="h-3.5 w-3.5" /> Cancel
                                            </Button>
                                            <Button onClick={handleSave} className="flex items-center gap-1.5">
                                                <Save className="h-3.5 w-3.5" /> Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {[
                                            { icon: User, label: "Name", value: profile.name },
                                            { icon: Mail, label: "Email", value: profile.email },
                                            { icon: Phone, label: "Phone", value: profile.phone },
                                            { icon: GraduationCap, label: "Program", value: `${profile.program} • ${profile.year}` },
                                            { icon: MapPin, label: "Campus", value: profile.location },
                                            { icon: Star, label: "CGPA", value: `${profile.cgpa} / 10` },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-secondary/50 transition-colors">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                                    <Icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{label}</p>
                                                    <p className="text-sm font-medium">{value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Interests & Links */}
                        <div className="space-y-4">
                            {/* Interests */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-primary" /> Interests & Tracks
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {interests.map(i => (
                                            <span key={i} className="skill-pill selected group">
                                                {i}
                                                <button onClick={() => setInterests(interests.filter(x => x !== i))}
                                                    className="ml-1.5 opacity-60 hover:opacity-100">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newInterest}
                                            onChange={e => setNewInterest(e.target.value)}
                                            onKeyPress={e => e.key === "Enter" && addInterest()}
                                            placeholder="Add interest..."
                                            className="flex-1 h-8 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                        <Button size="sm" onClick={addInterest}><Plus className="h-3.5 w-3.5" /></Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Education */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-primary" /> Education
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-xl border p-4 bg-gradient-to-br from-primary/5 to-transparent">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-white shrink-0">
                                                <GraduationCap className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{profile.program}</h4>
                                                <p className="text-sm text-muted-foreground">NMIMS Hyderabad • {profile.batch}</p>
                                                <p className="mt-1 text-sm">CGPA: <span className="font-bold text-primary">{profile.cgpa}</span>/10</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">Roll No: {profile.rollNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Resume Upload */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload className="h-5 w-5 text-primary" /> Resume
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {profile.resumeUrl ? (
                                        <div className="flex items-center justify-between rounded-xl border p-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center">
                                                    <BookOpen className="h-4 w-4 text-red-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">resume.pdf</p>
                                                    <p className="text-xs text-muted-foreground">Uploaded</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">Update</Button>
                                                <Button size="sm" variant="outline">View</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                                            <p className="text-sm font-medium">Upload Resume (PDF)</p>
                                            <p className="text-xs text-muted-foreground">or paste a Google Drive link in the edit section</p>
                                            <Button size="sm" className="mt-3">Choose File</Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* ── Tab: Projects ─────────────────────────────────────────── */}
                {activeTab === "Projects" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{projects.length} project{projects.length !== 1 ? "s" : ""} added</p>
                            <Button onClick={() => setAddingProject(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Add Project
                            </Button>
                        </div>

                        {addingProject && (
                            <Card className="border-primary/30 shadow-md">
                                <CardHeader><CardTitle>New Project</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {(["title", "tech", "year", "link"] as const).map(field => (
                                            <div key={field} className="space-y-1">
                                                <label className="text-xs font-medium capitalize text-muted-foreground">
                                                    {field === "tech" ? "Technologies Used" : field === "link" ? "GitHub / Demo Link" : field.charAt(0).toUpperCase() + field.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newProject[field]}
                                                    onChange={e => setNewProject({ ...newProject, [field]: e.target.value })}
                                                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        ))}
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">Description</label>
                                            <textarea
                                                rows={3}
                                                value={newProject.description}
                                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setAddingProject(false)}>Cancel</Button>
                                        <Button onClick={() => {
                                            if (newProject.title) {
                                                setProjects([...projects, { ...newProject, id: Date.now() }]);
                                                setNewProject({ title: "", tech: "", description: "", link: "", year: new Date().getFullYear().toString() });
                                                setAddingProject(false);
                                            }
                                        }}>Save Project</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            {projects.map(p => (
                                <Card key={p.id} className="card-hover">
                                    <CardContent className="pt-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Code2 className="h-4 w-4 text-primary" />
                                                    <h4 className="font-semibold">{p.title}</h4>
                                                    <Badge variant="default">{p.year}</Badge>
                                                </div>
                                                <p className="text-xs text-primary/80 font-medium mb-2">{p.tech}</p>
                                                <p className="text-sm text-muted-foreground">{p.description}</p>
                                                {p.link && (
                                                    <a href={p.link} target="_blank" rel="noreferrer"
                                                        className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline">
                                                        <ExternalLink className="h-3 w-3" /> View Project
                                                    </a>
                                                )}
                                            </div>
                                            <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))}
                                                className="text-muted-foreground hover:text-destructive transition-colors mt-1">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {projects.length === 0 && !addingProject && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Code2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>No projects yet. Add your first project!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Certifications ───────────────────────────────────── */}
                {activeTab === "Certifications" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{certs.length} certification{certs.length !== 1 ? "s" : ""}</p>
                            <Button onClick={() => setAddingCert(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Add Certification
                            </Button>
                        </div>

                        {addingCert && (
                            <Card className="border-primary/30 shadow-md">
                                <CardHeader><CardTitle>New Certification</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {(["name", "issuer", "year", "link"] as const).map(field => (
                                            <div key={field} className="space-y-1">
                                                <label className="text-xs font-medium capitalize text-muted-foreground">
                                                    {field === "link" ? "Certificate Link (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newCert[field]}
                                                    onChange={e => setNewCert({ ...newCert, [field]: e.target.value })}
                                                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setAddingCert(false)}>Cancel</Button>
                                        <Button onClick={() => {
                                            if (newCert.name) {
                                                setCerts([...certs, { ...newCert, id: Date.now() }]);
                                                setNewCert({ name: "", issuer: "", year: "", link: "" });
                                                setAddingCert(false);
                                            }
                                        }}>Save Certification</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="space-y-3">
                            {certs.map(c => (
                                <Card key={c.id} className="card-hover">
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shrink-0">
                                                <Award className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{c.name}</h4>
                                                <p className="text-sm text-muted-foreground">{c.issuer} • {c.year}</p>
                                                {c.link && (
                                                    <a href={c.link} target="_blank" rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                                                        <ExternalLink className="h-3 w-3" /> View Certificate
                                                    </a>
                                                )}
                                            </div>
                                            <button onClick={() => setCerts(certs.filter(x => x.id !== c.id))}
                                                className="text-muted-foreground hover:text-destructive transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {certs.length === 0 && !addingCert && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Award className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>No certifications yet. Add your first one!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Internships ─────────────────────────────────────── */}
                {activeTab === "Internships" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{internships.length} internship{internships.length !== 1 ? "s" : ""}</p>
                            <Button onClick={() => setAddingInternship(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Add Internship
                            </Button>
                        </div>

                        {addingInternship && (
                            <Card className="border-primary/30 shadow-md">
                                <CardHeader><CardTitle>New Internship</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {(["role", "company", "period"] as const).map(field => (
                                            <div key={field} className="space-y-1">
                                                <label className="text-xs font-medium capitalize text-muted-foreground">{field}</label>
                                                <input
                                                    type="text"
                                                    value={newInternship[field]}
                                                    onChange={e => setNewInternship({ ...newInternship, [field]: e.target.value })}
                                                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                />
                                            </div>
                                        ))}
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">Description</label>
                                            <textarea
                                                rows={3}
                                                value={newInternship.description}
                                                onChange={e => setNewInternship({ ...newInternship, description: e.target.value })}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setAddingInternship(false)}>Cancel</Button>
                                        <Button onClick={() => {
                                            if (newInternship.role) {
                                                setInternships([...internships, { ...newInternship, id: Date.now() }]);
                                                setNewInternship({ role: "", company: "", period: "", description: "" });
                                                setAddingInternship(false);
                                            }
                                        }}>Save Internship</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="space-y-3">
                            {internships.map(i => (
                                <Card key={i.id} className="card-hover">
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl gradient-blue flex items-center justify-center text-white shrink-0">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{i.role}</h4>
                                                <p className="text-sm text-muted-foreground">{i.company} &bull; {i.period}</p>
                                                <p className="mt-1 text-sm">{i.description}</p>
                                            </div>
                                            <button onClick={() => setInternships(internships.filter(x => x.id !== i.id))}
                                                className="text-muted-foreground hover:text-destructive transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {internships.length === 0 && !addingInternship && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>No internships yet. Add your experience!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Achievements ─────────────────────────────────────── */}
                {activeTab === "Achievements" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{achievements.length} achievement{achievements.length !== 1 ? "s" : ""}</p>
                            <Button onClick={() => setAddingAchievement(true)} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Add Achievement
                            </Button>
                        </div>

                        {addingAchievement && (
                            <Card className="border-primary/30 shadow-md">
                                <CardHeader><CardTitle>New Achievement</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {(["title", "year"] as const).map(field => (
                                            <div key={field} className="space-y-1">
                                                <label className="text-xs font-medium capitalize text-muted-foreground">{field}</label>
                                                <input type="text" value={newAchievement[field]}
                                                    onChange={e => setNewAchievement({ ...newAchievement, [field]: e.target.value })}
                                                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                                            </div>
                                        ))}
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">Description</label>
                                            <textarea rows={2} value={newAchievement.description}
                                                onChange={e => setNewAchievement({ ...newAchievement, description: e.target.value })}
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setAddingAchievement(false)}>Cancel</Button>
                                        <Button onClick={() => {
                                            if (newAchievement.title) {
                                                setAchievements([...achievements, { ...newAchievement, id: Date.now() }]);
                                                setNewAchievement({ title: "", description: "", year: "" });
                                                setAddingAchievement(false);
                                            }
                                        }}>Save Achievement</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            {achievements.map(a => (
                                <Card key={a.id} className="card-hover">
                                    <CardContent className="pt-4 pb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                                                <Trophy className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-semibold">{a.title}</h4>
                                                    <Badge variant="default">{a.year}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
                                            </div>
                                            <button onClick={() => setAchievements(achievements.filter(x => x.id !== a.id))}
                                                className="text-muted-foreground hover:text-destructive transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        {achievements.length === 0 && !addingAchievement && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>Start adding your wins and achievements!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Skills ───────────────────────────────────────────── */}
                {activeTab === "Skills" && (
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" /> Technical Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {skills.map(s => (
                                        <span key={s} className="skill-pill selected">
                                            {s}
                                            <button onClick={() => removeSkill(s)} className="ml-1.5 opacity-70 hover:opacity-100">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={e => setNewSkill(e.target.value)}
                                        onKeyPress={e => e.key === "Enter" && addSkill()}
                                        placeholder="Type a skill and press Enter..."
                                        className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <Button onClick={addSkill}><Plus className="h-4 w-4" /></Button>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">💡 Tip: These skills will be used by AI to generate your personalized roadmap &amp; company readiness score.</p>
                            </CardContent>
                        </Card>

                        {/* Suggested skills by year */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Suggested Skills for {profile.year}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">Click to add skills recommended for your year and program:</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Docker", "Kubernetes", "System Design", "PostgreSQL", "Redis", "LangChain", "PyTorch", "AWS", "FastAPI", "Kafka"].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                if (!skills.includes(s)) setSkills([...skills, s]);
                                            }}
                                            className={`skill-pill ${skills.includes(s) ? "opacity-40 cursor-not-allowed" : ""}`}
                                            disabled={skills.includes(s)}
                                        >
                                            <Plus className="h-3 w-3 mr-1" /> {s}
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
