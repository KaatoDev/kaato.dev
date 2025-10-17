'use client'

import "../../../components/styles/pages.scss";
import {PluginCardSimple} from "@/components/PluginCardSimple";
import {usePluginContext} from "@/data/contexts/PluginsContext";

export default function Plugins() {
    const {plugins = []} = usePluginContext()

    return (
        <div className={'_home full flex-center'}>
            <div className={'h-full w-1/2 bg-tests flex-center'}>
                {/*<img src={img} alt=""/>*/}
                {plugins.length > 0 &&
                        <PluginCardSimple plugin={plugins[1]}/>
                }
            </div>
            <div className={'h-full w-1/2 bg-test flex-center'}>
                {/*<img src={img} alt=""/>*/}
                {plugins.length > 0 &&
                        <PluginCardSimple plugin={plugins[1]}/>
                }
            </div>
        </div>
    );
}