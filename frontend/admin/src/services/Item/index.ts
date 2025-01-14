import {IPagingResponse, IQueryRequest} from "src/types"
import {useQuery, useMutation} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {
    ISearchItemRequest,
    ISearchItemResponse,
    IEditItemRequest,
    IEditItemResponse,
    IDeleteItemRequest,
    IDeleteItemResponse,
    ICreateItemRequest,
    ICreateItemResponse,
    IBaseResponse,
} from "src/services/types"

export const useSearchItem=
    (params: IQueryRequest<ISearchItemRequest>) => {
        return useQuery<IPagingResponse<IBaseResponse<ISearchItemResponse>> | IBaseResponse<ISearchItemResponse>>(
            ['search-item', params],
            async () => {
                const response = await axiosInstance.post<IPagingResponse<IBaseResponse<ISearchItemResponse>> | IBaseResponse<ISearchItemResponse>>(
                    REQUEST_MAPPING.ITEM + REQUEST_PATH.SEARCH_ITEM,
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

export const useEditItem= () => {
    return useMutation(
        'edit-item',
        (params: IEditItemRequest) => {
            return axiosInstance.post<IBaseResponse<IEditItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.UPDATE_ITEM,
                params
            )
        },
    )
}

export const useDeleteItem= () => {
    return useMutation(
        'delete-item',
        (params: IDeleteItemRequest) => {
            const queryParams = new URLSearchParams({
                itemId: params.itemId,
            }).toString();
            return axiosInstance.post<IBaseResponse<IDeleteItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.DELETE_ITEM,
                queryParams
            )
        },
    )
}

export const useCreateItem= () => {
    return useMutation(
        'create-item',
        (params: ICreateItemRequest) => {
            return axiosInstance.post<IBaseResponse<ICreateItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.CREATE_ITEM,
                params
            )
        },
    )
}