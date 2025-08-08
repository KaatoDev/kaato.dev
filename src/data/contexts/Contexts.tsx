import {UserProvider} from "@/data/contexts/UserContext";
import {ThemeProvider} from "@/data/contexts/ThemeContext";

export default function ContextProvider({children}: any) {
    return (
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    )
}