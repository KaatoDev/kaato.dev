'use client'
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {createPluginModel, PluginCommand, PluginModel, PluginPermission, PluginSubCommand, PluginVersion} from "@/data/models/PluginModel";
import Link from "next/link";
import Image from "next/image";
import usePlugin from "@/data/hooks/usePlugin";
import {usePluginContext} from "@/data/contexts/PluginsContext";
import {SelectDrop} from "@/components/SelectDrop";

export default function CreatePlugin() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [version, setVersion] = useState('')
    const [pluginStatus, setPluginStatus] = useState<string>('4')
    const [versions, setVersions] = useState<PluginVersion[]>([])
    const [permissions, setPermissions] = useState<PluginPermission[]>([])
    const [commands, setCommands] = useState<PluginCommand[]>([])
    const [testedVersions, setTestedVersions] = useState<string[]>(['1.8'])
    const [tags, setTags] = useState<string[]>(['RankUp'])
    const [items, setItems] = useState<string[]>([])
    const [descriptionItems, setDescriptionItems] = useState<string[]>([])
    const [isRequired, setIsRequired] = useState(false)
    const [repository, setRepository] = useState('')
    const [dependencies, setDependencies] = useState<string[]>([])
    const [imageLink, setImageLink] = useState('')
    const [backImageLink, setBackImageLink] = useState('')
    const [placeholders, setPlaceholders] = useState<string[]>([])
    const [extraLinks, setExtraLinks] = useState<Map<string, string>>(new Map())
    const [createButtonText, setCreateButtonText] = useState('Criar plugin')
    const [waitPlugin, setWaitPlugin] = useState(false)
    const [onRemovePlugin, setOnRemovePlugin] = useState(false)
    const seinput = useRef<HTMLInputElement>(null)

    const versionList = ['1.8', '1.9', '1.10', '1.11', '1.12', '1.13', '1.14', '1.15', '1.16', '1.17', '1.18', '1.19', '1.20', '1.21']
    const statuses = ['Disponível', 'Em desenvolvimento', 'Em planejamento', 'Pendente']
    const pluginTags = ['Essencial', 'Economia', 'RankUp', 'Prison', 'Factions', 'Minigames', 'Moderação', 'API']

    function handleRemovePlugin() {
        if (onRemovePlugin) {
            setOnRemovePlugin(false)
            if (!!onEditPlugin) {
                removePlugin(onEditPlugin.name)
                // handleCreateButtonText(`Plugin ${onEditPlugin.name} deletado!`)
                setOnEditPlugin(null)
                setPluginsNames([...plugins.map(it => it.name)])
            }
            return
        }
        setOnRemovePlugin(true)
        updatePlugins()
    }

    function handleVersions(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const pl = Object.fromEntries(data.entries()) as { version: string, changelog: string }
        const pluginVersion = {version: pl.version, changelog: pl.changelog.split('\n').filter(i => i.length > 0)}

        if (pluginVersion.version.length === 0 || versions.map((it) => it.version).includes(pluginVersion.version)) return
        setVersions([...versions, pluginVersion])
        e.currentTarget.reset()
    }

    function removePluginVersion(it: PluginVersion) {
        const pls = versions.filter(i => i !== it)
        setVersions([...pls])
    }

    function handleCommands(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const cmd = Object.fromEntries(data.entries()) as unknown as { command: string, description: string, aliases: string }
        const command = {command: cmd.command, description: cmd.description, aliases: cmd.aliases.split(','), subCommands: []}

        if (command.command.length === 0 || commands.map((it) => it.command).includes(command.command)) return
        setCommands([...commands, command])
        e.currentTarget.reset()
    }

    function removeCommand(it: PluginCommand) {
        const cmds = commands.filter(i => i !== it)
        setCommands([...cmds])
    }

    function handleSubcommands2(i: number, e: React.FormEvent<HTMLFormElement>, hasSpecialName: boolean, specialName?: string) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const sub = Object.fromEntries(data.entries()) as unknown as PluginSubCommand
        if (!!specialName) sub.specialName = specialName
        if ([sub.sub, sub.description].filter((it) => it.length == 0).length > 0 || (hasSpecialName && sub.specialName?.length == 0)) return
        const cmds = commands
        if (cmds[i].subCommands.map((it) => {
            return it.specialName == sub.specialName && it.sub == sub.sub
        }).includes(true)) return

        cmds[i].subCommands.push(sub)
        setCommands([...cmds])
        e.currentTarget.reset()
    }

    async function removeSubCommand(it: PluginCommand, its: PluginSubCommand) {
        const cmds = commands.filter(i => i !== it)
        it.subCommands = it.subCommands.filter(i => i !== its)
        setCommands([...cmds, it])
    }

    function handlePermissions(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const perm = Object.fromEntries(data.entries()) as unknown as { permission: string, description: string, isDefault: string }
        const permission = {permission: perm.permission, description: perm.description, isDefault: perm.isDefault == 'true'}

        if (permission.permission.length === 0 || permission.description.length === 0) return
        setPermissions([...permissions, permission])
        e.currentTarget.reset()
    }

    function removePermission(it: PluginPermission) {
        const perms = permissions.filter(i => i !== it)
        setPermissions(perms)
    }

    function handleRequired(it: string | string[] | PluginVersion[]) {
        if (isRequired) return it.length === 0
        return false
    }

    function handleTestedVersions(it: string) {
        testedVersions.includes(it) ? setTestedVersions(testedVersions.filter(i => i !== it)) : setTestedVersions([...testedVersions, it])
    }

    function handleTags(it: string) {
        tags.includes(it) ? setTags(tags.filter(i => i !== it)) : setTags([...tags, it])
    }

    function handleOtherTags(it: string) {
        const addTags = it.split('\n').filter(i => i.length > 0)
        setTags([...tags, ...addTags])
    }

    function handleDependencies(it: string) {
        setDependencies(it.split('\n').filter(i => i.length > 0))
    }

    function handleItems(it: string) {
        setItems(it.split('\n').filter(i => i.length > 0))
    }

    function handlePlaceholders(it: string) {
        setPlaceholders(it.split('\n').filter(i => i.length > 0))
    }

    function handleDescriptionItems(it: string) {
        setDescriptionItems(it.split('\n').filter(i => i.length > 0))
    }


    const {setPlugin, removePlugin} = usePlugin()

    function createPlugin() {
        if (waitPlugin) return
        setWaitPlugin(true)
        setTimeout(() => setWaitPlugin(false), 5000)

        const reqs = [name, description, version, versions, testedVersions, tags, items].map(it => it.length === 0).includes(true)
        setIsRequired(reqs)


        if (reqs) {
            handleCreateButtonText('Preencha os requisitos!')
            return
        }

        const p = createPluginModel(versions, pluginStatus as unknown as 1 | 2 | 3 | 4, name, description, version, items, testedVersions, tags, commands, repository, imageLink, backImageLink, dependencies, permissions, descriptionItems, placeholders);

        if (p != null) setPlugin(p).then(res => {
            window.scrollTo(0, 0)
            handleCreateButtonText(`Plugin '${p.name}' ${res ? 'editado' : 'criado'}!`)
            setPluginsNames([...plugins.map(it => it.name)])
        })
        else {
            handleCreateButtonText('Plugin inválido!')
        }

        setOnEditPlugin(null)
        updatePlugins()
    }

    async function handleCreateButtonText(text: string) {
        const cleanText = async (text: string) => {
            const buttonText = text
            const time = 1000 / buttonText.length

            for (let i = buttonText.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    if (i === 0) setCreateButtonText('')
                    else setCreateButtonText(buttonText.slice(0, i))
                }, time * (buttonText.length - i))
            }
        }

        const writeText = async (text: string) => {
            setTimeout(() => {
                let buttonText = ''
                const time = 1000 / text.length

                for (let i = 0; i < text.length; i++) {
                    setTimeout(() => {
                        buttonText += text[i]
                        setCreateButtonText(buttonText)
                    }, time * i)
                }
            }, 1000)
        }

        await cleanText(createButtonText)
        await writeText(text)

        setTimeout(() => {
            cleanText(text)
            writeText('Criar plugin')
        }, 3000)
    }

    const {plugins, updatePlugins} = usePluginContext()
    const [onEditPlugin, setOnEditPlugin] = useState<PluginModel | null>(null)
    const [pluginsNames, setPluginsNames] = useState<string[]>([...plugins.map(it => it.name)])
    setTimeout(() => setPluginsNames([...plugins.map(it => it.name)]), 100)

    function handlePlugins(pl: string) {
        setOnEditPlugin(plugins.find(it => it.name === pl) ?? null)
    }

    useEffect(() => {
        if (onEditPlugin != null) {
            const pl = onEditPlugin
            setName(pl.name)
            setDescription(pl.description)
            setVersion(pl.version)
            setPluginStatus(pl.status as unknown as string)
            setVersions(pl.versions)
            setTestedVersions(pl.testedVersions)
            setTags(pl.tags)
            setItems(pl.items)
            if (!!pl.permissions) setPermissions([...pl.permissions])
            if (!!pl.commands) setCommands([...pl.commands])
            if (!!pl.descriptionItems) setDescriptionItems([...pl.descriptionItems])
            if (!!pl.repository) setRepository(pl.repository)
            if (!!pl.dependencies) setDependencies([...pl.dependencies])
            if (!!pl.image) setImageLink(pl.image)
            if (!!pl.imageBack) setBackImageLink(pl.imageBack)
            if (!!pl.placeholders) setPlaceholders([...pl.placeholders])
            if (!!pl.extraLinks) setExtraLinks(pl.extraLinks)
        } else {
            setName('')
            setDescription('')
            setVersion('')
            setPluginStatus('4')
            setVersions([])
            setPermissions([])
            setCommands([])
            setTestedVersions(['1.8'])
            setTags(['RankUp'])
            setItems([])
            setDescriptionItems([])
            setRepository('')
            setDependencies([])
            setImageLink('')
            setBackImageLink('')
            setPlaceholders([])
        }
    }, [onEditPlugin]);

    return (
        <div className={'_create-plugin containerer'}>
            <div className={'full flex-center gap-3 py-3'}>
                <p>Editar plugin:</p>
                <SelectDrop className={'w-44 h-8.5'} list={pluginsNames} display={onEditPlugin?.name ?? 'Novo Plugin'} setValue={handlePlugins}/>
                <div className={'relative h-7.5 aspect-square cursor-pointer rounded-full bg-red-400/40'} onClick={() => handleRemovePlugin()}>
                    <Image fill className={'object-contain p-1'} src={'/google/delete.svg'} alt={'Deletar plugin'}/>
                </div>
            </div>

            <div className={'_form flex flex-col justify-center items-center lg:grid grid-cols-2 xl:grid-cols-3 grid-flow-dense gap-10 p-5 rounded-4xl'}>
                <div className={'_area'}>
                    <label className={'_lb'}>
                        <p>Nome do plugin:</p>
                        <input type="text" name={'name'} value={name} required={handleRequired(name)} placeholder={'NotzPlugin'} onChange={(e) => setName(e.target.value)}/>
                    </label>

                    <label className={'_lb'}>
                        <p>Descrição do plugin:</p>
                        <input type="text" name={'description'} value={description} required={handleRequired(description)} placeholder={'Plugin de rankup'} onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                </div>

                <div className={'_area max-xl:col-span-2'}>
                    <label className={'_lb'}>
                        <p>Versão atual do plugin:</p>
                        <input type="text" name={'version'} value={version} required={handleRequired(version)} placeholder={'v3.2'} onChange={(e) => setVersion(e.target.value)}/>
                    </label>

                    <div className={'full flex-center-col gap-2'}>
                        <p>Status desenvolvimento: {pluginStatus}</p>
                        <SelectDrop className={'w-48 h-8 flex'} refInput={seinput} list={statuses} display={statuses[(pluginStatus as unknown as number) - 1]} setValue={setPluginStatus}/>
                    </div>
                </div>

                <div className={'_area2 md:!px-6 md:!gap-7 max-2xl:flex-col max-2xl:row-span-2 col-span-1 md:col-span-2 xl:col-span-3'}>
                    <label className={'_lb gap-2'}>
                        <p>Itens do plugin:</p>
                        <textarea className={'w-full'} name="items" required={handleRequired(items)} value={items?.join('\n\n') ?? ''} placeholder={'Crates: sistema personalizado...'} onChange={(e) => handleItems(e.target.value)} cols={38} rows={10}></textarea>
                    </label>

                    <label className={'_lb gap-2'}>
                        <p>Items detalhados:</p>
                        <textarea className={'w-full'} name="descriptionItems" required={handleRequired(descriptionItems)} value={descriptionItems?.join('\n\n') ?? ''} placeholder={'**Crates** \n - Sistema personalizado...'} onChange={(e) => handleDescriptionItems(e.target.value)} cols={38} rows={10}></textarea>
                    </label>
                </div>

                <div className={'_area2 col-span-2'}>
                    <fieldset style={{'--sizeCheckbox': '100px'} as CSSProperties} className={'_tv grid w-full justify-evenly gap-x-2 gap-y-3 p-3'}>
                        <legend>Tags do plugin</legend>
                        {pluginTags.map((it, i) =>
                            <label className={'relative full flex-center py-1 cursor-pointer select-none rounded-lg bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40 pt-0.5'} key={i}>
                                <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} required={handleRequired(tags)} type="checkbox" value={it} onChange={() => handleTags(it)} checked={tags.includes(it)}/>
                                <p>{it}</p>
                            </label>
                        )}
                    </fieldset>

                    <label className={'_lb'}>
                        <p>Outras tags do plugin:</p>
                        <textarea placeholder={'Outras...'} value={tags.filter(it => !pluginTags.includes(it))?.join('\n\n') ?? ''} onChange={(e) => handleOtherTags(e.target.value)} cols={25} rows={3}></textarea>
                    </label>
                </div>

                <fieldset style={{'--sizeCheckbox': ' 75px'} as CSSProperties} className={'_tv grid w-full justify-evenly gap-x-2 gap-y-3 p-3 col-span-2 lg:col-span-1'}>
                    <legend>Versões testadas</legend>
                    {versionList.map((it, i) => <label className={'relative full flex-center py-1 cursor-pointer select-none rounded-lg bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40'} key={i}>
                        <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} required={handleRequired(testedVersions)} type="checkbox" value={it} onChange={() => handleTestedVersions(it)} checked={testedVersions?.includes(it)}/>
                        <p>{it}</p>
                    </label>)}
                </fieldset>

                <div className={'_area'}>
                    <label className={'_lb'}>
                        <p>Repositório do plugin:</p>
                        <input type="text" name={'repository'} value={repository} placeholder={'NotzScoreboard'} onChange={(e) => setRepository(e.target.value)}/>
                        <Link className={'text-white/60'} href={`https://git.kaato.dev/${repository}`}>
                            https://git.kaato.dev/
                            <span className={'text-blue-100'}>{repository.length === 0 ? '(NotzScoreboard)' : repository}</span>
                        </Link>
                    </label>

                    <label className={'_lb'}>
                        <p>Dependências do plugin:</p>
                        <textarea name="dependencies" placeholder={'PlaceholderAPI...'} value={dependencies?.join('\n\n') ?? ''} onChange={(e) => handleDependencies(e.target.value)} cols={20} rows={3}></textarea>
                    </label>
                </div>

                <div className={`_area col-span-3 ${versions.length === 0 ? 'row-span-1' : 'row-span-2'}`}>
                    <form className={'flex-center-col gap-5'} onSubmit={(e) => handleVersions(e)}>
                        <fieldset className={'_tv flex flex-col gap-3 pb-3 px-6 rounded-2xl shadow-[var(--boxs4)]'}>
                            <legend>Versões do plugin</legend>
                            <label className={'_lb hover:!shadow-none !animate-none !flex-row gap-1'}>
                                <p>Versão:</p>
                                <input type="text" name={'version'} required={handleRequired(versions)} placeholder={'v1.0'}/>
                            </label>
                            <label className={'_lb hover:!shadow-none'}>
                                <p className={'self-start ps-2'}>Changelog:</p>
                                <textarea name={'changelog'} required={handleRequired(versions)} placeholder={'Adicionado...'} cols={50} rows={6}></textarea>
                            </label>
                        </fieldset>

                        <button className={'cursor-pointer bg-blue-500/25 hover:bg-blue-600/50 transition-colors shadow-[var(--boxs2)] p-1 px-3 rounded-xl'}>
                            Adicionar versão
                        </button>
                    </form>

                    <div className={`${versions.length === 0 ? 'hidden' : 'flex'} flex-col full gap-4 shadow-[var(--boxs1)] p-3 px-6 rounded-2xl`}>
                        {versions.map((it, i) => <div className={'flex flex-col gap-1'} key={i}>
                            <div className={'flex justify-between'}>
                                <div className={'flex-center w-fit gap-1'}>
                                    <p className={'w-fit break-all line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>{it.version}</p>
                                    <div className={'relative h-4.5 aspect-square bg-gray-400/15 cursor-pointer rounded-md'} onClick={() => removePluginVersion(it)}>
                                        <Image className={'object-contain opacity-60'} fill src={'/google/close.svg'} alt={'Remover versão'}></Image>
                                    </div>
                                </div>
                            </div>
                            <li className={'wrap-break-word ps-3 pe-2 w-full'}>
                                {it.changelog.length == 0 ? '' : it.changelog.map((vv, ii) =>
                                    <span className={'ps-2'} key={ii}>{vv}
                                        <br/>
                                    </span>)
                                }
                            </li>
                        </div>)}
                    </div>
                </div>
                <div className={`_area col-span-3 xl:col-span-2 ${versions.length === 0 ? 'row-span-1' : 'row-span-2'}`}>
                    <form className={'full flex flex-col justify-evenly items-center gap-5'} onSubmit={(e) => handleCommands(e)}>
                        <fieldset className={'min-w-fit w-3/5 flex flex-col pb-3 px-6 rounded-2xl shadow-[var(--boxs4)]'}>
                            <legend>Comandos do plugin</legend>
                            <label className={'_lb py-1! full'}>
                                <p>Comando:</p>
                                <input className={'w-full'} type="text" name={'command'} placeholder={'notzcrates'}/>
                            </label>
                            <label className={'_lb py-1!'}>
                                <p>Descrição:</p>
                                <input className={'w-full'} type="text" name={'description'} placeholder={'Acesso ao menu do plugin.'}/>
                            </label>
                            <label className={'_lb py-1!'}>
                                <p>Aliases:</p>
                                <input className={'w-full'} type="text" name="aliases" placeholder={'notzcrate, nc...'}></input>
                            </label>
                        </fieldset>

                        <button className={'cursor-pointer bg-blue-500/25 hover:bg-blue-600/50 transition-colors shadow-[var(--boxs2)] p-1 px-3 rounded-xl'}>Adicionar comando</button>
                    </form>

                    <div className={`${commands.length === 0 ? 'hidden' : 'flex'} flex-col full gap-6 shadow-[var(--boxs4)] bg-[var(--color5light1)] p-3 px-6 rounded-2xl`}>

                        {commands?.map((it, i) =>
                            <div className={'flex flex-col gap-1.5'} key={i}>
                                <div className={'flex justify-between'}>
                                    <div className={'flex-center w-fit gap-2'}>
                                        <p className={'flex gap-2'}>
                                            <span className={'w-fit line-clamp-1 text-clip bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>{`/${it.command}`}</span>
                                            <span>{'-'}</span>
                                            <span className={'line-clamp-1'}>{it.description.replace('- ', '')}</span>
                                        </p>
                                        <div className={'relative h-4.5 aspect-square bg-gray-400/15 cursor-pointer rounded-md'} onClick={() => removeCommand(it)}>
                                            <Image className={'object-contain opacity-60'} fill src={'/google/close.svg'} alt={'Remover comando'}></Image>
                                        </div>
                                    </div>
                                    <div className={'w-fit break-all line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>
                                        {it.aliases?.join(', ')}
                                    </div>
                                </div>

                                <ul className={'ps-8'}>
                                    <div className={'flex flex-col gap-1.5'}>
                                        {it.subCommands?.filter((its) => its.specialName == null || its.specialName.length === 0).map((its, is, ar) => <div key={is}>
                                            <li className={'relative w-full list-disc sflex wrap-break-word pe-2'} key={is}>
                                                <div className={'libtn group'} onClick={() => removeSubCommand(it, its)}>
                                                    <Image className={'object-contain opacity-0 group-hover:opacity-100'} fill src={'/google/close.svg'} alt={'Remover subcomando'}></Image>
                                                </div>
                                                <p className={'flex gap-2'}>
                                                    <span className={'w-fit line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>{its.sub}</span>
                                                    <span>{'-'}</span>
                                                    <span className={'line-clamp-1'}>{its.description?.replace('- ', '')}</span>
                                                </p>
                                            </li>
                                        </div>)}

                                        <form autoComplete={'off'} onSubmit={(e) => handleSubcommands2(i, e, false)}>
                                            <li className={'list-disc rounded-lg shadow-[var(--boxs2)]'}>
                                                <div className={'flex justify-between items-center'}>
                                                    <p className={'flex flex-1 gap-2'}><span className={'w-fit max-w-24 line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>
                                                        <input className={'min-w-10 w-full max-w-20'} type="text" name={'sub'} placeholder={'players'}/>
                                            </span>
                                                        <span className={'w-fit'}>
                                                <input className={'min-w-10 w-full lg:w-60 max-w-60'} type="text" name={'description'} placeholder={'Lista todos os players no...'}/>                                            
                                            </span>
                                                    </p>
                                                    <button className={'w-fit bg-wg py-0.5 px-3 md:px-5 cursor-pointer rounded-r-lg border-l-2 border-blue-900/50 bg-blue-200/3'}>Adicionar</button>
                                                </div>
                                            </li>
                                        </form>

                                        {it.subCommands?.filter((its) => !!its.specialName && its.specialName.length > 0).map((its, is, ar) =>
                                            <div className={'flex flex-col gap-1.5'} key={is}>
                                                {(is == 0 || its.specialName != ar[is - 1].specialName) && <li className={'list-disc wrap-break-word pe-2'}>
                                                    <p className={'w-fit line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-1'}>
                                                        <span className={'text-blue-500'}>{'<'}</span>
                                                        <span>{its.specialName}</span>
                                                        <span className={'text-blue-500'}>{'>'}</span>
                                                    </p>
                                                </li>}
                                                <li className={'relative list-[circle] wrap-break-word ms-6 pe-6 has-[.libtn:hover]:flex'}>
                                                    <div className={'libtn group'} onClick={() => removeSubCommand(it, its)}>
                                                        <Image className={'object-contain opacity-0 group-hover:opacity-100'} fill src={'/google/close.svg'} alt={'Remover subcomando'}></Image>
                                                    </div>
                                                    <p className={'flex gap-2'}>
                                                        <span className={'w-fitpsis line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>{its.sub}</span>
                                                        <span>{'-'}</span>
                                                        <span className={'line-clamp-1'}>{its.description.replace('- ', '')}</span>
                                                    </p>
                                                </li>
                                                {ar.length - 1 == is && <form autoComplete={'off'} onSubmit={(e) => handleSubcommands2(i, e, true, its.specialName)}>
                                                    <li className={'list-[circle] ms-6 rounded-lg shadow-[var(--boxs2)]'}>
                                                        <div className={'flex justify-between items-center'}>
                                                            <p className={'flex flex-1 gap-2'}>
                                                            <span className={'w-fit max-w-24 line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>
                                                                <input className={'min-w-10 full max-w-20'} type="text" name={'sub'} placeholder={'addplayer'}/>
                                                            </span>
                                                                <span>{'-'}</span>
                                                                <span className={'w-fit'}>
                                                                <input className={'min-w-10 w-full lg:w-60 max-w-60'} type="text" name={'description'} placeholder={'Adiciona um player ao...'}/>
                                                            </span>
                                                            </p>
                                                            <button className={'w-fit bg-wg py-0.5 px-3 md:px-5 cursor-pointer rounded-r-lg border-l-2 border-blue-900/50 bg-blue-200/3'}>Adicionar</button>
                                                        </div>
                                                    </li>
                                                </form>}
                                            </div>)}

                                        <form autoComplete={'off'} onSubmit={(e) => handleSubcommands2(i, e, true)}>
                                            <div className={'flex flex-col gap-1.5'}>

                                                <li className={'list-disc pe-2'}>
                                                    <p className={'w-fit line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-1'}>
                                                        <span className={'text-blue-500 select-none'}>{'<'}</span>
                                                        <input className={'w-21'} type="text" name={'specialName'} placeholder={'scoreboard'}/>
                                                        <span className={'text-blue-500 select-none'}>{'>'}</span>
                                                    </p>
                                                </li>
                                                <li className={'list-[circle] ms-6 rounded-lg shadow-[var(--boxs2)]'}>
                                                    <div className={'flex justify-between items-center'}>
                                                        <p className={'flex flex-1 gap-2'}>
                                            <span className={'w-fit max-w-24 line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>
                                                <input className={'min-w-10 w-full max-w-20'} type="text" name={'sub'} placeholder={'remplayer'}/>
                                            </span>
                                                            <span>{'-'}</span>
                                                            <span className={'w-fit'}>
                                                <input className={'min-w-10 w-full lg:w-60 max-w-60'} type="text" name={'description'} placeholder={'Remove um player do...'}/>                                            
                                            </span>
                                                        </p>
                                                        <button className={'w-fit bg-wg py-0.5 px-3 md:px-5 cursor-pointer rounded-r-lg border-l-2 border-blue-900/50 bg-blue-200/3'}>Adicionar</button>
                                                    </div>
                                                </li>
                                            </div>
                                        </form>
                                    </div>
                                </ul>
                            </div>)}
                    </div>
                </div>

                <div className={'_area'}>
                    <label className={'_lb px-4'}>
                        <p>Imagem ícone do plugin:</p>
                        <input className={'w-full'} type="text" name={'imageLink'} value={imageLink} placeholder={'Link da imagem'} onChange={(e) => setImageLink(e.target.value)}/>
                        {/*<div className={`relative w-fit ${backImageLink.length === 0 ? '' : 'h-12'}`}>*/}
                        {/*    <Image fill className={'object-contain'} src={imageLink} alt={''}/>*/}
                        {/*</div>*/}
                    </label>

                    <label className={'_lb px-4'}>
                        <p>Imagem background do plugin:</p>
                        <input className={'w-full'} type="text" name={'backImageLink'} value={backImageLink} placeholder={'Link da imagem do background'} onChange={(e) => setBackImageLink(e.target.value)}/>
                        {/*<div className={`relative w-fit ${backImageLink.length === 0 ? '' : 'h-12'}`}>*/}
                        {/*    <Image fill className={'object-contain'} src={backImageLink} alt={''}/>*/}
                        {/*</div>*/}
                    </label>
                </div>

                <form className={`_area col-span-3 xl:col-span-2 ${permissions.length === 0 ? 'row-span-1' : 'max-lg:row-span-2'}`} onSubmit={(e) => handlePermissions(e)}>
                    <fieldset className={'flex flex-col gap-3 pb-3 px-6 rounded-2xl shadow-[var(--boxs4)]'}>
                        <legend>Permissões do plugin</legend>
                        <label className={'_lb'}>
                            <p className={'text-sm self-start ps-2'}>Nome:</p>
                            <input type="text" name={'permission'} placeholder={'notzcrates.admin'}/>
                        </label>
                        <label className={'_lb'}>
                            <p className={'text-sm self-start ps-2'}>Descrição:</p>
                            <input type="text" name={'description'} placeholder={'Permissão de admin'}/>
                        </label>

                        <div className={'w-full flex items-center text-[0.95rem] px-2'}>
                            Padrão:
                            <div className={'w-full flex flex-1 justify-evenly text-base ps-1'}>
                                {[true, false].map((it, i) => <label className={'relative w-fit flex-center py-0.5 px-2 cursor-pointer select-none rounded-xl bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40'} key={i}>
                                    <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} type="radio" name={'isDefault'} value={it.toString()}/>
                                    <p>{it.toString()}</p>
                                </label>)}
                            </div>
                        </div>
                    </fieldset>

                    <button className={'cursor-pointer bg-blue-500/25 hover:bg-blue-600/50 transition-colors shadow-[var(--boxs2)] p-1 px-3 rounded-xl'}>Adicionar permissão</button>

                    <div className={`${permissions.length === 0 ? 'hidden' : 'flex'} flex-col full gap-4 shadow-[var(--boxs1)] p-3 px-6 rounded-2xl`}>
                        {permissions.map((it, i) => <div className={'flex flex-col gap-1'} key={i}>
                            <div className={'flex justify-between'}>
                                <div className={'flex-center w-fit gap-1'}>
                                    <p className={'w-fit text-ellipsis break-all line-clamp-1 bg-[var(--color6light1)] rounded-lg shadow-[var(--boxs3)] px-2'}>{it.permission}</p>
                                    <div className={'relative h-4.5 aspect-square bg-gray-400/15 cursor-pointer rounded-md'} onClick={() => removePermission(it)}>
                                        <Image className={'object-contain opacity-60'} fill src={'/google/close.svg'} alt={'Remover permissão'}></Image>
                                    </div>
                                </div>
                                <p className={`w-fit flex items-center text-sm ${it.isDefault ? 'bg-green-400/30' : 'bg-red-400/30'} rounded-lg shadow-[var(--boxs3)] px-2`}>{it.isDefault ? 'Default' : 'Not default'}</p>
                            </div>
                            <li className={'wrap-break-word ps-3 pe-2 w-full'}>
                                {it.description.replace('- ', '')}
                            </li>
                        </div>)}
                    </div>
                </form>

                <label className={'_lb'}>
                    <p>Placeholders do plugin:</p>
                    <textarea name="placeholders" placeholder={'{displayname}: nick do player...'} value={placeholders?.join('\n\n') ?? ''} onChange={(e) => handlePlaceholders(e.target.value)} cols={30} rows={4}></textarea>
                </label>
            </div>

            <div className={'sticky bottom-0 w-fit h-fit p-3 bg-tests'}>
                <button
                    className={`group p-1.5 px-3 md:p-2 md:px-5 rounded-full transition-all duration-100 ease-in-out bg-[var(--color7)]/60 hover:bg-[var(--color8)] shadow-[var(--boxs8-1)] hover:shadow-[var(--boxs8)] opacity-80 hover:opacity-100 ${waitPlugin ? `cursor-no-drop bg-[var(--color8)] shadow-[var(--boxs8)] opacity-100` : 'cursor-pointer'}`}
                    onClick={createPlugin}>
                    <p className={'md:text-lg xl:text-xl transition-all duration-100 ease-in-out drop-shadow-[0_0_2px_var(--color9dark1)] group-hover:drop-shadow-[0_0_4px_var(--color9dark1)]'}>
                        {createButtonText}
                    </p>
                </button>
            </div>
        </div>
    )
}