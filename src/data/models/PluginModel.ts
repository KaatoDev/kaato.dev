import {Command} from "./plugin/Command";
import {Permission} from "./plugin/Permission";

export interface PluginModelOld {
    name: string;
    description: string;
    items: string[];
    status: 1 | 2 | 3 | 4;
    version: string | number;
    versionType: string;
    testedVersions: number[];
    createdAt: Date;
    deletedAt?: Date;
    extrasLinks?: Map<string, string>;
    commands?: Command[];
    permissions?: Permission[];
    placeholders?: string;
    futureVersions?: (string | number)[];
    futureChangelogs?: string[];
    anteriorVersions?: (string | number)[];
    anteriorChangelogs?: string[];
    changelog?: string[];
    descriptionItems?: string[];
    repository?: string;
    downloadLink?: string;
    videoLink?: string;
    image?: string;
    imageBack?: string;
    imageAlt?: string;
    dependencies?: string[];
    worksWith?: PluginModel[];
}

interface PluginVersion {
    version: string;
    changelog: string[];
}

export interface PluginModel {
    versions: PluginVersion
    status: 1 | 2 | 3 | 4
    name: string
    description: string
    version: string | number
    versionType: string
    items: string[]
    testedVersions: string[]
    tags: string[]
    commands?: string[]
    repository?: string
    image?: string
    imageBack?: string
    dependencies?: string
    permissions?: string[]
    descriptionItems?: string[]
    placeholders?: string[]
}

export function createPlugin(versions: PluginVersion, status: 1 | 2 | 3 | 4, name: string, description: string, version: string | number, items: string[], testedVersions: string[], tags: string[]): PluginModel {
    return {
        versions,
        status,
        name,
        description,
        version,
        items,
        testedVersions,
        tags,
        versionType: 'spigot'
    }
}