import {IPagingResponse, IQueryRequest} from "../../types"
import {useQuery, useMutation} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
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
} from "src/services/types";

export const useSearchUser=
    (params: IQueryRequest<ISearchUserRequest>) => {
    return useQuery<IBaseResponse<IPagingResponse<ISearchUserResponse>>>(
        ['search-user', params],
        async () => {
            const response = await axiosInstance.post<IBaseResponse<IPagingResponse<ISearchUserResponse>>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.SEARCH_USER,
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

export const useEditUser= () => {
    return useMutation(
        'edit-user',
        (params: IEditUserRequest) => {
            return axiosInstance.post<IBaseResponse<IEditUserResponse>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.UPDATE_USER,
                params
            )
        },
    )
}

export const useDeleteUser= () => {
    return useMutation(
        'delete-user',
        (params: IDeleteUserRequest) => {
            const queryParams = new URLSearchParams({
                userId: params.userId,
            }).toString()
            return axiosInstance.post<IBaseResponse<IDeleteUserResponse>>(
                `${REQUEST_MAPPING.USER}${REQUEST_PATH.DELETE_USER}?${queryParams}`
            )
        },
    )
}

export const useCreateUser= () => {
    return useMutation(
        'create-user',
        (params: ICreateUserRequest) => {
            return axiosInstance.post<IBaseResponse<ICreateUserResponse>>(
                REQUEST_MAPPING.USER + REQUEST_PATH.CREATE_USER,
                params
            )
        },
    )
}