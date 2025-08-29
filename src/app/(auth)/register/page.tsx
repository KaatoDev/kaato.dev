'use client'
import "../../../components/styles/pages.scss";
import {useState} from "react";
import {useUserContext} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import Link from "next/link";

export default function Login() {
    const {user, isSigned} = useUserContext()
    const {login, logout} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // useEffect(() => {
    //     if (isSigned) {
    //         window.location.href = '/'
    //     } else {
    //         console.log(user + " aaaaa")
    //     }
    // }, [])

    function loginBtn() {
        login(email, password)
    }

    return (
        <div className={'_login full flex-center'}>
            <div className={'_card border border-black/10 rounded-3xl p-6 bgs-test'}>
                {user ? user.email : "aaa"}
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
            </div>
        </div>
    );
}