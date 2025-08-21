import {doc, getDoc, setDoc} from "firebase/firestore";
import {database} from "@/data/hooks/useFirestore";
import {PluginModel} from "@/data/models/PluginModel";


async function setPlugin(plugin: PluginModel) {
    const pluginRef = doc(database, "plugins", plugin.name)
    const pluginSnap = await getDoc(pluginRef)

    if (!pluginSnap.exists()) {
        await setDoc(pluginRef, {
            ...plugin
        })
    }
}

async function getPlugin(name: string) {
    const pluginRef = doc(database, "plugins", name)
    const pluginSnap = await getDoc(pluginRef)

    if (pluginSnap.exists()) {
        return await getDoc(pluginRef).then((plugin) => {
            return plugin.data() as PluginModel
        })
    }
}

export default function useUserDb() {

    return {setPlugin, getPlugin}
}