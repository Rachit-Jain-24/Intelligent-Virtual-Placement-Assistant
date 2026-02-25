export interface Student {
    id: string;
    name: string;
    email: string;
    department: string;
    readinessScore: number;
    placementProbability: number;
    riskLevel: "low" | "medium" | "high";
}

export interface Skill {
    name: string;
    level: number;
    category: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    matchPercentage: number;
    description: string;
    skills: string[];
}

export interface Application {
    id: string;
    jobTitle: string;
    company: string;
    appliedDate: Date;
    status: "applied" | "screening" | "interview" | "offered" | "rejected";
    notes: string;
}

export interface RoadmapTask {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    category: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    type: "info" | "warning" | "success";
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}
