'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {PluginModel} from "@/data/models/PluginModel";
import usePlugin from "@/data/hooks/usePlugin";

const PluginContext = createContext<PluginModel[]>([])

export function PluginProvider({children}: { children: ReactNode }) {
    const {getAllPlugins} = usePlugin()
    const [plugins, setPlugins] = useState<PluginModel[]>([])

    useEffect(() => {
        getAllPlugins().then(setPlugins)
    }, []);

    return (
        <PluginContext value={plugins}>
            {children}
        </PluginContext>
    )
}

export const usePluginContext = () => useContext(PluginContext);