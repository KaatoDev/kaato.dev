'use client'

import "../../../components/styles/pages.scss";
import {PluginCardSimple} from "@/components/PluginCardSimple";
import {usePluginContext} from "@/data/contexts/PluginsContext";
import Link from "next/link";
import {useState} from "react";

export default function Plugins() {
    const {plugins = []} = usePluginContext()
    const [viewPlugin, setViewPlugin] = useState(false)

    return (
        <div className={'_home full flex flex-col items-center text-white/85'}>
            <div className={'flex-center-col text-2xl mt-[22vh] px-7 py-5 text-center rounded-4xl shadow-[var(--boxs9)]'}>
                <p className={'pb-5'}>Página nova atualmente em deselvolvimento!</p>
                <p>Ver página de plugins antiga:</p>
                <Link target={'_blank'} className={'text-blue-300 text-shadow-black/10 text-shadow-lg'} href={'https://old.kaato.dev/plugins'}>old.kaato.dev/plugins</Link>
                <p className={'pt-5'}>
                    <span className={'text-blue-300 text-shadow-black/7 text-shadow-lg cursor-pointer'} onClick={() => setViewPlugin(!viewPlugin)}>Ver modelo atual</span>
                    <span> (ainda em desenvolvimento)</span>
                </p>
            </div>

            {viewPlugin && <div className={'w-full h-[70vh] flex-center'}>
                {plugins.length > 0 &&
                    <PluginCardSimple plugin={plugins[28]}/>
                }
            </div>
            }
        </div>
    );
}