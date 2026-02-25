import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { LineChart } from "@/components/charts/LineChart";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const growthData = [
    { name: "Week 1", value: 65 },
    { name: "Week 2", value: 68 },
    { name: "Week 3", value: 72 },
    { name: "Week 4", value: 75 },
    { name: "Week 5", value: 78 },
    { name: "Week 6", value: 82 },
];

const strengths = [
    "Strong technical skills in modern frameworks",
    "Excellent problem-solving abilities",
    "Good communication skills",
    "Active GitHub profile with quality projects",
];

const weaknesses = [
    "Limited experience with cloud platforms",
    "Need more system design knowledge",
    "Interview preparation required",
    "Soft skills development needed",
];

export default function DigitalTwinPage() {
    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Digital Twin</h1>
                    <p className="text-muted-foreground">Your AI-powered career readiness profile</p>
                </div>

                {/* Readiness Scores */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overall Readiness</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart value={78} label="Career Ready" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Placement Probability</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart value={82} label="Placement Chance" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skill Match</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart value={75} label="Industry Alignment" />
                        </CardContent>
                    </Card>
                </div>

                {/* Growth Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Readiness Growth Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart data={growthData} />
                    </CardContent>
                </Card>

                {/* Strengths & Weaknesses */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                                Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {strengths.map((strength, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Badge variant="success">✓</Badge>
                                        <span className="text-sm">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingDown className="h-5 w-5 text-orange-500" />
                                Areas for Improvement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {weaknesses.map((weakness, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Badge variant="warning">!</Badge>
                                        <span className="text-sm">{weakness}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Predictions */}
                <Card>
                    <CardHeader>
                        <CardTitle>AI Predictions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-semibold">Expected Placement Timeline</h4>
                                <Badge variant="info">Prediction</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Based on your current progress, you're likely to receive placement offers within 2-3 months
                            </p>
                        </div>
                        <div className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-semibold">Recommended Focus Areas</h4>
                                <Badge variant="info">Suggestion</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Focus on cloud technologies and system design to maximize your placement opportunities
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
