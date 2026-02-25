import { NextRequest, NextResponse } from "next/server";

// Routes that don't require authentication
const PUBLIC_PATHS = ["/login", "/signup"];

// Maps a role prefix to the allowed URL prefix(es)
const ROLE_PREFIXES: Record<string, string[]> = {
    student: ["/student"],
    faculty_mentor: ["/faculty-mentor"],
    course_coordinator: ["/coordinator"],
    alumni: ["/student"],   // alumni re-uses student pages
    admin: ["/admin"],
    dean: ["/admin"],
    director: ["/admin"],
    program_chair: ["/admin"],
    placement_dept: ["/admin"],
};

const ROLE_HOME: Record<string, string> = {
    student: "/student/dashboard",
    faculty_mentor: "/faculty-mentor/dashboard",
    course_coordinator: "/coordinator/dashboard",
    alumni: "/student/dashboard",
    admin: "/admin/dashboard",
    dean: "/admin/dashboard",
    director: "/admin/dashboard",
    program_chair: "/admin/dashboard",
    placement_dept: "/admin/dashboard",
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow public routes, Next.js internals, and static files
    if (
        PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Root redirect: send to login
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Read role from cookie (set by lib/auth.ts → setSession)
    const role = request.cookies.get("vpa_role")?.value;

    // Not logged in → redirect to login
    if (!role) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Wrong role trying to access another role's section → send to own home
    const allowed = ROLE_PREFIXES[role] ?? [];
    const isAllowed = allowed.some((prefix) => pathname.startsWith(prefix));

    if (!isAllowed) {
        const home = ROLE_HOME[role] ?? "/login";
        return NextResponse.redirect(new URL(home, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths EXCEPT:
         * - _next/static
         * - _next/image
         * - favicon.ico
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
