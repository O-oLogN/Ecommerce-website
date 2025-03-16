import {
    UserInfo,
    ItemInfo,
    CategoryInfo, VnpayTransactionInfo
} from "types"
import { CartInfo } from "types/CartInfo"
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

/* Cart */
export interface IUpdateItemInCartRequest {
    username: string
    itemId: string
    itemQuantity: number
}

export interface IRemoveItemFromCartRequest {
    username: string
    itemId: string
}

/* Pay */
export interface IInitPayRequestRequest {
    vnpLocale: string
    vnpTxnRef: string
    vnpOrderInfo: string
    vnpAmount: number
    vnpIpAddr: string
    vnpBillMobile: string,
    vnpBillEmail: string,
    vnpBillFirstName: string,
    vnpBillLastName: string,
    vnpBillAddress: string,
    vnpBillCity: string,
    vnpBillCountry: string,
    vnpBillState: string,
    vnpInvPhone: string,
    vnpInvCustomer: string,
    vnpInvEmail: string,
    vnpInvAddress: string,
    vnpInvCompany: string,
    vnpInvTaxCode: string,
    vnpInvType: string,
}

/* Order */
interface ICreateChildOrderRequest {
    itemId: string
    quantity: number
}

export interface ICreateTotalOrderRequest {
    userId: string
    orderCode: string
    vnpTxnRef: string
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

/* Cart */
export interface IUpdateItemInCartResponse extends CartInfo {}

export interface IRemoveItemFromCartResponse extends CartInfo {}

/* VnpayTransaction */
export interface ISearchVnpayTransactionResponse extends VnpayTransactionInfo {}