import {IPagingResponse, IQueryRequest} from "src/types"
import {useQuery, useMutation} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {
    ISearchCategoryRequest,
    ISearchCategoryResponse,
    IEditCategoryRequest,
    IEditCategoryResponse,
    IDeleteCategoryRequest,
    IDeleteCategoryResponse,
    IBaseResponse,
} from "src/services/types";

export const useSearchCategory=
    (params: IQueryRequest<ISearchCategoryRequest>) => {
        return useQuery<IPagingResponse<IBaseResponse<ISearchCategoryResponse>> | IBaseResponse<ISearchCategoryResponse>>(
            ['search-category', params],
            async () => {
                const response = await axiosInstance.post<IPagingResponse<IBaseResponse<ISearchCategoryResponse>> | IBaseResponse<ISearchCategoryResponse>>(
                    REQUEST_MAPPING.CATEGORY + REQUEST_PATH.SEARCH_CATEGORY,
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
            }).toString();
            return axiosInstance.post<IBaseResponse<IDeleteCategoryResponse>>(
                REQUEST_MAPPING.CATEGORY + REQUEST_PATH.DELETE_CATEGORY,
                queryParams
            )
        },
    )
}