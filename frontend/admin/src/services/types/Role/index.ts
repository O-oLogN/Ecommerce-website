import {RoleInfo} from 'src/types'
                                        /* REQUESTS */
export interface ISearchRoleRequest {
    roleName: string | null
}

export interface IEditRoleRequest {
    roleId: string
    name: string
}

export interface IDeleteRoleRequest {
    roleId: string
}

export interface ICreateRoleRequest {
    roleName: string
}

                                        /* RESPONSES */
export interface ISearchRoleResponse extends RoleInfo {}

export interface IEditRoleResponse extends RoleInfo {}

export interface IDeleteRoleResponse extends RoleInfo {}

export interface ICreateRoleResponse extends RoleInfo {}