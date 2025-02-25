import {useMutation} from "@tanstack/react-query"
import {ICreateTotalOrderRequest, ICreateTotalOrderResponse} from "services/types"
import { IBaseResponse } from "types"
import {getAxiosInstance} from "services"
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"

export const useSearchUserIdByUsername = async(username: string) => {
    const response = await getAxiosInstance().post<IBaseResponse<string>>(
        `${REQUEST_MAPPING.ORDER + REQUEST_PATH.SEARCH_USER_ID_BY_USERNAME}?username=${username}`,
    )
    return response.data
}

export const useCreateTotalOrder = () => {
    return useMutation({
        mutationKey: ['create-order'],
        mutationFn: async(params: ICreateTotalOrderRequest) => {
            const response = await getAxiosInstance().post<IBaseResponse<ICreateTotalOrderResponse>>(
                REQUEST_MAPPING.ORDER + REQUEST_PATH.CREATE_TOTAL_ORDER,
                params,
            )

            return response.data
        }
    })
}