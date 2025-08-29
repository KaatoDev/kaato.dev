'use client'

import '../components/styles/header.scss'
import {useUserContext} from "@/data/contexts/UserContext";

export function PluginCard() {
    const {user, isSigned} = useUserContext()

    return (
        <div>
            {user?.email ?? 'aaaaaa'}
        </div>
    )
}