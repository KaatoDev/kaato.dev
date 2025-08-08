'use client'

import '../components/styles/header.scss'
import {useUser} from "@/data/contexts/UserContext";

export function Header() {
    const {user, isSigned} = useUser()

    const loginProfile: string = isSigned() ? 'Perfil' : 'Login'

    return (
        <header className="_header containerer">
            <a href="/" className="flex-center">
                <h2 className={'_logo text-3xl'}>KaaDev</h2>
            </a>
            <div className=" _search">
                <label className=" flex-center">
                    <input type=" text" placeholder=" Pesquise um plugin"/>
                </label>
                <div className=" _search-img flex-center">
                    <img src="search.svg" alt="search icon"/>
                </div>
            </div>
            <ul className="_nav flex-center font-[300]">
                <li className="_port flex-center">
                    <p>Portifólio</p>
                    <div className="_drop flex-center">
                        <a href="plugins">Plugins</a>
                        <a href="sites">Sites</a>
                    </div>
                </li>
                <li>
                    <a href={loginProfile.toLowerCase()}>
                        {loginProfile}
                    </a>
                </li>
            </ul>
        </header>
    )
}