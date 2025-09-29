import '../components/styles/footer.scss'
import Link from "next/link";
import Image from "next/image";

export function Footer() {

    return (
        <footer className={'w-full h-[14rem] flex-center-col bg-black/25'}>
            <p className={'w-full flex-center py-1.5 text-[0.92rem] text-white/80 text-balance bg-black/10'}>Site trabalhado em Next/React.js com Typescript e Tailwind</p>
            <div className={'containerer flex-1 full flex justify-around items-center text-white/85 bg-gradient-to-b from-black/10 via-black/0'}>
                <div>
                    <p className={'text-lg font-semibold'}>Contatos:</p>
                    <p className={'ps-2'}>Email: yagoeskam@gmail.com</p>
                    <div className={'ps-2 inline-flex gap-1'}>
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

                <div className={'pr-6'}>
                    <p className={'text-lg font-semibold'}>Sites alternativos:</p>
                    <p className={'ps-2'}>PHP puro: (em breve)</p>
                    <p className={'ps-2'}>Laravel: (em breve)</p>
                    {/*<p className={'text-center text-xs text-white/60'}>(versões alternativas deste)</p>*/}
                </div>
            </div>
            <p className={'py-2 text-sm text-white/70'}>(Site em construção)</p>

        </footer>
    )
}