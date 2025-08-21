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

export interface PluginVersion {
    version: string;
    changelog: string[];
}

export interface PluginPermission {
    permission: string;
    description: string;
    isDefault: boolean;
}

export interface PluginCommand {
    command: string;
    description: string;
    aliases: string[];
    subCommands: PluginSubCommand[]
}

export interface PluginSubCommand {
    sub: string;
    description: string;
    specialName?: string;
}

export interface PluginModel {
    versions: PluginVersion[]
    status: 1 | 2 | 3 | 4
    name: string
    description: string
    serverVersion: string | number
    serverType: string
    items: string[]
    testedVersions: string[]
    tags: string[]
    commands?: PluginCommand[]
    repository?: string
    image?: string
    imageBack?: string
    dependencies?: string
    permissions?: PluginPermission[]
    descriptionItems?: string[]
    placeholders?: string[]
}

export function createPluginModel(versions: PluginVersion[],
                                  status: 1 | 2 | 3 | 4,
                                  name: string,
                                  description: string,
                                  serverVersion: string | number,
                                  items: string[],
                                  testedVersions: string[],
                                  tags: string[],
                                  commands?: PluginCommand[] | null,
                                  repository?: string | null,
                                  image?: string | null,
                                  imageBack?: string | null,
                                  dependencies?: string | null,
                                  permissions?: PluginPermission[] | null,
                                  descriptionItems?: string[] | null,
                                  placeholders?: string[] | null): PluginModel {
    const plugin: PluginModel = {
        versions,
        status,
        name,
        description,
        serverVersion,
        items,
        testedVersions,
        tags,
        serverType: 'spigot'
    }

    if (!!commands && commands.length > 1) plugin.commands = commands
    if (!!repository && repository?.length > 1) plugin.repository = repository
    if (!!image && image?.length > 1) plugin.image = image
    if (!!imageBack && imageBack?.length > 1) plugin.imageBack = imageBack
    if (!!dependencies && dependencies?.length > 1) plugin.dependencies = dependencies
    if (!!permissions && permissions?.length > 1) plugin.permissions = permissions
    if (!!descriptionItems && descriptionItems?.length > 1) plugin.descriptionItems = descriptionItems
    if (!!placeholders && placeholders?.length > 1) plugin.placeholders = placeholders

    return plugin
}