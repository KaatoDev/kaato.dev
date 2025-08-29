'use client'
import "../../../components/styles/pages.scss";
import {useLayoutEffect} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import {useRouter} from "next/navigation";
import useUser from "@/data/hooks/useUser";

export default function Login() {
    const {user, isSigned, isLoaded} = useUser()
    const {logout} = useAuth()
    const {addSuperUser} = useUser()
    const router = useRouter()

    useLayoutEffect(() => {
        if (isLoaded && !isSigned()) router.push('/login')
    }, [isLoaded, isSigned])

    return (
        <div className={'_login full flex-center'}>
            <div className={'_card border border-black/10 rounded-3xl p-6 bgs-test'}>
                <div className={'w-14 aspect-square'}>
                    {/*{aa()}*/}
                </div>
                <button className={'bg-blue-400/10 hover:bg-blue-500/30 cursor-pointer px-3 py-0.5 rounded-xl'} name={'logoutBtn'} onClick={(e) => {
                    e.preventDefault()
                    logout()
                    if (isLoaded && !isSigned()) router.push('/login')
                }}>
                    Deslogar
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    if (!!user) addSuperUser(user).then(() => {
                        console.log('sucesso')
                    })
                }}>Check admin
                </button>
            </div>
        </div>
    );
}