import {axiosInstance} from "services"
import {
    ISearchItemCategoryRequest,
    ISearchItemCategoryResponse,
    ISearchItemRequest,
    ISearchItemResponse
} from "services/types"
import {
    IQueryRequest,
    IBaseResponse,
    IPagingResponse,
} from "types"
import {useMutation, useQuery} from "@tanstack/react-query"
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"

export const useSearchItem = (params: IQueryRequest<ISearchItemRequest>) => {
    return useQuery({
        queryKey: ['search', params],
        queryFn: async() => {
            const response = await axiosInstance.post<IBaseResponse<IPagingResponse<ISearchItemResponse>>>(
                REQUEST_MAPPING.ITEM + REQUEST_PATH.SEARCH_ITEM,
                params,
            )
            return response.data
        },
        enabled: !!params.sample,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
}

export const useSearchCategoryById = () => {
    return useMutation({
        mutationKey: ['search-category-by-id'],
        mutationFn: async(params: ISearchItemCategoryRequest) => {
            const response = await axiosInstance.post<IBaseResponse<ISearchItemCategoryResponse>>(
                `${REQUEST_MAPPING.CATEGORY}${REQUEST_PATH.SEARCH_CATEGORY_BY_ID}?categoryId=${params.categoryId}`,
            )
            return response.data
        }
    })
}