import {RefObject, useRef} from "react";
import Image from "next/image";
import "./styles/components.scss";

interface SelectDropProps {
    className?: string,
    refInput?: RefObject<HTMLInputElement | null>,
    list: string[],
    display: string,
    setValue: (str: string) => void
}

export function SelectDrop(props: SelectDropProps) {
    const {className, list, display, setValue} = props
    const refInput = useRef<HTMLInputElement>(null)

    return (
        <div className={`z-[1] relative group _select ${className ?? ''}`}>
            <label className={'relative _selabel border border-black/5 full flex-center rounded-xl p-1 ps-2.5 gap-1 cursor-pointer select-none'}>
                <input ref={refInput} className={'absolute opacity-0 w-0 h-0 cursor-pointer'} type="checkbox"/>
                <p className={'full text-center'}>{display}</p>
                <div className={'h-full aspect-square top-0 right-0 -rotate-90 group-has-[input:checked]:rotate-90 transition-all pointer-events-none'}>
                    <Image className={'object-contain'} fill src={'/google/arrow_backward.svg'} alt={'Abrir menu'}/>
                </div>
            </label>
            <ul className={`absolute _dropSelect top-full right-0 w-full max-h-[20.6rem] overflow-y-auto hidde mt-0.5 group-has-[input:checked]:border group-has-[input:checked]:border-y-2 border-black/12 group-has-[input:checked]:h-fit h-0 flex flex-col text-center rounded-2xl overflow-hidden`} onClick={(e) => {
                e.preventDefault()
                if (refInput.current) refInput.current.checked = false
                setValue((e.target as HTMLLIElement).dataset.value ?? (e.target as HTMLLIElement).value.toString())
            }}>
                {list?.map((it, i) =>
                    <li className={'hover:bg-[var(--color10)] py-1 cursor-pointer last-of-type:border-none border-b border-black/12'} key={i} data-value={it} value={i + 1}>{it}</li>)
                }
            </ul>
        </div>
    )
}