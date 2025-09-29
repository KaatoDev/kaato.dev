'use client'
import "../../../components/styles/pages.scss";
import React, {useLayoutEffect, useState} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Login() {
    const {isSigned, isLoaded} = useUserContext()
    const {signup, loginGooglePopup, passwordValidade} = useAuth()
    const [verifications, setVerifications] = useState([true, true, true])
    const router = useRouter()
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    function googleSignupBtn() {
        loginGooglePopup()
        if (isLoaded && isSigned()) router.push('/perfil')
    }

    async function signupBtn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const {email, password, confirmPassword} = Object.fromEntries(data.entries()) as { email: string, password: string, confirmPassword: string }

        const vers = verifications

        vers[0] = emailRegex.test(email)

        vers[1] = await passwordValidade(password)
        vers[2] = passwsord === confirmPassword

        setVerifications([...vers])

        if (!vers.includes(false))
            signup(email, password)

        if (isLoaded && isSigned()) router.push('/perfil')
    }

    useLayoutEffect(() => {
        if (isLoaded && isSigned()) router.push('/perfil')
    }, [isLoaded, isSigned, router])


    return (
        <div className={'_login full flex-center'}>
            <div className={'relative group _card flex flex-col border border-black/10 rounded-3xl p-6 gap-5'}>
                <form className={'_form flex-center-col gap-3'} onSubmit={(e) => signupBtn(e)}>
                    <label>
                        <p>
                            <span>Email: </span>
                            <span className={verifications[0] ? 'hidden' : 'text-red-400/90'}>*</span>
                        </p>
                        <input className={verifications[0] ? '' : 'required-field'} type="text" name={'email'} placeholder={'Email'}/>
                    </label>

                    <label>
                        <p>
                            <span>Senha: </span>
                            <span className={verifications[1] ? 'hidden' : 'text-red-400/90'}>*</span>
                        </p>
                        <input className={verifications[1] ? '' : 'required-field'} type="password" name={'password'} placeholder={'Senha'}/>
                    </label>

                    <label>
                        <p>
                            <span>Confirmar senha: </span>
                            <span className={verifications[2] ? 'hidden' : 'text-red-400/90'}>*</span>
                        </p>
                        <input className={verifications[2] ? '' : 'required-field'} type="password" name={'confirmPassword'} placeholder={'Confirmar senha'}/>
                    </label>

                    <button className={'bg-blue-400/10 hover:bg-blue-500/30 cursor-pointer px-3 py-0.5 rounded-xl'} name={'loginBtn'}>
                        Cadastrar
                    </button>
                </form>

                <div className={'flex w-full h-fit'}>
                    <button className={"relative w-full h-10 flex cursor-pointer"} onClick={(e) => {
                        e.preventDefault()
                        googleSignupBtn()
                    }}>
                        <Image src={'google/web_light_rd_ctn.svg'} alt={'google'} fill className={'object-contain'}/>
                    </button>
                </div>

                <div className={'z-[-1] group-hover:delay-250 group-hover:z-0 absolute w-full top-full flex-center left-0 pb-20'}>
                    <Link className={'_register-link drop-shadow-md -translate-y-full group-hover:translate-y-2 pointer-events-auto'} href={'/login'}>Já possuo conta</Link>
                </div>
            </div>
        </div>
    );
}