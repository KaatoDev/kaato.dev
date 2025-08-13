export interface Command {
    command: string
    aliases?: string[]
    description?: string
    subcommands?: string[]
    // subcommands: SubCommand[]
}
export interface SubCommand {
    command: string
    description: string
    subcommands?: SubCommand[]

}