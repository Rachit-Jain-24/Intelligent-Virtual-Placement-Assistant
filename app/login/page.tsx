"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Eye, EyeOff, GraduationCap, LogIn, AlertCircle, Sparkles
} from "lucide-react";
import { getUserByCredentials, setSession, getSession, dashboardForRole } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextPath = searchParams.get("next");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        const session = getSession();
        if (session) router.replace(dashboardForRole(session.role));
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }
        setLoading(true);
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 600));
        const user = getUserByCredentials(email.trim(), password);
        setLoading(false);
        if (!user) {
            setError("Incorrect email or password. Please try again.");
            return;
        }
        setSession(user);
        router.push(nextPath ?? dashboardForRole(user.role));
    }

    return (
        <div className="min-h-screen flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#6d28d9]">
                {/* Decorative blobs */}
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-16 right-8 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white">VPA</p>
                        <p className="text-xs text-blue-200">NMIMS Hyderabad</p>
                    </div>
                </div>

                {/* Hero text */}
                <div className="relative space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-blue-100 backdrop-blur-sm border border-white/20">
                        <Sparkles className="h-3.5 w-3.5" />
                        AI-Powered Placement Platform
                    </div>
                    <h1 className="text-4xl font-extrabold leading-tight text-white">
                        Your Career,<br />Your Journey.
                    </h1>
                    <p className="text-base text-blue-100 leading-relaxed max-w-sm">
                        The Virtual Placement Assistant helps NMIMS students discover their strengths, close skill gaps, and land their dream roles.
                    </p>

                    {/* Feature chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["AI Resume Analyser", "Career Roadmap", "LeetCode Tracker", "Mentor Portal"].map(f => (
                            <span key={f} className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer quote */}
                <p className="relative text-xs text-blue-200 italic">
                    "Success is where preparation and opportunity meet." — Bobby Unser
                </p>
            </div>

            {/* Right panel — form */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-[#fafafa]">
                {/* Mobile logo */}
                <div className="mb-8 flex items-center gap-3 lg:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">VPA — NMIMS Hyderabad</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to your VPA account to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error banner */}
                        {error && (
                            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@vpa.edu"
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPw ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    tabIndex={-1}
                                >
                                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <LogIn className="h-4 w-4" />
                                    Sign in
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo credentials hint */}
                    <details className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <summary className="cursor-pointer select-none px-4 py-3 text-xs font-medium text-gray-500 hover:text-gray-700">
                            🔑 Demo credentials (click to expand)
                        </summary>
                        <div className="border-t px-4 pb-4 pt-3">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-gray-400">
                                        <th className="text-left pb-1 font-medium">Role</th>
                                        <th className="text-left pb-1 font-medium">Email</th>
                                        <th className="text-left pb-1 font-medium">Password</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        ["Student", "student@vpa.edu", "student123"],
                                        ["Faculty Mentor", "mentor@vpa.edu", "mentor123"],
                                        ["Coordinator", "coordinator@vpa.edu", "coord123"],
                                        ["Admin", "admin@vpa.edu", "admin123"],
                                        ["Alumni", "alumni@vpa.edu", "alumni123"],
                                    ].map(([role, em, pw]) => (
                                        <tr key={role} className="text-gray-600">
                                            <td className="py-1.5 pr-2 font-medium">{role}</td>
                                            <td className="py-1.5 pr-2 font-mono text-blue-600 cursor-pointer hover:underline"
                                                onClick={() => setEmail(em)}>{em}</td>
                                            <td className="py-1.5 font-mono">{pw}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </details>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
