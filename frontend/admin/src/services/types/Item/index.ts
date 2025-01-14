import {ItemInfo} from 'src/types'
                                    /* REQUESTS */
export interface ISearchItemRequest {
    itemName: string | undefined
}

export interface IEditItemRequest {
    itemId: string
    categoryId: string
    name: string
    price: number | undefined
    imageUrl: string | undefined
    quantity: number
}

export interface IDeleteItemRequest {
    itemId: string
}

export interface ICreateItemRequest {
    categoryId: string
    name: string
    price: number | undefined
    imageUrl: string | undefined
    quantity: number
}

                                    /* RESPONSES */
export interface ISearchItemResponse {
    size?: number
    items?: ItemInfo[] | undefined
}

export interface IEditItemResponse extends ItemInfo {}

export interface IDeleteItemResponse extends ItemInfo {}

export interface ICreateItemResponse extends ItemInfo {}