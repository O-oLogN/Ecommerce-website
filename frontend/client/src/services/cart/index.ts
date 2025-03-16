import { useMutation } from "@tanstack/react-query"
import { REQUEST_MAPPING, REQUEST_PATH } from "routes"
import {getAxiosInstance} from "services"
import {
    IRemoveItemFromCartRequest,
    IRemoveItemFromCartResponse,
    IUpdateItemInCartRequest,
    IUpdateItemInCartResponse
} from "services/types"
import {IBaseResponse} from "types"
import {CartInfo} from "types/CartInfo"

export const useGetItemsInCart = () => {
    return useMutation({
        mutationKey: ['update-item-in-cart'],
        mutationFn: async (username: string) => {
            const response = await getAxiosInstance().post<IBaseResponse<CartInfo[]>>(
                `${REQUEST_MAPPING.CART + REQUEST_PATH.GET_ITEMS_IN_CART}?username=${username}`
            )
            return response.data
        }
    })
}

export const useUpdateItemInCart = () => {
    return useMutation({
        mutationKey: ['update-item-in-cart'],
        mutationFn: async (params: IUpdateItemInCartRequest) => {
            const response = await getAxiosInstance().post<IBaseResponse<IUpdateItemInCartResponse[]>>(
                REQUEST_MAPPING.CART + REQUEST_PATH.UPDATE_ITEM_IN_CART,
                params
            )
            return response.data
        }
    })
}

export const useRemoveItemFromCart = () => {
    return useMutation({
        mutationKey: ['remove-item-from-cart'],
        mutationFn: async (params: IRemoveItemFromCartRequest) => {
            const response = await getAxiosInstance().post<IBaseResponse<IRemoveItemFromCartResponse[]>>(
                REQUEST_MAPPING.CART + REQUEST_PATH.REMOVE_ITEM_FROM_CART,
                params
            )
            return response.data
        }
    })
}