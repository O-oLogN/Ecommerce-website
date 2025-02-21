import {IPagingResponse, IQueryRequest} from "types"
import {useQuery, useMutation} from "@tanstack/react-query"
import {getAxiosInstance} from "../index.ts"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/index.ts"
import {
    ISearchUserRequest,
    ISearchUserResponse,
    IEditUserRequest,
    IEditUserResponse,
    IDeleteUserRequest,
    IDeleteUserResponse,
    ICreateUserRequest,
    ICreateUserResponse,
    IBaseResponse,
} from "services/types"

export const useSearchUser=
    (params: IQueryRequest<ISearchUserRequest>) => {
    return useQuery<IBaseResponse<IPagingResponse<ISearchUserResponse>>>({
        queryKey: ['search-user', params],
        queryFn: async () => {
            const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<ISearchUserResponse>>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.SEARCH_USER,
                params
            )
            return response.data
        },
        enabled: !!params,
        refetchInterval: false,
        refetchOnReconnect: false,
    })
}

export const useEditUser= () => {
    return useMutation({
        mutationKey: ['edit-user'],
        mutationFn: (params: IEditUserRequest) => {
            return getAxiosInstance().post<IBaseResponse<IEditUserResponse>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.UPDATE_USER,
                params
            )
        },
    })
}

export const useDeleteUser= () => {
    return useMutation({
        mutationKey: ['delete-user'],
        mutationFn: (params: IDeleteUserRequest) => {
            const queryParams = new URLSearchParams({
                userId: params.userId,
            }).toString()
            return getAxiosInstance().post<IBaseResponse<IDeleteUserResponse>>(
                `${REQUEST_MAPPING.USER}${REQUEST_PATH.DELETE_USER}?${queryParams}`
            )
        },
    })
}

export const useCreateUser= () => {
    return useMutation({
        mutationKey: ['create-user'],
        mutationFn: (params: ICreateUserRequest) => {
            return getAxiosInstance().post<IBaseResponse<ICreateUserResponse>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.CREATE_USER,
                params
            )
        },
    })
}