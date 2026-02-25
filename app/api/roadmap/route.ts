// app/api/roadmap/route.ts
// GET   /api/roadmap   — fetch student's roadmap milestones
// PATCH /api/roadmap/[id] — toggle milestone completion (see [id]/route.ts)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("vpa_uid")?.value;
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const student = await prisma.student.findUnique({
        where: { userId },
        select: { id: true },
    });
    if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const milestones = await prisma.roadmapMilestone.findMany({
        where: { studentId: student.id },
        orderBy: [{ year: "asc" }, { semester: "asc" }],
    });

    return NextResponse.json(milestones);
}
