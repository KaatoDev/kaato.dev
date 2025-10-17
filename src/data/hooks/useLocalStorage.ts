'use client'

import {useCallback} from "react";

export default function useLocalStorage() {
    const get = useCallback((it: string) => {
        const value = window?.localStorage?.getItem(it)
        return value ? JSON.parse(value) : null
    }, [])

    const set = useCallback((it: string, value: string) => {
        window?.localStorage?.setItem(it, JSON.stringify(value))
    }, [])

    const remove = useCallback((it: string) => {
        window?.localStorage?.removeItem(it)
    }, [])

    return {get, set, remove}
}