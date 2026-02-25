import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { AlertTriangle } from "lucide-react";

const skillGaps = [
    { skill: "Docker", missing: 245, demand: "High", avgIndustry: 85 },
    { skill: "Kubernetes", missing: 298, demand: "High", avgIndustry: 78 },
    { skill: "AWS", missing: 187, demand: "High", avgIndustry: 82 },
    { skill: "System Design", missing: 312, demand: "High", avgIndustry: 75 },
    { skill: "GraphQL", missing: 156, demand: "Medium", avgIndustry: 68 },
    { skill: "TypeScript", missing: 134, demand: "Medium", avgIndustry: 72 },
];

const departmentGaps = [
    { department: "Computer Science", topGap: "System Design", students: 78 },
    { department: "Information Technology", topGap: "Cloud Computing", students: 65 },
    { department: "Electronics", topGap: "Programming", students: 92 },
    { department: "Mechanical", topGap: "CAD Software", students: 88 },
];

export default function SkillGapsPage() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Skill Gap Insights</h1>
                    <p className="text-muted-foreground">Identify and address critical skill deficiencies</p>
                </div>

                {/* Critical Gaps */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Critical Skill Gaps
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {skillGaps.map((gap) => (
                                <div key={gap.skill} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{gap.skill}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {gap.missing} students missing this skill
                                            </p>
                                        </div>
                                        <Badge variant={gap.demand === "High" ? "danger" : "warning"}>
                                            {gap.demand} Demand
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Industry Average</span>
                                            <span>{gap.avgIndustry}%</span>
                                        </div>
                                        <Progress value={gap.avgIndustry} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Department-wise Gaps */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Skill Gap by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {departmentGaps.map((dept) => (
                                <div key={dept.department} className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <p className="font-semibold">{dept.department}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Top Gap: {dept.topGap}
                                        </p>
                                    </div>
                                    <Badge variant="warning">{dept.students} students affected</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                            <h4 className="mb-2 font-semibold">Organize Workshops</h4>
                            <p className="text-sm text-muted-foreground">
                                Conduct Docker and Kubernetes workshops to address the most critical gaps
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                            <h4 className="mb-2 font-semibold">Partner with Cloud Providers</h4>
                            <p className="text-sm text-muted-foreground">
                                Collaborate with AWS/Azure for certification programs
                            </p>
                        </div>
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
                            <h4 className="mb-2 font-semibold">Curriculum Updates</h4>
                            <p className="text-sm text-muted-foreground">
                                Include System Design and modern DevOps tools in the curriculum
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
