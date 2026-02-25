import { NextRequest, NextResponse } from "next/server";

const LEETCODE_GQL = "https://leetcode.com/graphql/";

const PROFILE_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
      realName
      userAvatar
      reputation
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    tagProblemCounts {
      advanced {
        tagName
        tagSlug
        problemsSolved
      }
      intermediate {
        tagName
        tagSlug
        problemsSolved
      }
      fundamental {
        tagName
        tagSlug
        problemsSolved
      }
    }
    userCalendar {
      streak
      totalActiveDays
      submissionCalendar
    }
  }
  allQuestionsCount {
    difficulty
    count
  }
  recentAcSubmissionList(username: $username, limit: 10) {
    id
    title
    titleSlug
    timestamp
  }
}
`;

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username") || "Rachitjain10";

  try {
    const res = await fetch(LEETCODE_GQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: { username },
      }),
      next: { revalidate: 300 }, // cache 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json({ error: "LeetCode API unreachable" }, { status: 502 });
    }

    const json = await res.json();

    if (!json.data?.matchedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = json.data.matchedUser;
    const allQ: { difficulty: string; count: number }[] = json.data.allQuestionsCount ?? [];
    const recent: { id: string; title: string; titleSlug: string; timestamp: string }[] =
      json.data.recentAcSubmissionList ?? [];

    // Parse submission stats
    const stats: Record<string, { count: number; submissions: number }> = {};
    for (const s of user.submitStats.acSubmissionNum) {
      stats[s.difficulty] = { count: s.count, submissions: s.submissions };
    }

    // Total questions per difficulty
    const totalMap: Record<string, number> = {};
    for (const q of allQ) totalMap[q.difficulty] = q.count;

    // Accept rate
    const acAll = stats["All"]?.submissions ?? 0;
    const totalSub = acAll > 0 ? acAll : 1;
    const acceptRate = totalSub > 0 ? ((acAll / totalSub) * 100).toFixed(1) : "N/A";

    // Top topic tags (merge all levels, sort by solved)
    const allTags = [
      ...(user.tagProblemCounts?.advanced ?? []),
      ...(user.tagProblemCounts?.intermediate ?? []),
      ...(user.tagProblemCounts?.fundamental ?? []),
    ]
      .sort((a: { problemsSolved: number }, b: { problemsSolved: number }) => b.problemsSolved - a.problemsSolved)
      .slice(0, 8);

    // Parse submission calendar — LeetCode gives a JSON string
    let submissionCalendar: Record<string, number> = {};
    try {
      const raw = user.userCalendar?.submissionCalendar;
      if (raw) submissionCalendar = JSON.parse(raw);
    } catch {
      submissionCalendar = {};
    }

    // Dedupe recent submissions
    const seen = new Set<string>();
    const recentUnique = recent
      .filter((r) => {
        if (seen.has(r.titleSlug)) return false;
        seen.add(r.titleSlug);
        return true;
      })
      .map((r) => ({
        title: r.title,
        titleSlug: r.titleSlug,
        time: formatTime(Number(r.timestamp)),
        url: `https://leetcode.com/problems/${r.titleSlug}/`,
      }));

    return NextResponse.json({
      username: user.username,
      realName: user.profile.realName || user.username,
      avatar: user.profile.userAvatar,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      totalSolved: stats["All"]?.count ?? 0,
      totalQuestions: totalMap["All"] ?? 0,
      easy: { solved: stats["Easy"]?.count ?? 0, total: totalMap["Easy"] ?? 0 },
      medium: { solved: stats["Medium"]?.count ?? 0, total: totalMap["Medium"] ?? 0 },
      hard: { solved: stats["Hard"]?.count ?? 0, total: totalMap["Hard"] ?? 0 },
      acceptanceRate: `${acceptRate}%`,
      streak: user.userCalendar?.streak ?? 0,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
      submissionCalendar,
      topicStats: allTags.map((t: { tagName: string; problemsSolved: number }) => ({
        topic: t.tagName,
        solved: t.problemsSolved,
      })),
      recentActivity: recentUnique,
    });
  } catch (err) {
    console.error("LeetCode proxy error:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

function formatTime(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(ts * 1000).toLocaleDateString();
}
