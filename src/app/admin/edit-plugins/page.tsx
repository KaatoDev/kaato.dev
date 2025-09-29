'use client'
import {PluginModel} from "@/data/models/PluginModel";
import {useState} from "react";
import {usePluginContext} from "@/data/contexts/PluginsContext";

export default function EditPlugins() {
    const [onEditPlugin, setOnEditPlugin] = useState<PluginModel | null>(null)
    const plugins = usePluginContext()
    const pluginsNames = plugins.map(it => it.name)

    function handlePlugins(pl: string) {
        setOnEditPlugin(plugins.find(it => it.name === pl) ?? null)
    }

    return (
        <div className={'flex-center-col'}>
            <div>
                <select onChange={(e) => handlePlugins(e.target.value)}>
                    <option value={'null'}>Selecione um plugin</option>
                    {pluginsNames.map((it, i) => <option value={it} key={i}>{it}</option>)}
                </select>
            </div>

            <div className={`${onEditPlugin ? 'hidden' : 'flex'}`}>
                bbbbbb
            </div>

            <div className={`${onEditPlugin ? 'flex' : 'hidden'}`}>
                {/*{onEditPlugin && [...Object.entries(onEditPlugin)].map(([key, value]) => */}
                {/*    <div key={key}>{key}: {value}</div>*/}
                {/*)}*/}
                <pre>
                    {onEditPlugin && JSON.stringify(onEditPlugin.commands, null, 2)}
                </pre>
            </div>
        </div>
    )
}