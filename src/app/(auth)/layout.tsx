import "../../components/styles/userPages.scss";
import React from "react";
import {Footer} from "@/components/Footer";

export default function UserLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <div className={'flex-1 min-h-[calc(100vh-6.5rem)]'}>
                {children}
            </div>
            <Footer/>
        </>
    )
}
