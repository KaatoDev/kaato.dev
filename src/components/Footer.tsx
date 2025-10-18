import '../components/styles/footer.scss'
import Link from "next/link";
import Image from "next/image";

export function Footer() {

    return (
        <footer className={'w-full h-[18rem] sm:h-[14rem] flex-center-col bg-black/25'}>
            <p className={'w-full flex-center px-4 py-1.5 text-[0.92rem] text-center text-white/80 text-balance bg-black/10'}>Site trabalhado em Next/React com Typescript e Tailwind</p>
            <div className={'containerer flex-1 full flex max-sm:flex-col max-sm:gap-4 justify-around items-center max-sm:text-center pt-3 text-white/85 bg-gradient-to-b from-black/10 via-black/0'}>
                <div>
                    <p className={'text-2xl font-semibold text-center'}>Contatos:</p>
                    <p className={'pt-1 ps-2 leading-[1.2]'}>Email: yagoeskam@gmail.com</p>
                    <div className={'pt-1 ps-2 inline-flex gap-1'}>
                        <span>Linkedin:</span>
                        <Link className={'normal-link inline-flex items-center gap-0.5'} target={'_blank'} href={'https://in.kaato.dev'}>
                            {/*<div className={'h-2 aspect-square relative mt-0.5'}>*/}
                            {/*    <Image className={'object-contain'} src={'/linkedin.png'} fill alt={'Linkedin'}/>*/}
                            {/*</div>*/}
                            <span>in.kaato.dev</span>
                            <div className={'h-3.5 aspect-square relative mt-0.5'}>
                                <Image className={'object-contain'} src={'/google/arrow_outward.svg'} fill alt={'Abrir link Linkedin externamente.'}/>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={'flex-center-col sm:pr-1'}>
                    <p className={'text-2xl leading-[1.2] font-semibold text-center'}>Sites alternativos:</p>
                    <div className={'pt-1'}>
                        <p>PHP puro: (em breve)</p>
                        <p>Laravel: (em breve)</p>
                    </div>
                    {/*<p className={'text-center text-xs text-white/60'}>(versões alternativas deste)</p>*/}
                </div>
            </div>
            <p className={'pt-4 pb-3 sm:py-2 text-sm text-white/70'}>(Site em construção)</p>

        </footer>
    )
}