// app/api/students/me/route.ts
// GET /api/students/me — returns the logged-in student's full profile

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // In production, decode a JWT here. For now we use the vpa_role cookie + a session.
        // We'll read the session userId from a cookie we'll set at login.
        const cookieStore = await cookies();
        const userId = cookieStore.get("vpa_uid")?.value;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const student = await prisma.student.findUnique({
            where: { userId },
            include: {
                user: { select: { id: true, name: true, email: true, role: true } },
                skills: true,
                roadmapMilestones: { orderBy: [{ year: "asc" }, { semester: "asc" }] },
                mentorNotes: {
                    where: { isPrivate: false },
                    include: { author: { select: { name: true, role: true } } },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!student) {
            return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (err) {
        console.error("[GET /api/students/me]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
