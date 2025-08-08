'use client'

import {createContext} from "react";

const ThemeContext = createContext('dark');

export function ThemeProvider({children}: any) {
    return (
        <ThemeContext value={'light'}>
            {children}
        </ThemeContext>
    )
}