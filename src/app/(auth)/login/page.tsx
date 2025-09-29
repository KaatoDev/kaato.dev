'use client'
import "../../../components/styles/pages.scss";
import {useLayoutEffect, useState} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Login() {
    const {isSigned, isLoaded} = useUserContext()
    const {login, loginGooglePopup} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    // const [errorMessage, setErrorMessage] = useState('')

    function loginBtn(google: boolean = false) {
        if (google) loginGooglePopup()
        else login(email, password)

        if (isLoaded && isSigned()) router.push('/perfil')
    }

    useLayoutEffect(() => {
        if (isLoaded && isSigned()) router.push('/perfil')
    }, [isLoaded, isSigned])


    return (
        <div className={'_login full flex-center'}>
            <div className={'relative group _card flex flex-col border border-black/10 rounded-3xl p-6 gap-5'}>
                <form className={'_form flex-center-col gap-3'}>
                    <label htmlFor='email'>
                        <p>Email:</p>
                        <input type="text" name={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
                    </label>

                    <label htmlFor='password'>
                        <p>Senha:</p>
                        <input type="password" name={'password'} placeholder={'Senha'} onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <Link className={'transition-colors duration-100'} href={'/password-reset'}>Esqueci a senha</Link>

                    <input type={'submit'} value={'Login'} className={'bg-blue-400/10 hover:bg-blue-500/30 cursor-pointer px-3 py-0.5 rounded-xl'} name={'loginBtn'} onClick={(e) => {
                        e.preventDefault()
                        loginBtn()
                    }}/>
                </form>
                
                <div className={'flex w-full h-fit'}>
                    <button className={"relative w-full h-10 flex cursor-pointer"} onClick={(e) => {
                        e.preventDefault()
                        loginBtn(true)
                    }}>
                        <Image src={'google/web_light_rd_ctn.svg'} alt={'google'} fill className={'object-contain'}/>
                    </button>
                </div>

                <div className={'z-[-1] group-hover:delay-250 group-hover:z-0 absolute w-full top-full flex-center left-0 pb-20'}>
                    <Link className={'_register-link drop-shadow-md -translate-y-full group-hover:translate-y-2 pointer-events-auto'} href={'/register'}>Cadastrar-se</Link>
                </div>
            </div>
        </div>
    );
}