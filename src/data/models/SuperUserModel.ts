export interface SuperUserModel {
    email: string,
    permissions: string[]
    createdAt: Date,
    deletedAt?: Date,
}

export function createSuperUser(email: string): SuperUserModel {
    return {
        email,
        createdAt: new Date(),
        permissions: ['create-plugin']
    }
}

export function addPermission(user: SuperUserModel, permission: string) {
    user.permissions.push(permission)
}

export function addPermissions(user: SuperUserModel, permissions: string[]) {
    user.permissions.push(...permissions)
}