import {IPagingResponse, IQueryRequest} from "types"
import {useQuery, useMutation} from "@tanstack/react-query"
import {getAxiosInstance} from "../index.ts"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
import {
    ISearchCategoryRequest,
    ISearchCategoryResponse,
    IEditCategoryRequest,
    IEditCategoryResponse,
    IDeleteCategoryRequest,
    IDeleteCategoryResponse,
    ICreateCategoryRequest,
    ICreateCategoryResponse,
    ISearchCategoryByIdRequest,
    ISearchCategoryByIdResponse,
    IBaseResponse,
} from "services/types"

export const useSearchCategory=
    (params: IQueryRequest<ISearchCategoryRequest>) => {
    return useQuery<IBaseResponse<IPagingResponse<ISearchCategoryResponse>>>({
        queryKey: ['search-category-by-name', params],
        queryFn: async () => {
            const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<ISearchCategoryResponse>>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.SEARCH_CATEGORY_BY_NAME,
                params,
            )
            return response.data
        },
        enabled: !!params,
        refetchInterval: false,
        refetchOnReconnect: false,
    })
}

export const useSearchCategoryById = () => {
    return useMutation({
        mutationKey: ['search-category'],
        mutationFn: async (params: ISearchCategoryByIdRequest) => {
            const queryParams = new URLSearchParams({
                categoryId: params.categoryId,
            }).toString()

            const response = await getAxiosInstance().get<IBaseResponse<ISearchCategoryByIdResponse>>(
                `${REQUEST_MAPPING.CATEGORY}${REQUEST_PATH.SEARCH_CATEGORY_BY_ID}?${queryParams}`
            );

            return response.data
        }
    })
}

export const useEditCategory= () => {
    return useMutation({
        mutationKey: ['edit-category'],
        mutationFn: (params: IEditCategoryRequest) => {
            return getAxiosInstance().post<IBaseResponse<IEditCategoryResponse>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.UPDATE_CATEGORY,
                params
            )
        },
    })
}

export const useDeleteCategory= () => {
    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: (params: IDeleteCategoryRequest) => {
            const queryParams = new URLSearchParams({
                categoryId: params.categoryId,
            }).toString()
            return getAxiosInstance().get<IBaseResponse<IDeleteCategoryResponse>>(
                `${REQUEST_MAPPING.CATEGORY}${REQUEST_PATH.DELETE_CATEGORY}?${queryParams}`
            )
        },
    })
}

export const useCreateCategory= () => {
    return useMutation({
        mutationKey: ['create-category'],
        mutationFn: (params: ICreateCategoryRequest) => {
            return getAxiosInstance().post<IBaseResponse<ICreateCategoryResponse>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.CREATE_CATEGORY,
                params
            )
        },
    })
}