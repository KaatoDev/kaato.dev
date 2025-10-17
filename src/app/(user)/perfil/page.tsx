'use client'
import React, {useLayoutEffect} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    const {isSigned, isLoaded, user} = useUserContext()
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
            <div className={'_card flex-center-col border border-black/10 rounded-3xl p-6'}>
                <div className={'flex-center-col rounded-3xl bg-white/10 p-2 pb-1 mx-4 overflow-hidden'}>
                    <div className={'relative h-28 aspect-square rounded-2xl overflow-hidden m-2'}>
                        <Image className={`object-contain ${user?.photoURL ? 'p-2s' : ''}`} fill src={user?.photoURL ?? '/google/account_box.svg'} alt={'User icon'}></Image>
                        {/*<Image className={`object-contain bg-white/10`} fill src={'/google/account_box.svg'} alt={'User icon'}></Image>*/}
                    </div>
                    <button className={'w-full hover:bg-blue-500/30 cursor-pointer px-3 pt-1.5 pb-0.5 mt-1 srounded-xl border-t border-black/20 hover:border-black/0 hover:bg-white/5 transition-colors'} name={'logoutBtn'} onClick={(e) => logoutBtn(e)}>
                        Deslogar
                    </button>
                </div>

                <p className={'pt-3'}>Email:</p>
                <p>{user?.email}</p>
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