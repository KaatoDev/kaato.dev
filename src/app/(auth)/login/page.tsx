'use client'
import "../../../components/styles/pages.scss";
import {useLayoutEffect, useState} from "react";
import {useUser} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Login() {
    const {isSigned, isLoaded} = useUser()
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
            <div className={'_card flex flex-col border border-black/10 rounded-3xl p-6 gap-5'}>
                <form method={'POST'} action={'/submit-form'} className={'_form flex-center flex-col gap-3'}>
                    <label htmlFor='email'>
                        <p>Email:</p>
                        <input type="text" name={'email'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label htmlFor='password'>
                        <p>Senha:</p>
                        <input type="password" name={'password'} placeholder={'Senha'} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
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
            </div>
        </div>
    );
}