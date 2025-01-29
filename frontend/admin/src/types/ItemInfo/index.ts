import {IBaseData} from 'types'

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    quantity: number
}