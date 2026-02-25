"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import {
    Code2, Flame, Star, Target, Trophy, RefreshCw,
    ExternalLink, TrendingUp, AlertCircle, Loader2, User,
    Search, X, CalendarDays,
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

const MY_USERNAME = "Rachitjain10";

interface LeetCodeData {
    username: string;
    realName: string;
    avatar: string;
    ranking: number;
    reputation: number;
    totalSolved: number;
    totalQuestions: number;
    easy: { solved: number; total: number };
    medium: { solved: number; total: number };
    hard: { solved: number; total: number };
    acceptanceRate: string;
    streak: number;
    totalActiveDays: number;
    submissionCalendar: Record<string, number>;
    topicStats: { topic: string; solved: number }[];
    recentActivity: { title: string; titleSlug: string; time: string; url: string }[];
}

const problemSets = [
    { name: "Grind 75 (SWE Interviews)", progress: 48, total: 75, tag: "Must Do" },
    { name: "NeetCode 150", progress: 62, total: 150, tag: "Recommended" },
    { name: "NMIMS DSA Sheet", progress: 34, total: 80, tag: "College" },
    { name: "SQL 50 (LeetCode)", progress: 18, total: 50, tag: "Database" },
];
const weeklyGoal = { target: 15, current: 7 };

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function fetchLeetCode(username: string): Promise<LeetCodeData> {
    const res = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
    }
    return res.json();
}

