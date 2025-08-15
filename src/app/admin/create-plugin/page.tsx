'use client'
import React, {CSSProperties, useState} from "react";
import {PluginPermission, PluginVersion} from "@/data/models/PluginModel";
import Link from "next/link";

export default function Login() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [version, setVersion] = useState('')
    const [serverVersion, setServerVersion] = useState('')
    const [status, setPluginStatus] = useState(1)
    const [versions, setVersions] = useState<PluginVersion[]>([])
    const [permission, setPermission] = useState<PluginPermission>({permission: '', description: '', default: false})
    const [permissions, setPermissions] = useState<PluginPermission[]>([])
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

    const versionList = ['1.8', '1.9', '1.10', '1.11', '1.12', '1.13', '1.14', '1.15', '1.16', '1.17', '1.18', '1.19', '1.20', '1.21']
    const statuses = ['Disponível', 'Em desenvolvimento', 'Em planejamento', 'Pendente']
    const pluginTags = ['Essencial', 'Economia', 'RankUp', 'Prison', 'Factions', 'Minigames', 'Moderação', 'API']

    function handlePermission(it: boolean | string, option: 1 | 2 | 3) {
        const perm = permission
        switch (option) {
            case 1:
                perm.permission = it as string;
                break;
            case 2:
                perm.description = it as string;
                break;
            case 3:
                perm.default = it as boolean;
        }
        setPermission(perm)
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

    function createPlugin() {
        [name, description, version, serverVersion, versions, testedVersions, tags, items].forEach(it => {
            if (it.length === 0) setIsRequired(true)
        })

        if (isRequired) return

        // TODO
    }

    return (
        <div className={'_create-plugin containerer'}>
            <form method={'POST'} action={'/submit-form'} className={'bg-test _form flex flex-col justify-center items-center md:grid grid-cols-2 xl:grid-cols-3 grid-flow-dense gap-10 p-5'}>

                <div className={'_area'}>
                    <label className={'_lb'} htmlFor={'name'}>
                        <p>Nome do plugin:</p>
                        <input type="text" name={'name'} required={handleRequired(name)} placeholder={'NotzPlugin'} onChange={(e) => setName(e.target.value)}/>
                    </label>

                    <label className={'_lb'} htmlFor={'description'}>
                        <p>Descrição do plugin:</p>
                        <input type="text" name={'description'} required={handleRequired(description)} placeholder={'Plugin de rankup'} onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                </div>

                <div className={'_area'}>
                    <label className={'flex-center max-2xl:flex-col gap-2'} htmlFor={'serverVersion'}>
                        <p>Versão do servidor:</p>
                        {/*<input type="reset" name={'serverVersion'} placeholder={'1.8 - 1.21'} onChange={(e) => setServerVersion(e.target.value)}/>*/}
                        <select className={'_select'} name="serverVersion" onChange={(e) => setServerVersion(e.target.value)}>
                            {versionList.map((it, i) =>
                                <option key={i} value={it}>{it}</option>
                            )}
                        </select>
                    </label>

                    <label className={'flex-center flex-col gap-2'} htmlFor={'status'}>
                        <p>Status desenvolvimento:</p>
                        <select className={'_select'} name="status" onChange={(e) => setPluginStatus(e.target.value as unknown as number)}>
                            {statuses.map((it, i) =>
                                <option key={i} value={i + 1}>{it}</option>
                            )}
                        </select>
                    </label>
                </div>

                <div className={'_area2 col-span-1 md:col-span-2 xl:col-span-3'}>
                    <label className={'_lb'} htmlFor={'items'}>
                        <p>Items do plugin:{items.toString()}</p>
                        <textarea name="items" required={handleRequired(items)} placeholder={'Crates: sistema personalizado...'} onChange={(e) => handleItems(e.target.value)} cols={30} rows={4}></textarea>
                    </label>

                    <label className={'_lb'} htmlFor={'descriptionItems'}>
                        <p>Items detalhados:{descriptionItems.toString()}</p>
                        <textarea name="descriptionItems" required={handleRequired(descriptionItems)} placeholder={'**Crates** \n - Sistema personalizado...'} onChange={(e) => handleDescriptionItems(e.target.value)} cols={30} rows={5}></textarea>
                    </label>
                </div>

                <div className={'_area2 col-span-2'}>
                    <fieldset style={{'--sizeCheckbox': '100px'} as CSSProperties} className={'_tv grid w-full justify-evenly gap-x-2 gap-y-3 p-3'}>
                        <legend>Tags do plugin: {tags.toString()}</legend>
                        {pluginTags.map((it, i) =>
                            <label className={'relative full flex-center cursor-pointer select-none rounded-lg bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40 pt-0.5'} key={i}>
                                <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} required={handleRequired(tags)} type="checkbox" name={it} value={it} onChange={() => handleTags(it)} checked={tags.includes(it)}/>
                                <p>{it}</p>
                            </label>
                        )}
                    </fieldset>

                    <label className={'_lb'} htmlFor={'tags'}>
                        <p>Outras tags do plugin:</p>
                        <textarea name="tags" placeholder={'Outras...'} onChange={(e) => handleOtherTags(e.target.value)} cols={25} rows={3}></textarea>
                    </label>
                </div>

                <fieldset style={{'--sizeCheckbox': ' 75px'} as CSSProperties} className={'_tv grid w-full justify-evenly gap-x-2 gap-y-3 p-3 col-span-2 lg:col-span-1'}>
                    <legend>Versões testadas: {testedVersions.toString()}</legend>
                    {versionList.map((it, i) =>
                        <label className={'relative full flex-center cursor-pointer select-none rounded-lg bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40'} key={i}>
                            <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} required={handleRequired(testedVersions)} type="checkbox" name={it} value={it} onChange={() => handleTestedVersions(it)} checked={testedVersions.includes(it)}/>
                            <p>{it}</p>
                        </label>
                    )}
                </fieldset>

                <div className={'_area2 col-span-2'}>
                    <label className={'_lb'} htmlFor={'repository'}>
                        <p>Repositório do plugin:</p>
                        <input type="text" name={'repository'} placeholder={'NotzScoreboard'} onChange={(e) => setRepository(e.target.value)}/>
                        <Link className={'text-white/60'} href={`https://git.kaato.dev/${repository}`}>
                            https://git.kaato.dev/
                            <span className={'text-blue-100'}>{repository.length === 0 ? '(NotzScoreboard)' : repository}</span>
                        </Link>
                    </label>

                    <label className={'_lb'} htmlFor={'dependencies'}>
                        <p>Dependências do plugin:{dependencies.toString()}</p>
                        <textarea name="dependencies" placeholder={'PlaceholderAPI...'} onChange={(e) => handleDependencies(e.target.value)} cols={20} rows={3}></textarea>
                    </label>
                </div>

                <div className={'_area2 col-span-2'}>
                    <label className={'_lb px-4'} htmlFor={'imageLink'}>
                        <p>Imagem ícone do plugin:</p>
                        <input className={'w-full'} type="text" name={'imageLink'} placeholder={'Link da imagem'} onChange={(e) => setImageLink(e.target.value)}/>
                        {/*<div className={`relative w-fit ${backImageLink.length === 0 ? '' : 'h-12'}`}>*/}
                        {/*    <Image fill className={'object-contain'} src={imageLink} alt={''}/>*/}
                        {/*</div>*/}
                    </label>

                    <label className={'_lb px-4'} htmlFor={'backImageLink'}>
                        <p>Imagem background do plugin:</p>
                        <input className={'w-full'} type="text" name={'backImageLink'} placeholder={'Link da imagem do background'} onChange={(e) => setBackImageLink(e.target.value)}/>
                        {/*<div className={`relative w-fit ${backImageLink.length === 0 ? '' : 'h-12'}`}>*/}
                        {/*    <Image fill className={'object-contain'} src={backImageLink} alt={''}/>*/}
                        {/*</div>*/}
                    </label>
                </div>

                <div className={'_area2 col-span-2'}>
                    <label className={'_lb'} htmlFor={'version'}>
                        <p>Versão atual do plugin:</p>
                        <input type="text" name={'version'} placeholder={'v3.2'} onChange={(e) => setVersion(e.target.value)}/>
                    </label>

                    <label className={'_lb px-4'} htmlFor={'backImageLink'}>
                        <p>Versões:</p>
                        <input className={'w-full'} type="text" name={'backImageLink'} placeholder={'Link da imagem do background'} onChange={(e) => setBackImageLink(e.target.value)}/>
                    </label>

                    {/*TODO*/}
                </div>

                <label className={'_lb'} htmlFor={'placeholders'}>
                    <p>Placeholders do plugin:{placeholders.toString()}</p>
                    <textarea name="placeholders" required={handleRequired(placeholders)} placeholder={'{displayname}: nick do player...'} onChange={(e) => handlePlaceholders(e.target.value)} cols={30} rows={4}></textarea>
                </label>

                <div className={'_area'}>
                    <label className={'_lb'} htmlFor={'permissions'}>
                        <fieldset className={'_tv grid w-full justify-evenly gap-x-2 gap-y-3 p-3'}>
                            <legend>Permissões do plugin: {tags.toString()}</legend>
                            <input type="text" name={'permissions1'} placeholder={'notzcrates.admin'}/>
                            <input type="text" name={'permissions2'} placeholder={'Permissão de admin'}/>

                            {[true, false].map((it, i) =>
                                <label className={'relative full flex-center cursor-pointer select-none rounded-lg bg-blue-300/10 has-checked:bg-blue-700/80 hover:bg-blue-500/40 pt-0.5'} key={i}>
                                    <input className={'absolute opacity-0 w-0 h-0 cursor-pointer'} required={handleRequired(tags)} type="radio" value={it.toString()} onChange={(e) => handlePermission(it, 3)} checked={permission.default == it}/>
                                    <p>{it}</p>
                                </label>
                            )}
                        </fieldset>

                    </label>

                    <button>Adicionar permissão</button>

                    {permissions.map((it, i) =>
                        <div key={i}>
                            <p>Permissão: {it.permission}</p>
                            <p>Descrição: {it.description}</p>
                            <p>Padrão: {it.default ? 'Sim' : 'Não'}</p>
                        </div>
                    )}
                </div>


                {/*commands*/}
                {/*permissions*/}
            </form>

            <button onClick={createPlugin}>Criar plugin</button>
        </div>
    );
}