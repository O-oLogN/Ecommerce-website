import { useMutation, useQuery } from "@tanstack/react-query"
import {getAxiosInstance} from "services"
import {IBaseResponse} from "types";
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"
import {IInitPayRequestRequest, ISearchVnpayTransactionResponse} from "services/types"

export const useGetIpAddress = () => {
    return useQuery({
        queryKey: ['get-ip'],
        queryFn: async() => {
            const response = await getAxiosInstance().post<IBaseResponse<string>>(
                REQUEST_MAPPING.PAY + REQUEST_PATH.GET_IP_ADDRESS
            )
            return response.data
        },
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
}

export const useInitPayRequest = () => {
    return useMutation({
        mutationKey: ['init-pay-request'],
        mutationFn: async(params: IInitPayRequestRequest) => {
            const response = await getAxiosInstance().post<IBaseResponse<string>>(
                REQUEST_MAPPING.PAY + REQUEST_PATH.INIT_PAY_REQUEST,
                params
            )
            return response.data
        }
    })
}

export const useGetVnpayTransaction = () => {
    return useMutation({
        mutationKey: ['get-vnp-transaction'],
        mutationFn: async(vnp_TransactionNo: string) => {
            const response  = await getAxiosInstance().post<IBaseResponse<ISearchVnpayTransactionResponse>>(
                `${REQUEST_MAPPING.PAY + REQUEST_PATH.GET_VNPAY_TRANSACTION}?vnp_TransactionNo=${vnp_TransactionNo}`,
            )
            return response.data
        }
    })
}