// UTC midnight timestamp (seconds) for a calendar date
function utcTs(year: number, month: number, day: number): string {
    return String(Math.floor(Date.UTC(year, month, day) / 1000));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Contribution Graph ───────────────────────────────────────────────────────
function ContributionGraph({
    calendar, streak, totalActiveDays,
}: {
    calendar: Record<string, number>;
    streak: number;
    totalActiveDays: number;
}) {
    const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

    // Build 53 weeks ending today ─────────────────────────────────────────────
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() - 52 * 7); // last 53-week Sunday

    // weeks[w][d] = { date "YYYY-MM-DD", count }
    type DayCell = { dateLabel: string; ts: string; count: number; future: boolean };
    const weeks: DayCell[][] = [];
    let current = new Date(startDate);

    while (current <= today || current.getDay() !== 0) {
        const wIdx = weeks.length - 1;
        if (current.getDay() === 0) weeks.push([]);
        const activeWeek = weeks[weeks.length - 1];
        const ts = utcTs(current.getFullYear(), current.getMonth(), current.getDate());
        activeWeek.push({
            dateLabel: current.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
            ts,
            count: calendar[ts] ?? 0,
            future: current > today,
        });
        current.setDate(current.getDate() + 1);
        if (wIdx === weeks.length - 1 && current.getDay() === 0 && current > today) break;
    }

    // Month label positions ────────────────────────────────────────────────────
    const monthLabels: { label: string; colIdx: number }[] = [];
    weeks.forEach((week, wi) => {
        const firstDay = week[0];
        if (!firstDay) return;
        const ts = Number(firstDay.ts) * 1000;
        const d = new Date(ts);
        if (wi === 0 || d.getUTCDate() <= 7) {
            const label = MONTHS[d.getUTCMonth()];
            if (!monthLabels.length || monthLabels[monthLabels.length - 1].label !== label) {
                monthLabels.push({ label, colIdx: wi });
            }
        }
    });

    // Color scale (LeetCode orange palette) ───────────────────────────────────
    const cellColor = (count: number, future: boolean) => {
        if (future) return "bg-transparent";
        if (count === 0) return "bg-gray-100 dark:bg-gray-800";
        if (count < 2) return "bg-orange-200";
        if (count < 4) return "bg-orange-300";
        if (count < 7) return "bg-orange-500";
        return "bg-orange-700";
    };

    const maxCount = Math.max(...Object.values(calendar), 0);
    const totalInYear = Object.values(calendar).reduce((a, b) => a + b, 0);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-orange-500" /> Submission Activity
                        <Badge variant="success">Live</Badge>
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="font-bold">{streak}</span>
                            <span className="text-muted-foreground">day streak</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span className="font-bold">{totalActiveDays}</span>
                            <span className="text-muted-foreground">active days</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Code2 className="h-4 w-4 text-green-500" />
                            <span className="font-bold">{totalInYear}</span>
                            <span className="text-muted-foreground">submissions this year</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Tooltip */}
                <div className={`mb-3 h-7 rounded-lg px-3 py-1 text-xs text-center transition-all ${hovered ? "bg-secondary text-foreground" : "opacity-0"
                    }`}>
                    {hovered
                        ? `${hovered.count} submission${hovered.count !== 1 ? "s" : ""} on ${hovered.date}`
                        : "·"
                    }
                </div>

                {/* Graph — horizontally scrollable on mobile */}
                <div className="overflow-x-auto pb-2">
                    <div style={{ minWidth: `${weeks.length * 14}px` }}>
                        {/* Month labels */}
                        <div className="flex mb-1" style={{ paddingLeft: "28px" }}>
                            {weeks.map((_, wi) => {
                                const ml = monthLabels.find(m => m.colIdx === wi);
                                return (
                                    <div key={wi} className="w-[11px] mr-[3px] text-[9px] text-muted-foreground font-medium shrink-0">
                                        {ml ? ml.label : ""}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Grid rows (Sun–Sat) */}
                        <div className="flex">
                            {/* Day labels */}
                            <div className="flex flex-col gap-[3px] mr-1 shrink-0">
                                {DAYS.map((d, i) => (
                                    <div key={d} className={`h-[11px] text-[9px] text-muted-foreground flex items-center ${i % 2 === 0 ? "opacity-0" : ""}`}>
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Week columns */}
                            <div className="flex gap-[3px]">
                                {weeks.map((week, wi) => (
                                    <div key={wi} className="flex flex-col gap-[3px]">
                                        {Array.from({ length: 7 }).map((_, di) => {
                                            const cell = week[di];
                                            if (!cell) {
                                                return <div key={di} className="h-[11px] w-[11px]" />;
                                            }
                                            return (
                                                <div
                                                    key={di}
                                                    className={`h-[11px] w-[11px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 ${cellColor(cell.count, cell.future)}`}
                                                    onMouseEnter={() => !cell.future && setHovered({ date: cell.dateLabel, count: cell.count })}
                                                    onMouseLeave={() => setHovered(null)}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-end gap-1.5 mt-3">
                            <span className="text-[10px] text-muted-foreground">Less</span>
                            {["bg-gray-100", "bg-orange-200", "bg-orange-300", "bg-orange-500", "bg-orange-700"].map(c => (
                                <div key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
                            ))}
                            <span className="text-[10px] text-muted-foreground">More</span>
                            <span className="text-[10px] text-muted-foreground ml-3">Peak: {maxCount} submissions</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Reusable sub-components ──────────────────────────────────────────────────
function ProfileCard({ d, accentClass = "from-orange-50 to-yellow-50" }: { d: LeetCodeData; accentClass?: string }) {
    return (
        <div className={`rounded-2xl border bg-gradient-to-r ${accentClass} p-5 flex items-center gap-5`}>
            {d.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.avatar} alt={d.username} className="h-16 w-16 rounded-full border-2 border-white object-cover shadow" />
            ) : (
                <div className="h-16 w-16 rounded-full bg-white/60 border-2 border-white flex items-center justify-center shadow">
                    <User className="h-8 w-8 text-muted-foreground" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-xl font-bold truncate">{d.realName || d.username}</p>
                <p className="text-muted-foreground text-sm">@{d.username}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="warning">🏆 #{d.ranking?.toLocaleString()}</Badge>
                    <Badge variant="success">{d.totalSolved} solved</Badge>
                    <Badge variant="info">⭐ {d.reputation} rep</Badge>
                    {d.streak > 0 && <Badge variant="danger">🔥 {d.streak}d streak</Badge>}
                </div>
            </div>
        </div>
    );
}

function DiffBar({ label, solved, total, colorClass, textClass, bg }: {
    label: string; solved: number; total: number;
    colorClass: string; textClass: string; bg: string;
}) {
    const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0;
    return (
        <div className={`rounded-xl ${bg} border p-4`}>
            <div className="flex items-center justify-between mb-2">
                <span className={`font-bold ${textClass}`}>{label}</span>
                <span className={`text-2xl font-black ${textClass}`}>{solved}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">of {total} problems</p>
            <div className="h-2 w-full bg-white/60 rounded-full overflow-hidden">
                <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(pct)}%</p>
        </div>
    );
}

function CmpRow({ label, mine, theirs, higherIsBetter = true }: {
    label: string; mine: number; theirs: number; higherIsBetter?: boolean;
}) {
    const mineWins = higherIsBetter ? mine >= theirs : mine <= theirs;
    const theirWins = higherIsBetter ? theirs > mine : theirs < mine;
    return (
        <div className="grid grid-cols-3 items-center py-2 border-b last:border-0 text-sm">
            <span className={`font-bold tabular-nums text-right pr-4 ${mineWins ? "text-green-600" : "text-muted-foreground"}`}>
                {mine.toLocaleString()}{mineWins && <span className="ml-1 text-xs">✓</span>}
            </span>
            <span className="text-center text-xs text-muted-foreground font-medium">{label}</span>
            <span className={`font-bold tabular-nums text-left pl-4 ${theirWins ? "text-green-600" : "text-muted-foreground"}`}>
                {theirs.toLocaleString()}{theirWins && <span className="ml-1 text-xs">✓</span>}
            </span>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LeetCodePage() {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastSync, setLastSync] = useState("");

    const [lookupInput, setLookupInput] = useState("");
    const [lookupData, setLookupData] = useState<LeetCodeData | null>(null);
    const [lookupLoading, setLookupLoading] = useState(false);
    const [lookupError, setLookupError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const fetchMine = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const d = await fetchLeetCode(MY_USERNAME);
            setData(d);
            setLastSync(new Date().toLocaleTimeString());
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchMine(); }, [fetchMine]);

    const handleLookup = useCallback(async () => {
        const username = lookupInput.trim();
        if (!username) { inputRef.current?.focus(); return; }
        if (username.toLowerCase() === MY_USERNAME.toLowerCase()) {
            setLookupError("That's already your profile above!"); return;
        }
        setLookupLoading(true);
        setLookupError(null);
        setLookupData(null);
        try {
            setLookupData(await fetchLeetCode(username));
        } catch (e: unknown) {
            setLookupError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLookupLoading(false);
        }
    }, [lookupInput]);

    const clearLookup = () => {
        setLookupData(null);
        setLookupError(null);
        setLookupInput("");
        inputRef.current?.focus();
    };

    return (
        <DashboardLayout role="student" userName="Rachit Jain" userYear="3rd Year" userProgram="B.Tech CSE (Data Science)">
            <div className="space-y-6 animate-fade-in-up">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Code2 className="h-8 w-8 text-orange-500" /> LeetCode Tracker
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2 mt-0.5">
                            @{MY_USERNAME}
                            {lastSync && !loading && <span className="text-xs">• Synced at {lastSync}</span>}
                            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2" onClick={fetchMine} disabled={loading}>
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                            {loading ? "Syncing…" : "Sync Now"}
                        </Button>
                        <a href={`https://leetcode.com/u/${MY_USERNAME}`} target="_blank" rel="noreferrer">
                            <Button className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" /> Open LeetCode
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="font-semibold text-red-700 text-sm">Could not fetch live data: {error}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={fetchMine}>Retry</Button>
                    </div>
                )}

                {/* Loading skeleton */}
                {loading && !data && (
                    <div className="grid gap-4 md:grid-cols-4">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="pt-5">
                                    <div className="h-4 bg-secondary rounded w-2/3 mb-3" />
                                    <div className="h-8 bg-secondary rounded w-1/2 mb-2" />
                                    <div className="h-3 bg-secondary rounded w-3/4" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* ═════════════════ MY PROFILE DATA ═════════════════ */}
                {data && (
                    <>
                        <ProfileCard d={data} accentClass="from-orange-50 to-yellow-50" />

                        {/* Stats Hero */}
                        <div className="grid gap-4 md:grid-cols-4">
                            {[
                                { label: "Total Solved", value: `${data.totalSolved}`, sub: `of ${data.totalQuestions} problems`, icon: Trophy, color: "text-foreground", bg: "bg-secondary" },
                                { label: "Global Rank", value: `#${data.ranking?.toLocaleString()}`, sub: "Worldwide", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
                                { label: "Streak", value: `${data.streak} days`, sub: `${data.totalActiveDays} active days`, icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
                                { label: "Hard Solved", value: `${data.hard.solved}`, sub: `of ${data.hard.total} hard problems`, icon: Target, color: "text-red-600", bg: "bg-red-50" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <Card key={i} className="card-hover">
                                        <CardContent className="pt-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">{s.label}</p>
                                                    <p className="text-2xl font-bold mt-1">{s.value}</p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                                                </div>
                                                <div className={`rounded-xl p-2.5 ${s.bg}`}><Icon className={`h-6 w-6 ${s.color}`} /></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* ── CONTRIBUTION GRAPH ── */}
                        <ContributionGraph
                            calendar={data.submissionCalendar}
                            streak={data.streak}
                            totalActiveDays={data.totalActiveDays}
                        />

                        {/* Difficulty Breakdown */}
                        <Card>
                            <CardHeader><CardTitle>Problems by Difficulty</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <DiffBar label="Easy" solved={data.easy.solved} total={data.easy.total} colorClass="bg-green-500" textClass="text-green-700" bg="bg-green-50" />
                                    <DiffBar label="Medium" solved={data.medium.solved} total={data.medium.total} colorClass="bg-yellow-500" textClass="text-yellow-700" bg="bg-yellow-50" />
                                    <DiffBar label="Hard" solved={data.hard.solved} total={data.hard.total} colorClass="bg-red-500" textClass="text-red-700" bg="bg-red-50" />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Weekly Goal */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Weekly Goal</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center mb-4">
                                        <div className="text-5xl font-bold">{weeklyGoal.current}</div>
                                        <p className="text-muted-foreground">of {weeklyGoal.target} problems this week</p>
                                    </div>
                                    <Progress value={(weeklyGoal.current / weeklyGoal.target) * 100} />
                                    <div className="mt-3 flex gap-2 flex-wrap">
                                        {Array.from({ length: weeklyGoal.target }).map((_, i) => (
                                            <div key={i} className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${i < weeklyGoal.current ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"}`}>
                                                {i < weeklyGoal.current ? "✓" : i + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-3 text-xs text-muted-foreground">{weeklyGoal.target - weeklyGoal.current} more to reach your weekly goal!</p>
                                </CardContent>
                            </Card>

                            {/* Topic Stats */}
                            <Card>
                                <CardHeader><CardTitle>Top Topics (Live)</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    {data.topicStats.length > 0 ? data.topicStats.map(t => {
                                        const max = data.topicStats[0]?.solved || 1;
                                        return (
                                            <div key={t.topic}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">{t.topic}</span>
                                                    <span className="text-muted-foreground">{t.solved} solved</span>
                                                </div>
                                                <Progress value={(t.solved / max) * 100} />
                                            </div>
                                        );
                                    }) : <p className="text-sm text-muted-foreground">No topic data.</p>}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Submissions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code2 className="h-5 w-5 text-orange-500" /> Recent Accepted Submissions
                                    <Badge variant="success" className="ml-auto">Live</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {data.recentActivity.length > 0 ? data.recentActivity.map((a, i) => (
                                        <a key={i} href={a.url} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-4 rounded-xl border p-3 hover:bg-secondary/40 transition-colors group">
                                            <div className="h-2 w-2 rounded-full shrink-0 bg-green-500" />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm group-hover:text-primary transition-colors">{a.title}</p>
                                                <p className="text-xs text-muted-foreground">{a.time}</p>
                                            </div>
                                            <Badge variant="success">Accepted</Badge>
                                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )) : <p className="text-sm text-muted-foreground">No recent submissions found.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* ═════════════════ LOOKUP SECTION ═════════════════ */}
                <Card className="border-2 border-dashed border-primary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-primary" /> Look Up Any LeetCode User
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={lookupInput}
                                    onChange={e => setLookupInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleLookup()}
                                    placeholder="Enter LeetCode username…"
                                    className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                                    disabled={lookupLoading}
                                />
                            </div>
                            <Button onClick={handleLookup} disabled={lookupLoading || !lookupInput.trim()} className="gap-2 shrink-0">
                                {lookupLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Fetching…</> : <><Search className="h-4 w-4" /> Search</>}
                            </Button>
                            {(lookupData || lookupError) && (
                                <Button variant="ghost" onClick={clearLookup} className="gap-1 shrink-0">
                                    <X className="h-4 w-4" /> Clear
                                </Button>
                            )}
                        </div>

                        {lookupError && (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <div><p className="font-semibold text-red-700 text-sm">Could not find user</p><p className="text-red-600 text-sm">{lookupError}</p></div>
                            </div>
                        )}
                        {lookupLoading && (
                            <div className="mt-4 flex items-center gap-3 text-muted-foreground text-sm">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                Fetching profile for <strong>@{lookupInput}</strong>…
                            </div>
                        )}

                        {lookupData && (
                            <div className="mt-5 space-y-5">
                                <ProfileCard d={lookupData} accentClass="from-blue-50 to-indigo-50" />

                                {/* Their contribution graph */}
                                <ContributionGraph
                                    calendar={lookupData.submissionCalendar}
                                    streak={lookupData.streak}
                                    totalActiveDays={lookupData.totalActiveDays}
                                />

                                <div className="grid gap-4 md:grid-cols-3">
                                    <DiffBar label="Easy" solved={lookupData.easy.solved} total={lookupData.easy.total} colorClass="bg-green-500" textClass="text-green-700" bg="bg-green-50" />
                                    <DiffBar label="Medium" solved={lookupData.medium.solved} total={lookupData.medium.total} colorClass="bg-yellow-500" textClass="text-yellow-700" bg="bg-yellow-50" />
                                    <DiffBar label="Hard" solved={lookupData.hard.solved} total={lookupData.hard.total} colorClass="bg-red-500" textClass="text-red-700" bg="bg-red-50" />
                                </div>

                                {data && (
                                    <Card>
                                        <CardHeader><CardTitle className="text-base">⚡ Head-to-Head Comparison</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-3 text-sm font-semibold mb-2 pb-2 border-b">
                                                <span className="text-right pr-4 text-orange-600 truncate">@{data.username}</span>
                                                <span className="text-center text-muted-foreground">Stat</span>
                                                <span className="text-left pl-4 text-indigo-600 truncate">@{lookupData.username}</span>
                                            </div>
                                            <CmpRow label="Total Solved" mine={data.totalSolved} theirs={lookupData.totalSolved} />
                                            <CmpRow label="Easy Solved" mine={data.easy.solved} theirs={lookupData.easy.solved} />
                                            <CmpRow label="Medium Solved" mine={data.medium.solved} theirs={lookupData.medium.solved} />
                                            <CmpRow label="Hard Solved" mine={data.hard.solved} theirs={lookupData.hard.solved} />
                                            <CmpRow label="Streak (days)" mine={data.streak} theirs={lookupData.streak} />
                                            <CmpRow label="Global Rank" mine={data.ranking} theirs={lookupData.ranking} higherIsBetter={false} />
                                        </CardContent>
                                    </Card>
                                )}

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <Code2 className="h-4 w-4 text-indigo-500" /> @{lookupData.username}'s Recent Submissions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {lookupData.recentActivity.length > 0 ? lookupData.recentActivity.map((a, i) => (
                                                <a key={i} href={a.url} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-4 rounded-xl border p-3 hover:bg-secondary/40 transition-colors group">
                                                    <div className="h-2 w-2 rounded-full shrink-0 bg-green-500" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{a.title}</p>
                                                        <p className="text-xs text-muted-foreground">{a.time}</p>
                                                    </div>
                                                    <Badge variant="success">Accepted</Badge>
                                                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            )) : <p className="text-sm text-muted-foreground">No recent submissions found.</p>}
                                        </div>
                                    </CardContent>
                                </Card>

                                <a href={`https://leetcode.com/u/${lookupData.username}`} target="_blank" rel="noreferrer" className="block">
                                    <Button variant="outline" className="w-full gap-2">
                                        <ExternalLink className="h-4 w-4" /> Open @{lookupData.username} on LeetCode
                                    </Button>
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ═════════════════ PROBLEM SETS ═════════════════ */}
                <Card>
                    <CardHeader><CardTitle>Tracked Problem Sets</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {problemSets.map(ps => (
                            <div key={ps.name} className="rounded-xl border p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold">{ps.name}</h4>
                                        <p className="text-xs text-muted-foreground">{ps.progress} / {ps.total} completed</p>
                                    </div>
                                    <Badge variant={ps.tag === "Must Do" ? "danger" : ps.tag === "Recommended" ? "warning" : "info"}>{ps.tag}</Badge>
                                </div>
                                <Progress value={(ps.progress / ps.total) * 100} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
