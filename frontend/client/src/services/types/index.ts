import {
    UserInfo,
    ItemInfo,
    CategoryInfo
} from "types"
import {OrderInfo, TotalOrderInfo} from "types/OrderInfo"

                                        /* REQUEST */
/* Auth */
export interface ILoginRequest {
    username: string
    password: string
}

export interface ISignUpRequest {
    username: string
    password: string
    email: string
}

/* Item */
export interface ISearchItemRequest {
    itemName: string
}

export interface ISearchItemCategoryRequest {
    categoryId: string
}

/* Pay */
export interface IInitPayRequestRequest {
    vnpLocale: string
    vnpOrderInfo: string
    vnpAmount: number
    vnpIpAddr: string
}

/* Order */
interface ICreateChildOrderRequest {
    itemId: string
    quantity: number
}

export interface ICreateTotalOrderRequest {
    userId: string
    orderCode: string
    createChildOrderRequests: ICreateChildOrderRequest[]
}

                                        /* RESPONSE */
/* Auth */
export interface ISignUpResponse extends UserInfo {}

/* Item */
export interface ISearchItemResponse extends ItemInfo {}

export interface ISearchItemCategoryResponse extends CategoryInfo {}

/* Order */
export interface ICreateTotalOrderResponse {
    totalOrder: TotalOrderInfo
    numberOfChildOrders: number
    childOrders: OrderInfo[]
}