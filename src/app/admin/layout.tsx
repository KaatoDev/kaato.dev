'use client'
import React, {useLayoutEffect} from "react";
import {useUser} from "@/data/contexts/UserContext";
import {useRouter} from "next/navigation";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {

    const {isLoaded, isSigned, isAdmin} = useUser()
    const router = useRouter()

    useLayoutEffect(() => {
        if (isLoaded && isSigned()) {
            isAdmin().then((admin) => {
                // if (isAdmin() && hasPermission(window.location.href))
                const loc = window.location.href.split('/')
                if (!!admin && admin.permissions.includes(loc[loc.length-1])) return
                else router.push('/')
            }).catch((e) => {
                router.push('/')
            })
        }
    }, [isAdmin, isLoaded, isSigned]);

    return children
}
