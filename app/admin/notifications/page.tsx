"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Send } from "lucide-react";
import { useState } from "react";

const recentNotifications = [
    {
        id: 1,
        title: "Resume Workshop Reminder",
        message: "Don't forget to attend the resume workshop tomorrow at 2 PM",
        recipients: 245,
        sentDate: "2024-02-03",
        status: "sent",
    },
    {
        id: 2,
        title: "Skill Assessment Deadline",
        message: "Complete your skill assessment by Friday to get personalized recommendations",
        recipients: 405,
        sentDate: "2024-02-01",
        status: "sent",
    },
    {
        id: 3,
        title: "New Job Opportunities",
        message: "Check out the latest job postings in the recommendations section",
        recipients: 312,
        sentDate: "2024-01-30",
        status: "sent",
    },
];

export default function NotificationsPage() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        recipients: "all",
    });

    const handleSend = () => {
        if (!formData.title || !formData.message) {
            alert("Please fill in all fields");
            return;
        }
        alert("Notification sent successfully!");
        setFormData({ title: "", message: "", recipients: "all" });
    };

    return (
        <DashboardLayout role="admin" userName="Admin User">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    <p className="text-muted-foreground">Send bulk messages to students</p>
                </div>

                {/* Send Notification */}
                <Card>
                    <CardHeader>
                        <CardTitle>Send New Notification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Notification title"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Enter your message"
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Recipients</label>
                            <select
                                value={formData.recipients}
                                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="all">All Students (405)</option>
                                <option value="cs">Computer Science (120)</option>
                                <option value="it">Information Technology (95)</option>
                                <option value="ece">Electronics (80)</option>
                                <option value="mech">Mechanical (110)</option>
                                <option value="at-risk">At-Risk Students (42)</option>
                            </select>
                        </div>
                        <Button onClick={handleSend} className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Send Notification
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentNotifications.map((notif) => (
                                <div key={notif.id} className="rounded-lg border p-4">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{notif.title}</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">{notif.message}</p>
                                        </div>
                                        <Badge variant="success">{notif.status}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{notif.recipients} recipients</span>
                                        <span>•</span>
                                        <span>Sent on {new Date(notif.sentDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Templates */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2">
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() =>
                                    setFormData({
                                        title: "Workshop Reminder",
                                        message: "Don't forget to attend the upcoming workshop...",
                                        recipients: "all",
                                    })
                                }
                            >
                                Workshop Reminder
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() =>
                                    setFormData({
                                        title: "Deadline Alert",
                                        message: "Important deadline approaching...",
                                        recipients: "all",
                                    })
                                }
                            >
                                Deadline Alert
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() =>
                                    setFormData({
                                        title: "New Opportunities",
                                        message: "New job opportunities available...",
                                        recipients: "all",
                                    })
                                }
                            >
                                New Opportunities
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() =>
                                    setFormData({
                                        title: "Skill Development",
                                        message: "Recommended courses for skill development...",
                                        recipients: "at-risk",
                                    })
                                }
                            >
                                Skill Development
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
