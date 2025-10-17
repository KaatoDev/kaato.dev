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
    version: string
    status: 1 | 2 | 3 | 4
    name: string
    description: string
    serverType: string
    items: string[]
    testedVersions: string[]
    tags: string[]
    createdAt: Date;
    deletedAt?: Date;
    downloadLink?: string;
    commands?: PluginCommand[]
    repository?: string
    image?: string
    imageBack?: string
    dependencies?: string[]
    permissions?: PluginPermission[]
    descriptionItems?: string[]
    placeholders?: string[]
    extraLinks?: Map<string, string>,
    videoLink?: string;
    worksWith?: string[];
}

export function createPluginModel(versions: PluginVersion[],
                                  status: 1 | 2 | 3 | 4,
                                  name: string,
                                  description: string,
                                  version: string,
                                  items: string[],
                                  testedVersions: string[],
                                  tags: string[],
                                  createdAt: Date,
                                  deletedAt?: Date | null,
                                  commands?: PluginCommand[] | null,
                                  repository?: string | null,
                                  image?: string | null,
                                  imageBack?: string | null,
                                  dependencies?: string[] | null,
                                  permissions?: PluginPermission[] | null,
                                  descriptionItems?: string[] | null,
                                  placeholders?: string[] | null,
                                  extraLinks?: Map<string, string> | null,
                                  downloadLink?: string | null,
                                  videoLink?: string | null,
                                  worksWith?: string[] | null): PluginModel {
    const plugin: PluginModel = {
        versions,
        status,
        name,
        description,
        version,
        items,
        testedVersions,
        tags,
        createdAt,
        serverType: 'spigot'
    }

    if (!!commands && commands.length > 0) plugin.commands = commands
    if (!!repository && repository?.length > 1) plugin.repository = repository
    if (!!image && image?.length > 1) plugin.image = image
    if (!!imageBack && imageBack?.length > 1) plugin.imageBack = imageBack
    if (!!dependencies && dependencies?.length > 0) plugin.dependencies = dependencies
    if (!!permissions && permissions?.length > 0) plugin.permissions = permissions
    if (!!descriptionItems && descriptionItems?.length > 0) plugin.descriptionItems = descriptionItems
    if (!!placeholders && placeholders?.length > 0) plugin.placeholders = placeholders
    if (!!extraLinks && extraLinks?.size > 0) plugin.extraLinks = extraLinks
    if (!!deletedAt) plugin.deletedAt = deletedAt
    if (!!downloadLink && downloadLink?.length > 1) plugin.downloadLink = downloadLink
    if (!!videoLink && videoLink?.length > 1) plugin.videoLink = videoLink
    if (!!worksWith && worksWith?.length > 0) plugin.worksWith = worksWith

    return plugin
}