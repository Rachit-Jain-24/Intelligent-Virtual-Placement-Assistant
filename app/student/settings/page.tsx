"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        emailNotifications: true,
        pushNotifications: false,
        weeklyDigest: true,
        profileVisibility: "public",
    });

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences</p>
                </div>

                {/* Password */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Current Password"
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        />
                        <Input
                            label="New Password"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        <Button>Update Password</Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive updates via email</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={formData.emailNotifications}
                                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                                className="h-4 w-4"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={formData.pushNotifications}
                                onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                                className="h-4 w-4"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Weekly Digest</p>
                                <p className="text-sm text-muted-foreground">Get a weekly summary of your progress</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={formData.weeklyDigest}
                                onChange={(e) => setFormData({ ...formData, weeklyDigest: e.target.checked })}
                                className="h-4 w-4"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                    <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Profile Visibility</label>
                            <select
                                value={formData.profileVisibility}
                                onChange={(e) => setFormData({ ...formData, profileVisibility: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="connections">Connections Only</option>
                            </select>
                        </div>
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                            <p className="text-sm">
                                <strong>Note:</strong> Making your profile public allows recruiters to discover you based on your skills and readiness score.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
