import {IBaseData} from "types"

export interface OrderInfo extends IBaseData {
    orderId: string
    userId: string
    itemId: string
    parentId: string
    quantity: number
}