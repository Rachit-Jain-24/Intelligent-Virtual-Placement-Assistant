"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

export default function ResumeAnalyzerPage() {
    const [uploaded, setUploaded] = useState(false);

    const handleUpload = () => {
        setUploaded(true);
    };

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Resume Analyzer</h1>
                    <p className="text-muted-foreground">Upload and analyze your resume for ATS compatibility</p>
                </div>

                {/* Upload Section */}
                {!uploaded ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12">
                                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold">Upload Your Resume</h3>
                                <p className="mb-4 text-sm text-muted-foreground">Drag and drop or click to browse</p>
                                <Button onClick={handleUpload}>Choose File</Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* ATS Score */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>ATS Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <GaugeChart value={82} label="ATS Compatibility" />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resume Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm">rachit_resume.pdf</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Format</span>
                                            <Badge variant="success">PDF</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Length</span>
                                            <span>1 page</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Sections</span>
                                            <span>6</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Extracted Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Extracted Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "JavaScript", "TypeScript", "Node.js", "Python", "MongoDB", "AWS", "Docker", "Git", "REST APIs", "GraphQL", "Agile"].map((skill) => (
                                        <Badge key={skill} variant="info">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Parsed Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Parsed Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="mb-2 font-semibold">Contact Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <p>Name: Rachit Jain</p>
                                        <p>Email: rachit@university.edu</p>
                                        <p>Phone: +1 234 567 8900</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-semibold">Education</h4>
                                    <p className="text-sm">B.Tech in Computer Science, University Name (2021-2025)</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-semibold">Experience</h4>
                                    <p className="text-sm">Software Engineering Intern at TechCorp Inc.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Suggestions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Improvement Suggestions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950">
                                    <Badge variant="warning">Action Required</Badge>
                                    <div className="flex-1">
                                        <p className="font-medium">Add quantifiable achievements</p>
                                        <p className="text-sm text-muted-foreground">Include metrics and numbers to demonstrate impact</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
                                    <Badge variant="info">Tip</Badge>
                                    <div className="flex-1">
                                        <p className="font-medium">Use action verbs</p>
                                        <p className="text-sm text-muted-foreground">Start bullet points with strong action verbs</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
                                    <Badge variant="success">Good</Badge>
                                    <div className="flex-1">
                                        <p className="font-medium">Clean formatting</p>
                                        <p className="text-sm text-muted-foreground">Your resume has consistent formatting</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setUploaded(false)}>Upload New Resume</Button>
                            <Button>Download Optimized Version</Button>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
