import {IPagingResponse, IQueryRequest} from "types"
import {
    IBaseResponse,
    ICreateRoleRequest,
    ICreateRoleResponse,
    IDeleteRoleRequest,
    IDeleteRoleResponse,
    IEditRoleRequest,
    IEditRoleResponse,
    ISearchRoleRequest,
    ISearchRoleResponse
} from "services/types"
import {useMutation, useQuery} from "@tanstack/react-query"
import {getAxiosInstance} from "services"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"

export const useSearchRole=
    (params: IQueryRequest<ISearchRoleRequest>) => {
        return useQuery<IBaseResponse<IPagingResponse<ISearchRoleResponse>>>({
            queryKey: ['search-role', params],
            queryFn: async () => {
                const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<ISearchRoleResponse>>>(
                    REQUEST_MAPPING.ROLE + REQUEST_PATH.SEARCH_ROLE,
                    params
                )
                return response.data
            },
            enabled: !!params,
            refetchInterval: false,
            refetchOnReconnect: false,
        })
    }

export const useUpdateRole = () => {
    return useMutation({
        mutationKey: ['update-role'],
        mutationFn: (params: IEditRoleRequest) => {
            return getAxiosInstance().post<IBaseResponse<IEditRoleResponse>>(
                REQUEST_MAPPING.ROLE + REQUEST_PATH.UPDATE_ROLE,
                params
            )
        },
    })
}

export const useDeleteRole= () => {
    return useMutation({
        mutationKey: ['delete-role'],
        mutationFn: (params: IDeleteRoleRequest) => {
            const queryParams = new URLSearchParams({
                roleId: params.roleId
            })
            return getAxiosInstance().post<IBaseResponse<IDeleteRoleResponse>>(
                `${REQUEST_MAPPING.ROLE}${REQUEST_PATH.DELETE_ROLE}?${queryParams}`
            )
        },
    })
}

export const useCreateRole= () => {
    return useMutation({
        mutationKey: ['create-role'],
        mutationFn: (params: ICreateRoleRequest) => {
            const queryParams = new URLSearchParams({
                roleName: params.roleName
            })
            return getAxiosInstance().post<IBaseResponse<ICreateRoleResponse>>(
                `${REQUEST_MAPPING.ROLE}${REQUEST_PATH.CREATE_ROLE}?${queryParams}`
            )
        },
    })
}