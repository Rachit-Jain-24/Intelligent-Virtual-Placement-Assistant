// app/api/prep-tasks/route.ts
// GET  /api/prep-tasks?company=Amazon  — list tasks for a company
// POST /api/prep-tasks                 — create a new task
// PATCH /api/prep-tasks/[id]          — toggle completed status (see [id]/route.ts)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getStudentId(): Promise<string | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get("vpa_uid")?.value;
    if (!userId) return null;
    const s = await prisma.student.findUnique({ where: { userId }, select: { id: true } });
    return s?.id ?? null;
}

// GET — list prep tasks (optionally filtered by company)
export async function GET(req: NextRequest) {
    const studentId = await getStudentId();
    if (!studentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = req.nextUrl.searchParams.get("company");

    const tasks = await prisma.prepTask.findMany({
        where: { studentId, ...(company ? { company } : {}) },
        orderBy: [{ company: "asc" }, { category: "asc" }],
    });

    return NextResponse.json(tasks);
}

// POST — create a new prep task
export async function POST(req: NextRequest) {
    const studentId = await getStudentId();
    if (!studentId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { company, task, category } = body;

    if (!company || !task || !category) {
        return NextResponse.json({ error: "company, task, and category are required" }, { status: 400 });
    }

    const newTask = await prisma.prepTask.create({
        data: { studentId, company, task, category },
    });

    return NextResponse.json(newTask, { status: 201 });
}
