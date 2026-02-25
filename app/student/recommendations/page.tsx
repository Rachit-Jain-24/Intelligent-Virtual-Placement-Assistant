import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Building, TrendingUp } from "lucide-react";

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        match: 92,
        salary: "$90k - $120k",
        skills: ["React", "TypeScript", "CSS"],
        explanation: "Strong match based on your React and TypeScript skills",
    },
    {
        id: 2,
        title: "React Developer",
        company: "StartupXYZ",
        location: "Remote",
        match: 88,
        salary: "$80k - $110k",
        skills: ["React", "Node.js", "MongoDB"],
        explanation: "Your full-stack experience aligns well with this role",
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        company: "BigTech Solutions",
        location: "New York, NY",
        match: 85,
        salary: "$100k - $140k",
        skills: ["React", "Python", "AWS"],
        explanation: "Good fit for your diverse technical background",
    },
];

const internships = [
    {
        id: 1,
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA",
        match: 90,
        duration: "3 months",
        skills: ["Python", "JavaScript", "Algorithms"],
        explanation: "Excellent match for your algorithmic skills",
    },
    {
        id: 2,
        title: "Frontend Intern",
        company: "Meta",
        location: "Menlo Park, CA",
        match: 87,
        duration: "6 months",
        skills: ["React", "GraphQL"],
        explanation: "Your React expertise is highly relevant",
    },
];

const courses = [
    {
        id: 1,
        title: "AWS Certified Solutions Architect",
        provider: "AWS Training",
        match: 85,
        duration: "40 hours",
        level: "Intermediate",
        explanation: "Fill your cloud computing skill gap",
    },
    {
        id: 2,
        title: "System Design Masterclass",
        provider: "Educative",
        match: 82,
        duration: "30 hours",
        level: "Advanced",
        explanation: "Strengthen your system design knowledge",
    },
];

const projects = [
    {
        id: 1,
        title: "Build a Microservices Architecture",
        difficulty: "Advanced",
        match: 88,
        technologies: ["Docker", "Kubernetes", "Node.js"],
        explanation: "Learn modern deployment practices",
    },
    {
        id: 2,
        title: "Real-time Chat Application",
        difficulty: "Intermediate",
        match: 85,
        technologies: ["WebSocket", "React", "MongoDB"],
        explanation: "Showcase real-time communication skills",
    },
];

function RecommendationCard({ item, type }: { item: any; type: string }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {type === "job" || type === "internship" ? (
                                <>
                                    <Building className="h-4 w-4" />
                                    <span>{item.company}</span>
                                    <span>•</span>
                                    <MapPin className="h-4 w-4" />
                                    <span>{item.location}</span>
                                </>
                            ) : type === "course" ? (
                                <>
                                    <span>{item.provider}</span>
                                    <span>•</span>
                                    <span>{item.duration}</span>
                                </>
                            ) : (
                                <span>Difficulty: {item.difficulty}</span>
                            )}
                        </div>
                    </div>
                    <Badge variant="success" className="ml-4">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {item.match}% match
                    </Badge>
                </div>

                <p className="mb-4 text-sm text-muted-foreground">{item.explanation}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {(item.skills || item.technologies)?.map((skill: string) => (
                        <Badge key={skill} variant="info">
                            {skill}
                        </Badge>
                    ))}
                </div>

                <Button className="w-full">
                    {type === "job" || type === "internship" ? "Apply Now" : type === "course" ? "Enroll" : "Start Project"}
                </Button>
            </CardContent>
        </Card>
    );
}

export default function RecommendationsPage() {
    const tabs = [
        {
            label: "Jobs",
            value: "jobs",
            content: (
                <div className="grid gap-6 md:grid-cols-2">
                    {jobs.map((job) => (
                        <RecommendationCard key={job.id} item={job} type="job" />
                    ))}
                </div>
            ),
        },
        {
            label: "Internships",
            value: "internships",
            content: (
                <div className="grid gap-6 md:grid-cols-2">
                    {internships.map((internship) => (
                        <RecommendationCard key={internship.id} item={internship} type="internship" />
                    ))}
                </div>
            ),
        },
        {
            label: "Courses",
            value: "courses",
            content: (
                <div className="grid gap-6 md:grid-cols-2">
                    {courses.map((course) => (
                        <RecommendationCard key={course.id} item={course} type="course" />
                    ))}
                </div>
            ),
        },
        {
            label: "Projects",
            value: "projects",
            content: (
                <div className="grid gap-6 md:grid-cols-2">
                    {projects.map((project) => (
                        <RecommendationCard key={project.id} item={project} type="project" />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Recommendations</h1>
                    <p className="text-muted-foreground">AI-powered opportunities tailored for you</p>
                </div>

                <Tabs tabs={tabs} defaultValue="jobs" />
            </div>
        </DashboardLayout>
    );
}
