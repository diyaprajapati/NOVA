import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type User = {
    id: string;
    email: string;
    name: string;
    type: "user" | "brand";
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, type: "user" | "brand") => Promise<void>;
    logout: () => void;
    requireAuth: (callback: () => void, redirectTo?: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Check for saved session on app load
    useEffect(() => {
        const savedUser = localStorage.getItem("auth_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem("auth_user");
            }
        }
    }, []);

    const login = async (email: string, password: string, type: "user" | "brand") => {
        // Simulate API call
        // In a real app, this would be a call to your auth API
        try {
            // Simple validation
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            // Mock successful login
            const newUser = {
                id: "user-" + Math.random().toString(36).substring(2, 9),
                email,
                name: email.split("@")[0],
                type
            };

            // Save to state and localStorage
            setUser(newUser);
            localStorage.setItem("auth_user", JSON.stringify(newUser));

            toast("Logged in successfully", {
                description: `Welcome back, ${newUser.name}!`
            });
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_user");
        toast("Logged out", {
            description: "You have been logged out successfully"
        });
    };

    // Helper function to require authentication for actions
    const requireAuth = (callback: () => void, redirectTo = "/sign-in") => {
        if (isAuthenticated) {
            callback();
        } else {
            toast("Authentication required", {
                description: "Please sign in to continue"
            });
            navigate(redirectTo);
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            requireAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};