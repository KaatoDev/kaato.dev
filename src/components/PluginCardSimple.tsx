import {PluginModel} from "@/data/models/PluginModel";
import Image from "next/image";
import Link from "next/link";
import useLocalStorage from "@/data/hooks/useLocalStorage";
import './styles/cards.scss'

export function PluginCardSimple(props: { plugin: PluginModel, hasDownload?: boolean }) {
    const {plugin, hasDownload} = props

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

    const github = `https://git.kaato.dev/${plugin.repository ?? ''}`
    const download = plugin.downloadLink ?? ''
    const version = `v${plugin.version}`
    const {get, set} = useLocalStorage();

    function setPluginCookie() {
        set('plugin', plugin.name)
    }

    return (
        <div className={'bg-white/10 _pluginCard relative h-full min-h-[400px] max-h-[500px] aspect-[8/11] flex-center-col bg-tests'} onClick={setPluginCookie}>
            <div className={'w-full h-1/3 flex-center-col'}>
                <div className={'absolute w-fit h-fit top-0 left-0 rounded-full border border-white font-bold px-3.5 py-1 backdrop-blur-md'}>
                    <p>{version}</p>
                </div>

                <div className={'full'}>
                    {plugin.image ?
                        <div className={'relative full flex'}>
                            <Image className={'contain-object'} fill src={plugin.image} alt={plugin.name}/>
                        </div>
                        :
                        <div className={'absolutes full flex-center-col text-center font-bold top-0 left-0'}>
                            <p className={'text-3xl'}>NOTZ</p>
                            <p className={'text-5xl max-w-full text-ellipsis'}>{plugin.name.replace('Notz', '')}</p>
                        </div>
                    }
                </div>

                <p className={'py-2 font-bold'}>{status(plugin.status)}</p>
            </div>

            <ul className={"_items flex-1 w-full flex flex-col list-['⧽'] pl-6 pr-4 py-3"}>
                {plugin.items.map((it, i) =>
                    <li className={'px-2'} key={i}>{it}</li>
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
                        <div key={i}>
                            <Link href={it} className={`w-1/2 text-lg font-bold ${plugin.repository ? i == 1 && hasDownload != true ? 'line-through' : '' : 'line-through'}`}>{i == 0 ? 'GitHub' : 'Download'}</Link>
                            {(plugin.repository && i == 0 || i == 1 && hasDownload == true) &&
                                <div>
                                    aa
                                    {/*<Image/>*/}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

            <p>Clique para mais informações!</p>
        </div>
    )
}