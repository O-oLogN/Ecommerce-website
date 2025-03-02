import {IBaseData} from "types"

export interface TotalOrderInfo extends IBaseData {
    totalOrderId: string
    paymentStatus: string
    userId: string
    price: number
    orderCode: number
    vnpTxnRef: string
    orderStatus: string
}