'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {PluginModel} from "@/data/models/PluginModel";
import usePlugin from "@/data/hooks/usePlugin";

interface PluginsContextType {
    plugins: PluginModel[],
    // setUpdate: Dispatch<SetStateAction<boolean>> | null
    updatePlugins: () => void
}

const PluginContext = createContext<PluginsContextType>({
    plugins: [], updatePlugins: () => {
    }
})

export function PluginProvider({children}: { children: ReactNode }) {
    const {getAllPlugins} = usePlugin()
    const [plugins, setPlugins] = useState<PluginModel[]>([])

    function updatePlugins() {
        getAllPlugins().then(setPlugins)
    }

    useEffect(() => {
        updatePlugins()
    }, []);

    return (
        <PluginContext value={{plugins, updatePlugins}}>
            {children}
        </PluginContext>
    )
}

export const usePluginContext = () => useContext(PluginContext);