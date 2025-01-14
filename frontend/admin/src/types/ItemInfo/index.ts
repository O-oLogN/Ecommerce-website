import {IBaseData} from '../index.ts'

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | undefined
    imageUrl: string | undefined
    quantity: number
}