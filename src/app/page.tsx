'use client'
import "../components/styles/pages.scss";
import {useLayoutEffect} from "react";

export default function Home() {
    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
            document.body.style.overflow = 'auto'
        }, 3000);
    }, [])

    return (
        <div className={'full flex-col'}>
            <div className={'_animateHome _home full flex-center overflow-hidden'}>
                <p className={'_text flex flex-col sm:flex-row mb-[5rem] font-bold text-9xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] select-none'}>
                    {['Kaa', 'Dev'].map((it, i) => (
                        <span key={i}>{it}</span>
                    ))}
                </p>
            </div>
            <div className={'_background z-50 full flex-center overflow-hidden'}>
                ss
            </div>
        </div>
    );
}