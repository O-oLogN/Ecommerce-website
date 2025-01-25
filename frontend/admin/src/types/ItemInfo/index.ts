import {IBaseData} from 'types'

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    image: File | null
    quantity: number
}