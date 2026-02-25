// app/api/prep-tasks/[id]/route.ts
// PATCH /api/prep-tasks/:id — toggle completed / update task
// DELETE /api/prep-tasks/:id — delete a task

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    const task = await prisma.prepTask.update({
        where: { id },
        data: {
            completed: body.completed,
            completedAt: body.completed ? new Date() : null,
        },
    });

    return NextResponse.json(task);
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await prisma.prepTask.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
