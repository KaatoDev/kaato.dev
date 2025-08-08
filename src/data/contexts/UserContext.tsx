'use client'

import {createContext, ReactNode, useContext, useState} from "react";
import {User} from "@firebase/auth";
import useAuth from "@/data/hooks/useAuth";

interface UserContextType {
    user: User | null
    isSigned: () => boolean
    // loading: boolean
}

const UserContext = createContext<UserContextType>({user: null, isSigned: () => false})

export function UserProvider({children}: { children: ReactNode }) {
    // const [user, setUser] = useState<User | null>(null)
    // const [isSigned, setIsSigned] = useState(false)
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
    const isSigned = () => {
        console.log(!!user)
        return !!user
    }
    // const {authLogin, authSignup, authLoginGoogle, authLogout, authValidadePassword, authStateChanged} = useAuth

    // function initializeUser(user: User | null) {
    //     setIsSigned(user != null)
    //     setUser(user)
    // }

    // async function login(email: string, password: string) {
    //     if (!isSigned) {
    //         initializeUser(await authLogin(email, password))
    //     }
    // }
    //
    // async function loginGoogle(email: string, password: string) {
    //     if (!isSigned) {
    //         initializeUser(await authLoginGoogle())
    //     }
    // }
    //
    // useEffect(() => {
    //     return authStateChanged(initializeUser)
    // }, [])

    return (
        <UserContext value={{user, isSigned}}>
            {children}
        </UserContext>
    )
}

export const useUser = () => useContext(UserContext);