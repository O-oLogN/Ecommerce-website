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
    image: File | undefined
    quantity: number
}

export interface IDeleteItemRequest {
    itemId: string
}

export interface ICreateItemRequest {
    categoryId: string
    name: string
    price: number | undefined
    image: File | undefined
    quantity: number
}

                                    /* RESPONSES */
export interface ISearchItemResponse extends ItemInfo {}

export interface IEditItemResponse extends ItemInfo {}

export interface IDeleteItemResponse extends ItemInfo {}

export interface ICreateItemResponse extends ItemInfo {}