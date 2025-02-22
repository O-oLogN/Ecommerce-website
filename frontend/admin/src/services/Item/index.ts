import {IPagingResponse, IQueryRequest} from "types"
import {useQuery, useMutation} from "@tanstack/react-query"
import {getAxiosInstance} from "../index.ts"
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
        return useQuery<IBaseResponse<IPagingResponse<ISearchItemResponse>>>({
            queryKey: ['search-item', params],
            queryFn: async () => {
                const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<ISearchItemResponse>>>(
                    REQUEST_MAPPING.ITEM + REQUEST_PATH.SEARCH_ITEM,
                    params
                )
                return response.data
            },
            enabled: !!params,
            // refetchInterval: 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        })
    }

export const useEditItem = () => {
    return useMutation({
        mutationKey: ['edit-item'],
        mutationFn: (params: IEditItemRequest) => {
            const formData = new FormData()
            formData.append('itemId', params.itemId)
            formData.append('categoryId', params.categoryId)
            formData.append('name', params.name)
            formData.append('price', params.price ? params.price.toString() : "")
            formData.append('quantity', params.quantity.toString())
            if (params.image) {
                formData.append('image', params.image)
            }
            formData.append('imageMinioGetUrl', params.imageMinioGetUrl ?? '')
            formData.append('imageMinioPutUrl', params.imageMinioPutUrl ?? '')
            formData.append('numberOfReviews', params.numberOfReviews.toString())
            formData.append('rate', params.rate ? params.rate.toString() : "")
            formData.append('highlightIds', params.highlightIds.toString())
            formData.append('badgeIds', params.badgeIds.toString())
            return getAxiosInstance().post<IBaseResponse<IEditItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.UPDATE_ITEM,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        },
    })
}

export const useDeleteItem= () => {
    return useMutation({
        mutationKey: ['delete-item'],
        mutationFn: (params: IDeleteItemRequest) => {
            const queryParams = new URLSearchParams({
                itemId: params.itemId,
            }).toString()
            return getAxiosInstance().post<IBaseResponse<IDeleteItemResponse>>(
                `${REQUEST_MAPPING.ITEM}${REQUEST_PATH.DELETE_ITEM}?${queryParams}`
            )
        },
    })
}

export const useCreateItem= () => {
    return useMutation({
        mutationKey: ['create-item'],
        mutationFn: (params: ICreateItemRequest) => {
            const formData = new FormData()
            formData.append('categoryId', params.categoryId)
            formData.append('name', params.name)
            formData.append('price', params.price ? params.price.toString() : '')
            formData.append('quantity', params.quantity.toString())
            if (params.image) {
                formData.append('image', params.image)
            }
            formData.append('numberOfReviews', params.numberOfReviews.toString())
            formData.append('rate', params.rate ? params.rate.toString() : "")
            formData.append('highlightIds', params.highlightIds.toString())
            formData.append('badgeIds', params.badgeIds.toString())
            return getAxiosInstance().post<IBaseResponse<ICreateItemResponse>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.CREATE_ITEM,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        },
    })
}