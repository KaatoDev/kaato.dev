'use client'
import "../../components/styles/adminPages.scss";
import React, {useLayoutEffect, useState} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import {useRouter} from "next/navigation";
import Image from "next/image";
import useAuth from "@/data/hooks/useAuth";
import Link from "next/link";
import {Footer} from "@/components/Footer";
import {PluginProvider} from "@/data/contexts/PluginsContext";

export default function AdminLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    const router = useRouter()
    const {isLoaded, isSigned, isAdmin, user} = useUserContext()
    const [isClosed, setIsClosed] = useState(false)
    const {logout} = useAuth()

    const navAdmin = new Map()
    navAdmin.set('Criar plugins', '/admin/create-plugin')
    navAdmin.set('Editar plugins', '/admin/edit-plugins')
    navAdmin.set('Configurações', '/admin/configurations')

    useLayoutEffect(() => {
        if (isLoaded) {
            if (isSigned()) {
                isAdmin().then((admin) => {
                    // if (isAdmin() && hasPermission(window.location.href))
                    const loc = window.location.href.split('/')
                    if (!!admin) {
                        if (loc[loc.length - 1] == 'admin' || (loc[loc.length - 2] == 'admin' && admin.permissions.includes(loc[loc.length - 1]))) return
                        else router.push('/')
                    } else router.push('/')
                }).catch(() => {
                    router.push('/')
                })
            } else router.push('/login')
        }
    }, [isAdmin, isLoaded, isSigned]);

    function closeMenu() {
        setIsClosed(!isClosed)
        if (!isClosed) setTimeout(() => document.querySelector('._content')?.classList.add('_content-hidden'), 200)
        else setTimeout(() => document.querySelector('._content')?.classList.remove('_content-hidden'), 200)
    }

    return (
        <div className={'relative _admin flex full'}>
            <div className={`opacity-0 ms-16 transition-all ${isClosed ? 'min-w-0 w-0 max-w-0 ease-in-out duration-500' : 'ease-in min-w-32 max-w-64 duration-300'} h-full`}/>
            <div className={`fixed z-[51] transition-all duration-400 ${isClosed ? 'rounded-tr-2xl min-w-10 max-w-10 _menu-closed ease-in-out' : 'ease-in min-w-32 max-w-64 _menu-open rounded-tr-xl'} w-fit h-full flex flex-col border-r border-black/20 overflow-hidden`}>
                <div className={'w-full cursor-pointer'} onClick={closeMenu}>
                    <div className={`relative h-10 aspect-square justify-self-end ${isClosed ? 'rotate-180 duration-400 ease-out' : 'duration-300 ease-in'} transition-all`}>
                        <Image className={'object-contain'} fill src={'/google/double_arrow_backward.svg'} alt={'Close menu arrow'}/>
                    </div>
                </div>
                <div className={`relative _content transition-all flex flex-col items-center full gap-5 ${isClosed ? '-translate-x-[300%] ease-in-out duration-500' : 'translate-x-0 ease-in-out duration-300'}`}>
                    <div className={'flex-center-col rounded-3xl bg-white/10 p-2 pb-1 mx-4 overflow-hidden'}>
                        <div className={'relative h-32 aspect-square rounded-2xl overflow-hidden'}>
                            <Image className={`object-contain ${user?.photoURL ? 'p-2' : ''}`} fill src={user?.photoURL ?? '/google/account_box.svg'} alt={'User icon'}></Image>
                            {/*<Image className={`object-contain bg-white/10`} fill src={'/google/account_box.svg'} alt={'User icon'}></Image>*/}
                        </div>
                        <Link className={'w-full text-center pt-1 border-t border-black/20 hover:border-black/0 hover:bg-white/5 transition-colors'} href={'/perfil'}>
                            Editar Perfil
                        </Link>
                    </div>

                    <button className={'bg-red-500/20 hover:bg-red-700/50 cursor-pointer px-3 py-0.5 rounded-xl transition-colors'} name={'logoutBtn'} onClick={(e) => {
                        e.preventDefault()
                        logout()
                        router.push('/login')
                    }}>
                        Deslogar
                    </button>

                    <nav className={'w-full flex-center-col my-2 border-y border-gray-900/20'}>
                        {[...navAdmin.entries()].map((it, i) =>
                            <div className={`w-full ${i == 0 ? '' : 'border-t'} border-gray-800/15 shadow-[var(--boxs3)] hover:shadow-[var(--boxs1)] transition-all duration-200 ease-out`} key={i}>
                                <Link className={'full flex-center py-2'} href={it[1]}>
                                    {it[0]}
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>

            <div className={'flex-1'}>
                <PluginProvider>
                    {children}
                </PluginProvider>
                <Footer/>
            </div>
        </div>
    )
}
