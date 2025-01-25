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
import {useMutation, useQuery} from "react-query"
import {axiosInstance} from "services"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"

export const useSearchRole=
    (params: IQueryRequest<ISearchRoleRequest>) => {
        return useQuery<IBaseResponse<IPagingResponse<ISearchRoleResponse>>>(
            ['search-role', params],
            async () => {
                const response = await axiosInstance.post<IBaseResponse<IPagingResponse<ISearchRoleResponse>>>(
                    REQUEST_MAPPING.ROLE + REQUEST_PATH.SEARCH_ROLE,
                    params
                )
                return response.data
            },
            {
                enabled: !!params,
                // refetchInterval: 1000,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
            }
        )
    }

export const useUpdateRole= () => {
    return useMutation(
        'update-role',
        (params: IEditRoleRequest) => {
            return axiosInstance.post<IBaseResponse<IEditRoleResponse>>(
                REQUEST_MAPPING.ROLE + REQUEST_PATH.UPDATE_ROLE,
                params
            )
        },
    )
}

export const useDeleteRole= () => {
    return useMutation(
        'delete-role',
        (params: IDeleteRoleRequest) => {
            const queryParams = new URLSearchParams({
                roleId: params.roleId
            })
            return axiosInstance.post<IBaseResponse<IDeleteRoleResponse>>(
                `${REQUEST_MAPPING.ROLE}${REQUEST_PATH.DELETE_ROLE}?${queryParams}`
            )
        },
    )
}

export const useCreateRole= () => {
    return useMutation(
        'create-role',
        (params: ICreateRoleRequest) => {
            const queryParams = new URLSearchParams({
                roleName: params.roleName
            })
            return axiosInstance.post<IBaseResponse<ICreateRoleResponse>>(
                `${REQUEST_MAPPING.ROLE}${REQUEST_PATH.CREATE_ROLE}?${queryParams}`
            )
        },
    )
}