import {ItemInfo} from 'types'
                                    /* REQUESTS */
export interface ISearchItemRequest {
    itemName: string | null
}

export interface IEditItemRequest {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    image: File | null
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    quantity: number
}

export interface IDeleteItemRequest {
    itemId: string
}

export interface ICreateItemRequest {
    categoryId: string
    name: string
    price: number | null
    image: File | null
    quantity: number
}

                                    /* RESPONSES */
export interface ISearchItemResponse extends ItemInfo {}

export interface IEditItemResponse extends ItemInfo {}

export interface IDeleteItemResponse extends ItemInfo {}

export interface ICreateItemResponse extends ItemInfo {}