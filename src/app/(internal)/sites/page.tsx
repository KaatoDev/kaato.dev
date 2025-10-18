'use client'
import "../../../components/styles/pages.scss";
import {SiteCard} from "@/components/SiteCard";

export default function Home() {
    return (
        <div className={'_home full flex-center'}>

            <div className={'full flex-center-col md:text-lg xl:text-xl overflow-hidden bg-tests py-20'}>
                <SiteCard nored name={'Kaato.dev'} image={'kaatodev.png'} alt={'Kaato.dev página inicial'} title={'Site portifólio'} description={'Este site foi feito com @@Next.js e @@TypeScript'}/>
                <SiteCard inverted red={'old.kaato.dev/plugins'} name={'old.Kaato.dev'} image={'oldkaatodev.png'} alt={'Antigo Kaato.dev, página inicial'} title={'Antigo site portifólio'} description={'Este site foi feito com @@Next.js e @@TypeScript'} subDescription={'(Página de plugins)'}/>
                <SiteCard name={'CS2data.gg'} image={'cs2datagg2.png'} alt={'Página de skins do cs2data.gg'} title={'Site skins CS2'} description={'Este site foi feito com @@Next.js e @@TypeScript'} subDescription={'(Contribuição no front-end)'}/>
                <SiteCard nored inverted name={'(Em breve)'} image={'kaatodev.png'} alt={'Kaato.dev página inicial'} title={'Site portifólio PHP'} description={'Este site será feito com @@PHP puro'}/>
                <SiteCard nored name={'(Em breve)'} image={'kaatodev.png'} alt={'Kaato.dev página inicial'} title={'Site portifólio Laravel'} description={'Este site será feito com @@Laravel'}/>
                <SiteCard nored name={'(Em breve)'} image={'kaatodev.png'} alt={'Kaato.dev página inicial'} title={'Site Vice City News'} description={'Este site será feito com @@Wordpress em @@PHP'} subDescription={'(Em desenvolvimento)'}/>

                {/*<p>*/}
                {/*    {'Futuramente haverá uma versão idêntica em '}*/}
                {/*    <span className={'font-bold'}>PHP</span>*/}
                {/*    {' puro e posteriormente com '}*/}
                {/*    <span className={'font-bold'}>Laravel</span>*/}
                {/*    {'.'}*/}
                {/*</p>*/}
            </div>
        </div>
    );
}