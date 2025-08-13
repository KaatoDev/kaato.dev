export interface UserModel {
    name: string,
    email: string,
    isAdmin: boolean,
    createdAt: Date,
    deletedAt?: Date,
    favoritePlugins?: string[],
    // history?: PluginsHistory[],
    newsletter?: boolean,
    servers?: string[]
}

export function createUser(name: string, email: string): UserModel {
    return {
        name,
        email,
        isAdmin: false,
        createdAt: new Date()
    }
}

export function updateUser(user: UserModel, name: string, email: string) {
    user.name = name
    user.email = email
}