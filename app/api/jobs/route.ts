// app/api/jobs/route.ts
// GET /api/jobs — list all campus jobs (with optional filters)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get("search") ?? "";
    const type = req.nextUrl.searchParams.get("type");   // Product | Service
    const cgpa = parseFloat(req.nextUrl.searchParams.get("minCgpa") ?? "0");

    const jobs = await prisma.job.findMany({
        where: {
            isActive: true,
            ...(search ? { company: { contains: search } } : {}),
            ...(type ? { type } : {}),
            ...(cgpa ? { minCgpa: { lte: cgpa } } : {}),
        },
        orderBy: { company: "asc" },
    });

    // Parse JSON fields before sending
    const parsed = jobs.map((j) => ({
        ...j,
        roles: JSON.parse(j.roles),
        skills: JSON.parse(j.skills),
        process: JSON.parse(j.process),
        tips: JSON.parse(j.tips),
    }));

    return NextResponse.json(parsed);
}
