import {RoleInfo, IQueryRequest} from 'types'
import {
    ISearchRoleRequest,
    IDeleteRoleRequest,
    ICreateRoleRequest,
} from 'services/types'
import {useSearchRole, useDeleteRole, useCreateRole} from 'services'
import React from "react"

export interface RoleManagementContextProps {
    searchResponse: ReturnType<typeof useSearchRole> | undefined
    roleList: RoleInfo[] | undefined
    totalElements: number
    searchRequest: IQueryRequest<ISearchRoleRequest>
    deleteRequest: IDeleteRoleRequest
    createRequest: ICreateRoleRequest
    setRoleList: React.Dispatch<React.SetStateAction<RoleInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchRoleRequest>>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteRoleRequest>>
    setCreateRequest: React.Dispatch<React.SetStateAction<ICreateRoleRequest>>
    deleteHelper: ReturnType<typeof useDeleteRole>
    createHelper: ReturnType<typeof useCreateRole>
    reFetchRoleList: () => void
}
