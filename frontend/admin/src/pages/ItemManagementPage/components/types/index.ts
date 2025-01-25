import { IBaseData } from 'types'

export interface TableData extends IBaseData {
    key: string
    categoryCode?: string
    categoryName?: string
    itemId: string
    categoryId: string
    name: string
    price: number | undefined
    imageUrl: string   // Image URL not Image file
    quantity: number
}