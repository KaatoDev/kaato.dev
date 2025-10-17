import '../components/styles/cards.scss'
import Image from "next/image";
import Link from "next/link";

export function SiteCard(props: { name: string, image: string, alt: string, title: string, description: string, subDescription?: string, red?: string, key?: number | null, searchParams?: string | null, inverted?: boolean, nored?: boolean }) {
    // const {name, image, alt, title, key, searchParams, inverted, subDescription, red, nored} = props
    const {name, image, alt, title, inverted, subDescription, red, nored} = props
    const description = props.description.split(' ').map((it, i) => <span className={it.includes('@@') ? 'font-bold' : ''} key={i}>{(it.includes('@@') ? it.replace('@@', '') : it) + ' '}</span>)
    // const id = title.replace(' ', '').toLowerCase() + (key ?? '0')
    // const search = searchParams ?? ''

    return (
        <div className={'relative _siteCard containerer max-md:pr-0! max-md:pl-6! w-full flex-center-col py-16 pb-24 select-none'}>
            <div className={'absolute _titleName flex-center top-0 w-1/2 max-w-130 h-5 text-4xl text-center self-center translate-y-full'}>
                <Link target={'_blank'} className={`w-fit shadow-[var(--boxs1)] py-0.5 px-4 rounded-2xl ${nored ? 'pointer-events-none' : ''}`} href={`https://${red ?? name}`}>
                    {name}
                </Link>
                <a href=""></a>
            </div>

            <div className={'bg-blue-600/5 w-1/2 max-w-130 h-fit _open shadow-[var(--boxs9)] rounded-3xl'}>
                {/*<Link href={`?${new URLSearchParams({site: id})}`} className={'group _card relative w-full max-w-130 h-fit flex flex-col aspect-video text-center cursor-pointer'}>*/}
                <div className={`group relative _card col-span-5 2xl:col-span-4 ${inverted ? 'xl:col-start-7 2xl:col-start-7' : '2xl:col-start-2'} w-full max-w-130 h-fit flex flex-col aspect-video text-center cursor-pointer`} onClick={e => {
                    e.preventDefault()
                    const it: HTMLDivElement | null | undefined = e.currentTarget.parentElement?.querySelector('._expText')
                    const blur: HTMLDivElement | null | undefined = e.currentTarget.parentElement?.querySelector('._cardBlur')
                    const card: NodeListOf<HTMLDivElement> | undefined = e.currentTarget.parentElement?.querySelectorAll('._cardText')

                    if (!it || !blur || !card) return

                    if (!!it) {
                        if (it.classList.contains('_cardAppear')) {
                            it.style.animation = '_cardSize2 .8s ease-in-out'
                            blur.style.opacity = '1'
                            card.forEach((it) => it.style.opacity = '1')

                            setTimeout(() => {
                                it.style.display = 'none'
                                it.classList.remove('_cardAppear')
                            }, 450)

                        } else {
                            it.classList.add('_cardAppear')
                            it.style.width = '100%'
                            it.style.animation = '_cardSize .8s ease-in-out'
                            it.style.display = 'flex'

                            blur.style.opacity = '0'
                            card.forEach((it) => it.style.opacity = '0')
                        }
                    }
                }}>
                    <div className={'z-[1] absolute _cardBlur full backdrop-blur-[3px] group-hover:backdrop-blur-none transition-all duration-200 ease-in hover:duration-100 hover:ease-out rounded-3xl overflow-hidden'}/>
                    <p className={'_cardText top-0 translate-y-[170%] group-hover:-translate-y-[130%] text-2xl'}>{title}</p>
                    <Image className={'shadow-[var(--boxs1)] object-contain pointer-events-none rounded-3xl'} fill src={'/' + image} alt={alt}/>
                    <p className={'_cardText bottom-0 line-clamp-1 -translate-y-[180%] group-hover:translate-y-[130%] text-lg text-balance'}>{description}</p>
                </div>

                <div className={`_expText min-w-0 w-full h-full col-span-5 lg:col-span-5 xl:col-span-4 ${inverted ? 'row-start-1 xl:col-start-2 text-end justify-self-end' : 'lg:col-start-6 xl:col-start-7 text-start'} flex flex-col justify-evenly p-5`}>
                    <p className={`_expTitle w-fit ${inverted ? 'self-end text-end' : ''} text-nowrap px-2 py-1 text-2xl md:text-3xl lg:text-4xl rounded-lg`}>{title}</p>
                    <p className={'line-clamp-3'}>
                        <span>{description}</span>
                        {subDescription && <>
                            <br/>
                            <span>{subDescription ?? ''}</span>
                        </>}
                    </p>
                </div>

            </div>
        </div>
    )
}