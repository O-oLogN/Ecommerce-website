import {IPagingResponse, IQueryRequest} from "types"
import {useQuery, useMutation} from "react-query"
import {axiosInstance} from "../index.ts"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
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
} from 'services/types'

export const useSearchItem=
    (params: IQueryRequest<ISearchItemRequest>) => {
        return useQuery<IBaseResponse<IPagingResponse<ISearchItemResponse>>>(
            ['search-item', params],
            async () => {
                const response = await axiosInstance.post<IBaseResponse<IPagingResponse<ISearchItemResponse>>>(
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

export const useEditItem = () => {
    return useMutation(
        'edit-item',
        (params: IEditItemRequest) => {
            const formData = new FormData()
            formData.append('itemId', params.itemId)
            formData.append('categoryId', params.categoryId)
            formData.append('name', params.name)
            formData.append('price', params.price!.toString())
            formData.append('quantity', params.quantity.toString())
            if (params.image) {
                formData.append('image', params.image);
            }
            return axiosInstance.post<IBaseResponse<IEditItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.UPDATE_ITEM,
                params,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
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
            const formData = new FormData()
            formData.append('categoryId', params.categoryId)
            formData.append('name', params.name)
            formData.append('price', params.price ? params.price.toString() : '')
            formData.append('quantity', params.quantity.toString())
            if (params.image) {
                formData.append('image', params.image);
            }
            return axiosInstance.post<IBaseResponse<ICreateItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.CREATE_ITEM,
                params,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        },
    )
}