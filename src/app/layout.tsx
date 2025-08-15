import type {Metadata} from "next";
import "../components/styles/globals.css";
import "../components/styles/global.scss";
import React from "react";
import ContextProvider from "@/data/contexts/Contexts";
import {Header} from "@/components/Header";

export const metadata: Metadata = {
    title: "KaatoDev",
    description: "Portifólio de <NAME>",

    icons: {
        icon: 'Kaa2_multi.ico'
    }
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-BR">
        <body className={'relative antialiased min-h-screen h-screen flex flex-col'}>
        <div className={'fixed _background'}/>
        <ContextProvider>
            <Header/>
            <main className={'flex-1'}>
                {children}
                {/*<Footer/>*/}
            </main>
        </ContextProvider>
        </body>
        </html>
    )
}
