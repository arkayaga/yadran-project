import { Role } from "core/role/role.modal"

export interface User {
    id: string,
    updatedAt?: string,
    createdAt?: string,
    firstName?: string,
    lastName?: string,
    emailAddress?: string,
    username?: string,
    salary?: number,
    placeId?: string,
    userRoles?: [
        {
            id: string,
            updatedAt?: string,
            createdAt?: string,
            roleId?: string,
            userId?: string,
            role?: Role
        }]
}