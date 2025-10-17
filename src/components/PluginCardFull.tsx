import {PluginModel} from "@/data/models/PluginModel";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "@/data/hooks/useLocalStorage";

export function PluginCardSimple(props: { plugin: PluginModel }) {
    const {plugin} = props

    function status(status: 1 | 2 | 3 | 4) {
        switch (status) {
            case 1:
                return 'Em planejamento'
            case 2:
                return 'Em desenvolvimento'
            case 3:
            case 4:
                return 'Plugin disponível'
        }
    }

    const github = `https://git.kaato.dev/${plugin.repository}`
    const download = `${github}/NotzScoreboardV3/releases/tag/v${plugin.version}`
    const {get, set} = useLocalStorage();

    function setPluginCookie() {
        set('plugin', plugin.name)
    }

    return (
        <div className={'relative full max-h-[500px] aspect-[8/11] flex-center-col bg-test'} onClick={setPluginCookie}>
            <div className={'w-full h-fit flex-center-col'}>
                <div className={'absolute w-fit h-fit top-0 left-0 rounded-full border border-white px-2 py-1 backdrop-blur-md'}>
                    <p>{plugin.version}</p>
                </div>

                <div>
                    {plugin.image ?
                        <Image className={'contain-object'} fill src={plugin.image} alt={plugin.name}/>
                        :
                        <div className={'absolute full'}>
                            {plugin.name}
                        </div>
                    }
                </div>

                <p>{status(plugin.status)}</p>
            </div>

            <ul className={'flex-1 w-full flex-center-col'}>
                {plugin.items.map((it, i) =>
                    <li key={i}>{it}</li>
                )}
            </ul>

            <div className={'w-full h-fit flex-center-col'}>
                <div className={'px-3 py-2'}>
                    <p className={'text-sm opacity-85'}>
                        <span>Versões testadas:</span>
                        <span>{plugin.testedVersions.join(', ')}</span>
                    </p>
                </div>

                <div className={'w-full flex px-3 py-2'}>
                    {[github, download].map((it, i) =>
                        <Link href={it} className={'w-1/2 text-lg font-bold'} key={i}>{i == 0 ? 'GitHub' : 'Download'}</Link>
                    )}
                </div>
            </div>

            <p>Clique para mais informações!</p>
        </div>
    )
}