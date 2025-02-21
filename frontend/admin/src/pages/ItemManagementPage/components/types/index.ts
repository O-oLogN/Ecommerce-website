import {BadgeInfo, HighlightInfo, IBaseData} from 'types'

export interface TableData extends IBaseData {
    key: string
    categoryCode?: string
    categoryName?: string
    itemId: string
    categoryId: string
    name: string
    price: number | undefined
    quantity: number
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    highlights: HighlightInfo[] | null
    badges: BadgeInfo[] | null
    numberOfReviews: number
    rate: number | null
}