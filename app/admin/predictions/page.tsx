import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, TrendingDown } from "lucide-react";

const atRiskStudents = [
    {
        id: 1,
        name: "Rachit Verma",
        department: "Computer Science",
        readiness: 45,
        probability: 38,
        risk: "High",
        factors: ["Low skill proficiency", "No internship experience", "Poor resume quality"],
    },
    {
        id: 2,
        name: "Rachit Patel",
        department: "Electronics",
        readiness: 52,
        probability: 48,
        risk: "Medium",
        factors: ["Missing key skills", "Limited project portfolio"],
    },
    {
        id: 3,
        name: "Rachit Kumar",
        department: "Mechanical",
        readiness: 48,
        probability: 42,
        risk: "High",
        factors: ["Low technical skills", "No certifications", "Weak communication"],
    },
    {
        id: 4,
        name: "David Lee",
        department: "Information Technology",
        readiness: 58,
        probability: 55,
        risk: "Medium",
        factors: ["Needs interview preparation", "Limited practical experience"],
    },
];

export default function PredictionsPage() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Placement Predictions</h1>
                    <p className="text-muted-foreground">AI-powered risk assessment and predictions</p>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                                    <p className="text-2xl font-bold text-red-600">42</p>
                                </div>
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Medium Risk</p>
                                    <p className="text-2xl font-bold text-orange-600">78</p>
                                </div>
                                <TrendingDown className="h-8 w-8 text-orange-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Low Risk</p>
                                    <p className="text-2xl font-bold text-green-600">285</p>
                                </div>
                                <TrendingDown className="h-8 w-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* At-Risk Students */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Students Requiring Intervention
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {atRiskStudents.map((student) => (
                                <Card key={student.id}>
                                    <CardContent className="pt-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-1 text-lg font-semibold">{student.name}</h3>
                                                <p className="text-sm text-muted-foreground">{student.department}</p>
                                            </div>
                                            <Badge variant={student.risk === "High" ? "danger" : "warning"}>
                                                {student.risk} Risk
                                            </Badge>
                                        </div>

                                        <div className="mb-4 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Readiness Score</p>
                                                <p className="text-2xl font-bold">{student.readiness}%</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Placement Probability</p>
                                                <p className="text-2xl font-bold">{student.probability}%</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2 text-sm font-medium">Risk Factors:</p>
                                            <div className="space-y-2">
                                                {student.factors.map((factor, index) => (
                                                    <div key={index} className="flex items-center gap-2 text-sm">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                        <span>{factor}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Button className="w-full">Create Intervention Plan</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Predictions Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Predictions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <h4 className="mb-2 font-semibold">Expected Placement Rate</h4>
                            <p className="text-3xl font-bold text-green-600">76%</p>
                            <p className="text-sm text-muted-foreground">
                                Based on current student readiness and historical data
                            </p>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h4 className="mb-2 font-semibold">Students Needing Support</h4>
                            <p className="text-3xl font-bold text-orange-600">120</p>
                            <p className="text-sm text-muted-foreground">
                                Require targeted interventions to improve placement chances
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
