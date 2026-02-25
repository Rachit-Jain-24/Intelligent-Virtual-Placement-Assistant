import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";

const skillsData = [
    { name: "React", value: 85 },
    { name: "Python", value: 70 },
    { name: "JavaScript", value: 90 },
    { name: "TypeScript", value: 75 },
    { name: "Node.js", value: 65 },
    { name: "MongoDB", value: 60 },
];

const industryComparison = [
    { name: "React", value: 85, industry: 78 },
    { name: "Python", value: 70, industry: 82 },
    { name: "JavaScript", value: 90, industry: 85 },
    { name: "TypeScript", value: 75, industry: 70 },
];

const trendData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 68 },
    { name: "Mar", value: 72 },
    { name: "Apr", value: 75 },
    { name: "May", value: 78 },
    { name: "Jun", value: 82 },
];

const missingSkills = [
    { name: "Docker", demand: "High", category: "DevOps" },
    { name: "Kubernetes", demand: "High", category: "DevOps" },
    { name: "GraphQL", demand: "Medium", category: "Backend" },
    { name: "AWS", demand: "High", category: "Cloud" },
];

export default function SkillsPage() {
    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Skills & Insights</h1>
                    <p className="text-muted-foreground">Track your skill development and identify gaps</p>
                </div>

                {/* Current Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {skillsData.map((skill) => (
                            <div key={skill.name}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">{skill.value}%</span>
                                </div>
                                <Progress value={skill.value} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Missing Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skills to Develop</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {missingSkills.map((skill) => (
                                <div key={skill.name} className="flex items-center justify-between rounded-lg border p-3">
                                    <div>
                                        <p className="font-medium">{skill.name}</p>
                                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                                    </div>
                                    <Badge variant={skill.demand === "High" ? "danger" : "warning"}>
                                        {skill.demand} Demand
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Industry Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Industry Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart data={skillsData} />
                    </CardContent>
                </Card>

                {/* Skill Growth Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Development Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart data={trendData} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
