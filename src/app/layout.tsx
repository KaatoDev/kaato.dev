import type {Metadata} from "next";
import "../components/styles/globals.css";
import "../components/styles/global.scss";
import React from "react";
import ContextProvider from "@/data/contexts/Contexts";
import {Header} from "@/components/Header";

export const metadata: Metadata = {
    title: "KaaDev",
    description: "Site criado com Next.js e Typescript",

    openGraph: {
        type: "website",
        url: "https://kaato.dev/",
        title: "KaaDev Portifólio",
        description: "Site criado com Next.js e Typescript",
        images: [
            {
                url: "HomePage.png",
                width: 1200,
                height: 630,
                alt: "KaaDev Portifólio",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "https://kaato.dev/",
        title: "KaaDev Portifólio",
        description: "Site criado com Next.js e Typescript",
        images: ["kaatodev.png"],
    },

    icons: {
        icon: 'Kaa2_multi.ico'
    }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-BR">
        <body className={'relative antialiased min-h-screen h-screen flex flex-col'}>
        <div id={'__superBackground'} className={'fixed _background'}/>
            <ContextProvider>
                <Header/>
                <main className={'flex-1 flex flex-col'}>
                    {children}
                </main>
            </ContextProvider>
        </body>
        </html>
    )
}
