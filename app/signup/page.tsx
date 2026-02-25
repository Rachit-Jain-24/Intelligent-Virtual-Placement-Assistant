"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Eye, EyeOff, GraduationCap, UserPlus, AlertCircle, CheckCircle2, ChevronDown
} from "lucide-react";
import { registerUser, setSession, dashboardForRole } from "@/lib/auth";
import type { UserRole } from "@/components/layout/Sidebar";

const AVAILABLE_ROLES: { value: UserRole; label: string; description: string }[] = [
    { value: "student", label: "Student", description: "Explore career paths and track your placement readiness" },
    { value: "faculty_mentor", label: "Faculty Mentor", description: "Monitor and guide your assigned mentees" },
    { value: "course_coordinator", label: "Course Coordinator", description: "Manage curriculum and career alignment" },
    { value: "alumni", label: "Alumni", description: "Give back and stay connected with the college network" },
];

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<UserRole>("student");
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const result = registerUser({ name: name.trim(), email: email.trim(), password, role });
        setLoading(false);

        if (!result.success) {
            setError(result.error);
            return;
        }
        setSession(result.user);
        router.push(dashboardForRole(role));
    }

    return (
        <div className="min-h-screen flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#065f46] via-[#047857] to-[#1d4ed8]">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-16 right-8 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white">VPA</p>
                        <p className="text-xs text-emerald-200">NMIMS Hyderabad</p>
                    </div>
                </div>

                <div className="relative space-y-5">
                    <h1 className="text-4xl font-extrabold leading-tight text-white">
                        Join the<br />VPA Community.
                    </h1>
                    <p className="text-base text-emerald-100 leading-relaxed max-w-sm">
                        Create your account and get instant access to personalized career tools, mentor guidance, and AI-powered placement insights.
                    </p>

                    <div className="space-y-3 pt-2">
                        {[
                            ["🎯", "Personalized career roadmap"],
                            ["🤖", "AI mentor available 24 / 7"],
                            ["📊", "Real-time placement analytics"],
                            ["🏆", "LeetCode & skill tracking"],
                        ].map(([emoji, text]) => (
                            <div key={text} className="flex items-center gap-3">
                                <span className="text-lg">{emoji}</span>
                                <span className="text-sm text-emerald-50">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative text-xs text-emerald-200 italic">
                    "The future belongs to those who prepare for it today." — Malcolm X
                </p>
            </div>

            {/* Right panel — form */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-[#fafafa] overflow-y-auto">
                <div className="mb-8 flex items-center gap-3 lg:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600 shadow">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">VPA — NMIMS Hyderabad</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Create account</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started with your free VPA account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error banner */}
                        {error && (
                            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        {/* Full name */}
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Rachit Jain"
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@nmims.edu.in"
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>

                        {/* Role selector */}
                        <div className="space-y-1.5">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                I am a…
                            </label>
                            <div className="relative">
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value as UserRole)}
                                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-9"
                                >
                                    {AVAILABLE_ROLES.map((r) => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-400">
                                {AVAILABLE_ROLES.find((r) => r.value === role)?.description}
                            </p>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signup-password"
                                    type={showPw ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)} tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm-password"
                                    type={showConfirmPw ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                {/* Match indicator */}
                                {confirmPassword && (
                                    <div className="absolute -right-7 top-1/2 -translate-y-1/2">
                                        {password === confirmPassword
                                            ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            : <AlertCircle className="h-4 w-4 text-red-400" />}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    Creating account…
                                </>
                            ) : (
                                <>
                                    <UserPlus className="h-4 w-4" />
                                    Create account
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
