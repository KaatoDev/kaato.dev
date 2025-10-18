'use client'
import "../components/styles/pages.scss";
import {useEffect, useLayoutEffect} from "react";
import {Footer} from "@/components/Footer";
import Image from "next/image";
import {SiteCard} from "@/components/SiteCard";
import Link from "next/link";

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

    const langFrameIcons = ['java, kotlin, nodejs, js, ts, php'.split(', '), 'html, css, scss, bootstrap, tailwind'.split(', '), 'react, nextjs, spring, laravel'.split(', '), 'mysql, sqlite, postgres, firebase'.split(', '), 'idea, clion, phpstorm, webstorm, vscode, visualstudio'.split(', ')]
    const langFrameNames = ['Java, Kotlin, Node.js, JavaScript, TypeScript, PHP'.split(', '), 'HTML, CSS, SCSS, Bootstrap, Tailwind'.split(', '), 'React, Next.js, Spring Boot, Laravel'.split(', '), 'MySQL, SQLite, PostgreSQL, Firebase'.split(', '), 'IntelliJ, CLion, PhpStorm, WebStorm, VS Code, Visual Studio'.split(', '),]
    const langFrameTitles = ['Linguagens e bibliotecas', '', 'Frameworks', 'Banco de dados', 'IDEs',]

    const skillIconLoader = ({src}: { src: string }) => {
        return `https://skillicons.dev/${src}`;
    };

    return (
        <div id={'__home'} className={'_animateHome _home _background full scroll-smooth'}>
            <div className={'w-full h-[calc(100vh-6.5rem)] flex-center overflow-hidden'}>
                <p className={'_text flex flex-col sm:flex-row mb-[5rem] font-bold text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] select-none'}>
                    {['Kaa', 'Dev'].map((it, i) => (
                        <span key={i}>{it}</span>
                    ))}
                </p>
            </div>

            <div className={'containerer bg-blue-700/10s w-full h-1/2 flex-center-col'}>
                <p className={'_text2 font-bold text-6xl sm:text-8xl sm:pb-8 select-none'}>Tecnologias</p>

                {langFrameIcons.map((it, i) => (
                    <div className={`pt-2 pb-3 sm:pb-5 flex-center-col shadow-[var(--boxs1)] ${i == 1 ? 'rounded-b-2xl rounded-sm px-3 sm:px-6 md:px-8 xl:px-10 2xl:px-12' : 'rounded-t-2xl rounded-b-xl mt-6 px-6 hover:max-sm:px-6 sm:px-12 xl:px-14 2xl:px-16 gap-2 transition-all duration-500'} overflow-hidden`} key={i}>
                        <p className={`drop-shadow-[0_2px_4px_white]/50 text-stone-200/95 font-bold text-lg sm:text-xl rounded-xl select-none ${i == 1 ? '' : 'px-4 sm:px-2 py-1'}`}>{langFrameTitles[i]}</p>

                        <div className={'gap-3 md:gap-8 xl:gap-10 2xl:gap-12 flex justify-between'} key={i}>
                            {it.map((its, is) => (
                                <div className={'group h-full flex shadow-[var(--boxs4)] hover:shadow-[var(--boxs3)] rounded-2xl transition-all duration-500 bg-blue-200/10 hover:bg-blue-200/15'} key={is}>
                                    <div className={'relative h-6 sm:h-16 aspect-square'} key={is}>
                                        <Image loader={skillIconLoader} src={`icons?i=${its}`} className={'object-contain'} fill alt={langFrameNames[i][is]}/>
                                    </div>
                                    <div className={`w-0 ${i == 1 ? 'group-hover:w-24' : 'group-hover:w-28'} h-full group-hover:animate-[bounceTec_.5s_ease-in-out]s flex-center transition-all group-hover:duration-300 duration-500 overflow-hidden`}>
                                        <p className={'text-nowrap font-bold text-[0.9rem] sm:text-[0.97rem] pt-0.5'}>{langFrameNames[i][is]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={'containerer bg-blue-700/10s w-full h-1/3 flex-center-col'}>
                <Link href={'/sites'} className={'_text2 font-bold text-8xl pb-12 select-none'}>Sites</Link>
                <SiteCard nored name={'Kaato.dev'} image={'kaatodev.png'} alt={'Kaato.dev página inicial'} title={'Site portifólio'} description={'Este site foi feito com @@Next.js e @@TypeScript'}/>
                <SiteCard inverted name={'old.Kaato.dev'} image={'oldkaatodev.png'} alt={'Antiga página inicial'} title={'Site portifólio antigo'} description={'Este site foi feito com @@Next.js e @@TypeScript'}/>
            </div>

            <Footer/>
        </div>
    );
}