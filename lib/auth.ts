import { UserRole } from "@/components/layout/Sidebar";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    year?: string;
    program?: string;
    avatar?: string;
}

// ─── Mock seeded users (covers every role) ───────────────────────────────────
export const seedUsers: AuthUser[] = [
    {
        id: "u1",
        name: "Rachit Jain",
        email: "student@vpa.edu",
        password: "student123",
        role: "student",
        year: "3rd Year",
        program: "B.Tech CSE (Data Science)",
    },
    {
        id: "u2",
        name: "Dr. Priya Sharma",
        email: "mentor@vpa.edu",
        password: "mentor123",
        role: "faculty_mentor",
    },
    {
        id: "u3",
        name: "Prof. Anil Kumar",
        email: "coordinator@vpa.edu",
        password: "coord123",
        role: "course_coordinator",
    },
    {
        id: "u4",
        name: "Admin User",
        email: "admin@vpa.edu",
        password: "admin123",
        role: "admin",
    },
    {
        id: "u5",
        name: "Dr. Ramesh Iyer",
        email: "dean@vpa.edu",
        password: "dean123",
        role: "dean",
    },
    {
        id: "u6",
        name: "Mr. Suresh Menon",
        email: "director@vpa.edu",
        password: "dir123",
        role: "director",
    },
    {
        id: "u7",
        name: "Ms. Kavitha Nair",
        email: "placement@vpa.edu",
        password: "place123",
        role: "placement_dept",
    },
    {
        id: "u8",
        name: "Arjun Verma",
        email: "alumni@vpa.edu",
        password: "alumni123",
        role: "alumni",
    },
];

// ─── Constants ─────────────────────────────────────────────────────────────────
const SESSION_KEY = "vpa_session";
const REGISTERED_KEY = "vpa_registered_users";

// ─── In-memory store ───────────────────────────────────────────────────────────
// Initialised once per module load from localStorage (client only).
let _runtimeUsers: AuthUser[] = [...seedUsers];

function loadRegisteredFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
        const raw = localStorage.getItem(REGISTERED_KEY);
        if (raw) {
            const stored: AuthUser[] = JSON.parse(raw);
            // Merge: skip any whose email already exists in seedUsers
            const seedEmails = new Set(seedUsers.map((u) => u.email));
            const newOnes = stored.filter((u) => !seedEmails.has(u.email));
            _runtimeUsers = [...seedUsers, ...newOnes];
        }
    } catch {
        // ignore
    }
}

function saveRegisteredToStorage(users: AuthUser[]): void {
    if (typeof window === "undefined") return;
    try {
        const seedEmails = new Set(seedUsers.map((u) => u.email));
        const toSave = users.filter((u) => !seedEmails.has(u.email));
        localStorage.setItem(REGISTERED_KEY, JSON.stringify(toSave));
    } catch {
        // ignore
    }
}

// Call on first use from client
export function initAuth(): void {
    loadRegisteredFromStorage();
}

// ─── Credential lookup ─────────────────────────────────────────────────────────
export function getUserByCredentials(
    email: string,
    password: string
): AuthUser | null {
    loadRegisteredFromStorage();
    return (
        _runtimeUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        ) ?? null
    );
}

// ─── Signup ────────────────────────────────────────────────────────────────────
export type RegisterResult =
    | { success: true; user: AuthUser }
    | { success: false; error: string };

export function registerUser(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}): RegisterResult {
    loadRegisteredFromStorage();
    const exists = _runtimeUsers.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (exists) return { success: false, error: "An account with this email already exists." };

    const newUser: AuthUser = {
        id: `u_${Date.now()}`,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
    };
    _runtimeUsers = [..._runtimeUsers, newUser];
    saveRegisteredToStorage(_runtimeUsers);
    return { success: true, user: newUser };
}

// ─── Session ───────────────────────────────────────────────────────────────────
export interface SessionData {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    year?: string;
    program?: string;
}

export function getSession(): SessionData | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? (JSON.parse(raw) as SessionData) : null;
    } catch {
        return null;
    }
}

export function setSession(user: AuthUser): void {
    if (typeof window === "undefined") return;
    const session: SessionData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        year: user.year,
        program: user.program,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    // Also set a lightweight cookie so middleware can read it
    document.cookie = `vpa_role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
    document.cookie = "vpa_role=; path=/; max-age=0";
}

// ─── Role → dashboard home page ────────────────────────────────────────────────
export function dashboardForRole(role: UserRole): string {
    switch (role) {
        case "student": return "/student/dashboard";
        case "faculty_mentor": return "/faculty-mentor/dashboard";
        case "course_coordinator": return "/coordinator/dashboard";
        case "alumni": return "/student/dashboard"; // re-use student shell for now
        default: return "/admin/dashboard";
    }
}
