"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Microscope, BookOpen, ExternalLink, Star, Clock, TrendingUp, Filter, Search } from "lucide-react";
import { useState } from "react";

const researchAreas = [
    {
        id: 1, title: "Federated Learning for Privacy-Preserving Healthcare AI",
        authors: "Li et al.", journal: "Nature Machine Intelligence", year: 2024,
        tags: ["Machine Learning", "Privacy", "Healthcare"], relevance: 95,
        abstract: "A novel approach to training ML models across distributed healthcare data without compromising patient privacy.",
        link: "#", readTime: "18 min", citations: 142,
    },
    {
        id: 2, title: "Transformer-based Models for Time-Series Forecasting",
        authors: "Zhou et al.", journal: "NeurIPS 2024", year: 2024,
        tags: ["Deep Learning", "Time Series", "Forecasting"], relevance: 88,
        abstract: "Applying attention mechanisms to outperform traditional LSTM models in multivariate time-series prediction.",
        link: "#", readTime: "22 min", citations: 89,
    },
    {
        id: 3, title: "Graph Neural Networks in Drug Discovery",
        authors: "Stokes et al.", journal: "Cell", year: 2024,
        tags: ["GNN", "Bioinformatics", "AI"], relevance: 72,
        abstract: "Leveraging molecular graph structure to predict antibiotic activity and accelerate drug discovery pipelines.",
        link: "#", readTime: "25 min", citations: 310,
    },
    {
        id: 4, title: "Large Language Models as Knowledge Graphs",
        authors: "Pan et al.", journal: "ACL 2024", year: 2024,
        tags: ["NLP", "LLM", "Knowledge Graphs"], relevance: 80,
        abstract: "Exploring the structural knowledge encoded in LLMs and how prompting can extract structured knowledge.",
        link: "#", readTime: "15 min", citations: 201,
    },
    {
        id: 5, title: "Reinforcement Learning from Human Feedback (RLHF)",
        authors: "Christiano et al.", journal: "ICLR 2024", year: 2024,
        tags: ["Reinforcement Learning", "LLM", "Alignment"], relevance: 84,
        abstract: "Aligning AI behavior with human preferences using comparative feedback instead of explicit reward functions.",
        link: "#", readTime: "20 min", citations: 564,
    },
    {
        id: 6, title: "Efficient Transformers: A Survey",
        authors: "Tay et al.", journal: "ACM Computing Surveys", year: 2023,
        tags: ["Transformers", "Efficiency", "Survey"], relevance: 70,
        abstract: "Comprehensive survey of Transformer variants targeting computational efficiency and scalability.",
        link: "#", readTime: "35 min", citations: 723,
    },
];

const projects = [
    { title: "Image Classification with Custom CNN", status: "Completed", skill: "Deep Learning" },
    { title: "Sentiment Analysis using BERT", status: "In Progress", skill: "NLP" },
    { title: "Recommendation System", status: "Planned", skill: "ML" },
];

export default function ResearchPage() {
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("All");

    const allTags = ["All", ...Array.from(new Set(researchAreas.flatMap(r => r.tags)))];
    const filtered = researchAreas.filter(r => {
        const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.abstract.toLowerCase().includes(search.toLowerCase());
        const matchTag = activeTag === "All" || r.tags.includes(activeTag);
        return matchSearch && matchTag;
    });

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Microscope className="h-8 w-8 text-purple-600" /> Research Hub
                    </h1>
                    <p className="text-muted-foreground">AI-curated papers matched to your skills and career goals</p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { label: "Papers Read", value: "12", icon: "📄", sub: "This semester" },
                        { label: "Bookmarked", value: "28", icon: "🔖", sub: "Saved for later" },
                        { label: "Skills Covered", value: "8", icon: "🎯", sub: "Research areas" },
                        { label: "Hours Reading", value: "34", icon: "⏱️", sub: "Total study time" },
                    ].map(s => (
                        <Card key={s.label} className="card-hover">
                            <CardContent className="pt-5 text-center">
                                <div className="text-3xl mb-1">{s.icon}</div>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <p className="text-xs font-medium">{s.label}</p>
                                <p className="text-xs text-muted-foreground">{s.sub}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search + Tags */}
                <div className="flex gap-3 flex-col sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search papers, topics, authors..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${activeTag === tag
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "border-input hover:bg-secondary"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Papers Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {filtered.map(paper => (
                        <Card key={paper.id} className="card-hover">
                            <CardContent className="pt-5">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm leading-snug">{paper.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-1">{paper.authors} • {paper.journal} • {paper.year}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className={`text-lg font-black ${paper.relevance >= 90 ? "text-green-600" : paper.relevance >= 75 ? "text-yellow-600" : "text-muted-foreground"}`}>
                                            {paper.relevance}%
                                        </div>
                                        <p className="text-xs text-muted-foreground">match</p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{paper.abstract}</p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {paper.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {paper.readTime}</span>
                                        <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {paper.citations} citations</span>
                                    </div>
                                    <a href={paper.link} target="_blank" rel="noreferrer">
                                        <Button size="sm" variant="outline" className="flex items-center gap-1.5 h-7 text-xs">
                                            <ExternalLink className="h-3 w-3" /> Read Paper
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div className="md:col-span-2 text-center py-12 text-muted-foreground">
                            <Microscope className="h-12 w-12 mx-auto mb-3 opacity-30" />
                            <p>No papers match your search. Try a different keyword.</p>
                        </div>
                    )}
                </div>

                {/* My Research Projects */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" /> My Research Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {projects.map(p => (
                                <div key={p.title} className="flex items-center gap-4 p-3 rounded-xl border hover:bg-secondary/40 transition-colors">
                                    <BookOpen className="h-5 w-5 text-purple-500 shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{p.title}</p>
                                        <p className="text-xs text-muted-foreground">{p.skill}</p>
                                    </div>
                                    <Badge variant={
                                        p.status === "Completed" ? "success" :
                                            p.status === "In Progress" ? "warning" : "default"
                                    }>{p.status}</Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">+ Add Research Project</Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
