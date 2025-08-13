export interface Permission {
    permission: string
    description: string
    default: boolean | 'op' | 'default'
}