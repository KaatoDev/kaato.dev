'use client'

import {createContext, ReactNode} from "react";

const ThemeContext = createContext('dark');

export function ThemeProvider({children}: { children: ReactNode }) {
    return (
        <ThemeContext value={'light'}>
            {children}
        </ThemeContext>
    )
}