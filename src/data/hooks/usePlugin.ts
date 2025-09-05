import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {database} from "@/data/hooks/useFirestore";
import {PluginModel} from "@/data/models/PluginModel";


async function setPlugin(plugin: PluginModel) {
    const pluginRef = doc(database, "plugins", plugin.name)
    const pluginSnap = await getDoc(pluginRef)
    const exists = pluginSnap.exists()

    await setDoc(pluginRef, {
        ...plugin
    })

    return exists
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

async function removePlugin(name: string) {
    const pluginRef = doc(database, "plugins", name)
    await deleteDoc(pluginRef).then(() => {
        return true
    })
    return false
}

async function getAllPlugins() {
    const pluginRef = collection(database, "plugins")
    const pluginSnap = await getDocs(pluginRef)
    const pls = pluginSnap.docs.map((doc) => doc.data() as PluginModel)
    return pls
}

async function forMaintenance() {

    const cratesRef = collection(database, "plugins");
    const snapshot = await getDocs(cratesRef);

    console.log(`Found ${snapshot.size} docs in "NotzCrates"`);

    for (const d of snapshot.docs) {
        const data = d.data();

        if (Array.isArray(data.commands)) {
            const newCommands = data.commands.map((cmd: any) => {
                if ("subcommands" in cmd) {
                    const {subcommands, ...rest} = cmd;
                    return {
                        ...rest,
                        subCommands: subcommands,
                    };
                }
                return cmd;
            });

            console.log(`Updating doc ${d.id}...`);

            await updateDoc(doc(database, "plugins", d.id), {
                commands: newCommands,
            });
        }
    }

    console.log("Migration complete ✅");
}

export default function usePlugin() {
    return {setPlugin, getPlugin, getAllPlugins, forMaintenance, removePlugin}
}