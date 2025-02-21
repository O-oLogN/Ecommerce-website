import {useQuery} from "@tanstack/react-query"
import {HighlightInfo, IPagingResponse, IQueryRequest} from "types"
import {getAxiosInstance} from "services"
import {IBaseResponse} from "services/types"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
import {
    ICreateHighlightRequest,
    ICreateHighlightResponse, IDeleteHighlightResponse,
    IEditHighlightRequest,
    IEditHighlightResponse
} from "services/types/Highlight"
import {useMutation} from "react-query"

export const useSearchHighlight = (params: IQueryRequest<string>) => {
    return useQuery({
        queryKey: ['search-highlight', params],
        queryFn: async() => {
            const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<HighlightInfo>>>(
                REQUEST_MAPPING.HIGHLIGHT + REQUEST_PATH.SEARCH_HIGHLIGHT,
                params,
            )
            return response.data
        },
        enabled: !!params,
        refetchOnWindowFocus: true,
        refetchInterval: false,
    })
}

export const useEditHighlight = () => {
    return useMutation({
        mutationKey: ['edit-highlight'],
        mutationFn: async(params: IEditHighlightRequest) => {
            return await getAxiosInstance().post<IBaseResponse<IEditHighlightResponse>>(
                REQUEST_MAPPING.HIGHLIGHT + REQUEST_PATH.UPDATE_HIGHLIGHT,
                params,
            )
        }
    })
}

export const useCreateHighlight = () => {
    return useMutation({
        mutationKey: ['create-highlight'],
        mutationFn: async(params: ICreateHighlightRequest) => {
            return await getAxiosInstance().post<IBaseResponse<ICreateHighlightResponse>>(
                REQUEST_MAPPING.HIGHLIGHT + REQUEST_PATH.CREATE_HIGHLIGHT,
                params,
            )
        }
    })
}

export const useDeleteHighlight = () => {
    return useMutation({
        mutationKey: ['delete-highlight'],
        mutationFn: async(params: string) => {
            return await getAxiosInstance().post<IBaseResponse<IDeleteHighlightResponse>>(
                `${REQUEST_MAPPING.HIGHLIGHT + REQUEST_PATH.DELETE_HIGHLIGHT}?highlightId=${params}`
            )
        }
    })
}