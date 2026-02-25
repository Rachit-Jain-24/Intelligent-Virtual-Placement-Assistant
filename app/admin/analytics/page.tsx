import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart } from "@/components/charts/BarChart";

const skillDistribution = [
    { name: "React", value: 245 },
    { name: "Python", value: 198 },
    { name: "JavaScript", value: 312 },
    { name: "Java", value: 156 },
    { name: "Node.js", value: 187 },
    { name: "SQL", value: 223 },
];

const departmentComparison = [
    { name: "CS", value: 78 },
    { name: "IT", value: 72 },
    { name: "ECE", value: 65 },
    { name: "Mech", value: 58 },
];

const topSkills = [
    { skill: "JavaScript", students: 312, avgLevel: 78 },
    { skill: "Python", students: 198, avgLevel: 72 },
    { skill: "React", students: 245, avgLevel: 75 },
    { skill: "SQL", students: 223, avgLevel: 68 },
];

export default function AnalyticsPage() {
    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">Comprehensive skill and performance analytics</p>
                </div>

                {/* Skill Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Distribution Across Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart data={skillDistribution} />
                    </CardContent>
                </Card>

                {/* Department Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Average Readiness by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BarChart data={departmentComparison} />
                    </CardContent>
                </Card>

                {/* Top Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle>Most Common Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topSkills.map((skill, index) => (
                                <div key={skill.skill} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{skill.skill}</p>
                                            <p className="text-sm text-muted-foreground">{skill.students} students</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{skill.avgLevel}%</p>
                                        <p className="text-sm text-muted-foreground">Avg Level</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">156</p>
                                <p className="text-sm text-muted-foreground">Total Unique Skills</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">8.2</p>
                                <p className="text-sm text-muted-foreground">Avg Skills per Student</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold">68%</p>
                                <p className="text-sm text-muted-foreground">Overall Skill Proficiency</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
