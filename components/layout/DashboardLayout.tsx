import { ReactNode } from "react";
import { Sidebar, UserRole } from "./Sidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
    role: UserRole;
    userName: string;
    userYear?: string;
    userProgram?: string;
}

export function DashboardLayout({ children, role, userName, userYear, userProgram }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role={role} />
            <div className="pl-64">
                <Navbar userName={userName} role={role} userYear={userYear} userProgram={userProgram} />
                <main className="p-6 max-w-screen-2xl">{children}</main>
            </div>
        </div>
    );
}
