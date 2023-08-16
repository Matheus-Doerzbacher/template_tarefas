import { AuthProvider } from "@/data/context/AuthContext";
import "./globals.css";
import { AppProvider } from "@/data/context/AppContext";

export const metadata = {
    title: "Minhas Tarefas",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AuthProvider>
                <AppProvider>
                    {children}
                </AppProvider>
            </AuthProvider>
        </html>
    );
}
