import {UserProvider} from "@/data/contexts/UserContext";
import {ThemeProvider} from "@/data/contexts/ThemeContext";
import {ReactNode} from "react";
import {PluginProvider} from "@/data/contexts/PluginsContext";

export default function ContextProvider({children}: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <UserProvider>
                <PluginProvider>
                    {children}
                </PluginProvider>
            </UserProvider>
        </ThemeProvider>
    )
}