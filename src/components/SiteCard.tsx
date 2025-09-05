import '../components/styles/cards.scss'
import Image from "next/image";

export function SiteCard(props: { title: string, description: string, key?: number | null }) {
    const {title, key} = props
    const description = props.description.split(' ').map((it, i) => <span className={it.includes('@@') ? 'font-bold' : ''} key={i}>{(it.includes('@@') ? it.replace('@@', '') : it) + ' '}</span>)
    const id = title.replace(' ', '').toLowerCase() + (key ?? '0')

    return (
        <div className={'relative _siteCard w-full h-fit flex-center flex-col py-16 bg-test'}>
            <div className={'group _card relative w-1/2 h-fit flex flex-col max-w-100 aspect-video text-center cursor-pointer'}>
                <div className={'z-[1] absolute full backdrop-blur-[3px] group-hover:backdrop-blur-none transition-all duration-200 ease-in hover:duration-100 hover:ease-out rounded-3xl overflow-hidden'}/>
                <p className={'_cardText top-0 translate-y-[170%] group-hover:-translate-y-[130%] text-2xl'}>{title}</p>
                <Image className={'object-contain pointer-events-none rounded-3xl'} fill src={'/HomePage.png'} alt={'KaaDev página inicial'}/>
                <p className={'_cardText bottom-0 line-clamp-1 -translate-y-[180%] group-hover:translate-y-[130%] text-lg text-balance'}>{description}</p>
            </div>
        </div>
    )
}