import {IBaseData} from '../index.ts'

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    image: File | null
    quantity: number
}