"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSession, SessionData } from "@/lib/auth";

interface AuthContextValue {
    user: SessionData | null;
    isLoading: boolean;
    logout: () => void;
    refreshSession: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    isLoading: true,
    logout: () => { },
    refreshSession: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshSession = useCallback(() => {
        const session = getSession();
        setUser(session);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const logout = useCallback(() => {
        clearSession();
        setUser(null);
        router.push("/login");
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, refreshSession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
