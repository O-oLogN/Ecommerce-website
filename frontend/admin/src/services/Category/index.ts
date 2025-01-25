import {IPagingResponse, IQueryRequest} from "types"
import {useQuery, useMutation} from "react-query"
import {axiosInstance} from "../index.ts"
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
    return useQuery<IBaseResponse<IPagingResponse<ISearchCategoryResponse>>>(
        ['search-category-by-name', params],
        async () => {
            const response = await axiosInstance.post<IBaseResponse<IPagingResponse<ISearchCategoryResponse>>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.SEARCH_CATEGORY_BY_NAME,
                params,
            )
            return response.data
        },
        {
            enabled: !!params,
            // reFetchInterval: 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    )
}

export const useSearchCategoryById = () => {
    return useMutation(
        async (params: ISearchCategoryByIdRequest) => {
            const queryParams = new URLSearchParams({
                categoryId: params.categoryId,
            }).toString()

            const response = await axiosInstance.get<IBaseResponse<ISearchCategoryByIdResponse>>(
                `${REQUEST_MAPPING.CATEGORY}${REQUEST_PATH.SEARCH_CATEGORY_BY_ID}?${queryParams}`
            );

            return response.data
        }
    )
}

export const useEditCategory= () => {
    return useMutation(
        'edit-category',
        (params: IEditCategoryRequest) => {
            return axiosInstance.post<IBaseResponse<IEditCategoryResponse>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.UPDATE_CATEGORY,
                params
            )
        },
    )
}

export const useDeleteCategory= () => {
    return useMutation(
        'delete-category',
        (params: IDeleteCategoryRequest) => {
            const queryParams = new URLSearchParams({
                categoryId: params.categoryId,
            }).toString()
            return axiosInstance.get<IBaseResponse<IDeleteCategoryResponse>>(
                `${REQUEST_MAPPING.CATEGORY}${REQUEST_PATH.DELETE_CATEGORY}?${queryParams}`
            )
        },
    )
}

export const useCreateCategory= () => {
    return useMutation(
        'create-category',
        (params: ICreateCategoryRequest) => {
            return axiosInstance.post<IBaseResponse<ICreateCategoryResponse>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.CREATE_CATEGORY,
                params
            )
        },
    )
}