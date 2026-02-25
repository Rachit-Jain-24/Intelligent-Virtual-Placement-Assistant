// app/api/roadmap/[id]/route.ts
// PATCH /api/roadmap/:id — toggle milestone completion

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    const milestone = await prisma.roadmapMilestone.update({
        where: { id },
        data: {
            completed: body.completed,
            completedAt: body.completed ? new Date() : null,
        },
    });

    return NextResponse.json(milestone);
}
