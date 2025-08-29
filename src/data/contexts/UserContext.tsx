'use client'

import {createContext, ReactNode, useContext} from "react";
import {User} from "@firebase/auth";
import useAuth from "@/data/hooks/useAuth";
import useUser from "@/data/hooks/useUser";
import {SuperUserModel} from "@/data/models/SuperUserModel";

interface UserContextType {
    user: User | null
    isSigned: () => boolean
    isLoaded: boolean
    isAdmin: () => Promise<SuperUserModel | null>
}

const UserContext = createContext<UserContextType>({
    user: null,
    isSigned: () => false,
    isLoaded: true,
    isAdmin: async () => null,
})

export function UserProvider({children}: { children: ReactNode }) {
    const {user, isSigned, loading} = useAuth()
    const isLoaded = !loading
    const {getSuperUser} = useUser()

    async function isAdmin() {
        return !!user ? getSuperUser(user) : null
    }

    return (
        // <UserContext value={{user, isSigned, isLoaded, isAdmin, hasPermission}}>
        <UserContext value={{user, isSigned, isLoaded, isAdmin}}>
            {children}
        </UserContext>
    )
}

export const useUserContext = () => useContext(UserContext);