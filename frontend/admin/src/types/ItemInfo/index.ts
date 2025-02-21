import {BadgeInfo, HighlightInfo, IBaseData} from 'types'

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    quantity: number
    highlights: HighlightInfo[] | null
    badges: BadgeInfo[] | null
    numberOfReviews: number
    rate: number | null
}