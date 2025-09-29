import {UserProvider} from "@/data/contexts/UserContext";
import {ThemeProvider} from "@/data/contexts/ThemeContext";
import {ReactNode} from "react";

export default function ContextProvider({children}: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    )
}