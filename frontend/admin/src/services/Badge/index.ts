import {useQuery, useMutation} from "@tanstack/react-query"
import {BadgeInfo, IPagingResponse, IQueryRequest} from "types"
import {getAxiosInstance} from "services"
import {IBaseResponse} from "services/types"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
import {
    ICreateBadgeRequest,
    ICreateBadgeResponse,
    IDeleteBadgeResponse,
    IEditBadgeRequest,
    IEditBadgeResponse
} from "services/types/Badge"

export const useSearchBadge = (params: IQueryRequest<string>) => {
    return useQuery({
        queryKey: ['search-badge', params],
        queryFn: async() => {
            const response = await getAxiosInstance().post<IBaseResponse<IPagingResponse<BadgeInfo>>>(
                REQUEST_MAPPING.BADGE + REQUEST_PATH.SEARCH_BADGE,
                params,
            )
            return response.data
        },
        enabled: !!params,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
}

export const useEditBadge = () => {
    return useMutation({
        mutationKey: ['edit-badge'],
        mutationFn: async(params: IEditBadgeRequest) => {
            const formData = new FormData()
            formData.append('badgeId', params.badgeId)
            if (params.icon) {
                formData.append('icon', params.icon)
            }
            formData.append('description', params.description)
            formData.append('iconMinioGetUrl', params.iconMinioGetUrl)
            formData.append('iconMinioPutUrl', params.iconMinioPutUrl)
            return getAxiosInstance().post<IBaseResponse<IEditBadgeResponse>>(
                REQUEST_MAPPING.BADGE + REQUEST_PATH.UPDATE_BADGE,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        }
    })
}

export const useCreateBadge = () => {
    return useMutation({
        mutationKey: ['create-badge'],
        mutationFn: async(params: ICreateBadgeRequest) => {
            const formData = new FormData()
            if (params.icon) {
                formData.append('icon', params.icon)
            }
            formData.append('description', params.description)
            return await getAxiosInstance().post<IBaseResponse<ICreateBadgeResponse>>(
                REQUEST_MAPPING.BADGE + REQUEST_PATH.CREATE_BADGE,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        }
    })
}

export const useDeleteBadge = () => {
    return useMutation({
        mutationKey: ['delete-badge'],
        mutationFn: async(params: string) => {
            return getAxiosInstance().post<IBaseResponse<IDeleteBadgeResponse>>(
                `${REQUEST_MAPPING.BADGE + REQUEST_PATH.DELETE_BADGE}?badgeId=${params}`,
            )
        }
    })
}