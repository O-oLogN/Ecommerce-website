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
    quantity: number
    image: File | null
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    highlightIds: string[]
    badgeIds: string[]
    numberOfReviews: number
    rate: number | null
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
    highlightIds: string[]
    badgeIds: string[]
    numberOfReviews: number
    rate: number | null
}

                                    /* RESPONSES */
export interface ISearchItemResponse extends ItemInfo {}

export interface IEditItemResponse extends ItemInfo {}

export interface IDeleteItemResponse extends ItemInfo {}

export interface ICreateItemResponse extends ItemInfo {}