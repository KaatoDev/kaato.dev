'use client'
import "../../../components/styles/adminPages.scss";
import {useUser} from "@/data/contexts/UserContext";
import useAuth from "@/data/hooks/useAuth";
import {useRouter} from "next/navigation";

export default function Login() {
    const {user, isSigned, isLoaded} = useUser()
    const {logout} = useAuth()
    const router = useRouter()
    return (
        <div className={'_login full flex-center'}>
            <div className={'_card border border-black/10 rounded-3xl p-6 bgs-test'}>
                <button className={'bg-blue-400/10 hover:bg-blue-500/30 cursor-pointer px-3 py-0.5 rounded-xl'} name={'logoutBtn'} onClick={(e) => {
                    e.preventDefault()
                    logout()
                    if (isLoaded && !isSigned()) router.push('/login')
                }}>aa
                </button>
            </div>
        </div>
    );
}