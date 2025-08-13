'use client'

import '../components/styles/header.scss'
import {useUser} from "@/data/contexts/UserContext";
import Link from "next/link";
import Image from "next/image";

export function Header() {
    const {user, isSigned} = useUser()

    const loginProfile: string = isSigned() ? 'Perfil' : 'Login'

    return (
        <header className="_header containerer">
            <Link href="/" className="w-[7rem] md:w-[10rem] lg:w-[13rem] flex-center select-none transition-[width_.2s_ease-in-out]">
                <h2 className={'_logo text-3xl'}>KaaDev</h2>
            </Link>
            <div className="_search">
                <label className=" flex-center">
                    <input type=" text" placeholder=" Pesquise um plugin"/>
                </label>
                <div className="_search-img flex-center">
                    <div className={'relative flex-center h-4 aspect-square mr-1.5 mb-0.5'}>
                        <Image fill className={'object-contain'} src={"/search.svg"} alt={"search icon"}/>
                    </div>
                </div>
            </div>
            <ul className="_nav flex-center font-[300] select-none">
                <li className="_port flex-center">
                    <p>Portifólio</p>
                    <div className="_drop flex-center">
                        <Link href="/plugins">Plugins</Link>
                        <Link href="/sites">Sites</Link>
                    </div>
                </li>
                <li>
                    <Link className={'_port flex-center'} href={`/${loginProfile.toLowerCase()}`}>
                        {loginProfile}
                    </Link>
                    <div className="_drop flex-center">
                        <Link href="/plugins">Plugins</Link>
                        <Link href="/sites">Sites</Link>
                    </div>
                </li>
            </ul>
        </header>
    )
}