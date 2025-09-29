'use client'
import {useLayoutEffect} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import {useRouter} from "next/navigation";

export default function Login() {
    const {isSigned, isLoaded} = useUserContext()
    const {logout} = useAuth()
    const router = useRouter()

    useLayoutEffect(() => {
        if (isLoaded && !isSigned()) router.push('/login')
    }, [isLoaded, isSigned, router])

    // @ts-expect-error -- erro inválido
    function logoutBtn(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        logout()
        if (isLoaded && !isSigned()) router.push('/login')
    }

    return (
        <div className={'_profile full flex-center-col'}>
            <p className={'py-3'}>(Página em construção)</p>
            <div className={'_card border border-black/10 rounded-3xl p-6 bgs-test'}>
                <button className={'bg-blue-400/10 hover:bg-blue-500/30 cursor-pointer px-3 py-0.5 rounded-xl'} name={'logoutBtn'} onClick={(e) => logoutBtn(e)}>
                    Deslogar
                </button>
                {/*<button onClick={(e) => {*/}
                {/*    e.preventDefault()*/}
                {/*    if (!!user) addSuperUser(user).then(() => {*/}
                {/*        console.log('sucesso')*/}
                {/*    })*/}
                {/*}}>Check admin*/}
                {/*</button>*/}
            </div>
        </div>
    );
}