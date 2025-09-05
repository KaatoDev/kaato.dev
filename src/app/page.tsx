'use client'
import "../components/styles/pages.scss";
import {useEffect, useLayoutEffect} from "react";
import {SiteCard} from "@/components/SiteCard";

export default function Home() {
    useLayoutEffect(() => {
        document.querySelector('#__superBackground')?.classList.remove('_background')
        document.body.style.overflow = 'hidden'

        setTimeout(() => {
            document.body.style.overflow = 'auto'
            document.querySelector('#__home')?.classList.remove('_background')
            document.querySelector('#__superBackground')?.classList.add('_background')
        }, 3000);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id={'__home'} className={'_animateHome _home _background full'}>
            <div className={'full flex-center overflow-hidden'}>
                <p className={'_text flex flex-col sm:flex-row mb-[5rem] font-bold text-9xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] select-none'}>
                    {['Kaa', 'Dev'].map((it, i) => (
                        <span key={i}>{it}</span>
                    ))}
                </p>
            </div>
            <div className={'z-50 bg-blue-700/10 full flex-center flex-col md:text-lg xl:text-xl overflow-hidden'}>
                <SiteCard title={'Site portifólio'} description={'Este site foi feito com @@Next.js e @@TypeScript'}/>
                <p>
                    {'Futuramente haverá uma versão idêntica em '}
                    <span className={'font-bold'}>PHP</span>
                    {' puro e posteriormente com '}
                    <span className={'font-bold'}>Laravel</span>
                    {'.'}
                </p>
            </div>
        </div>
    );
}