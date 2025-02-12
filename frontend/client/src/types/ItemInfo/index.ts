import {IBaseData} from 'types'

export interface HighlightInfo extends IBaseData {
    highlightId: string
    content: string
}

export interface BadgeInfo extends IBaseData {
    badgeId: string
    iconMinioGetUrl: string | null
    iconMinioPutUrl: string | null
    description: string
}

export interface CategoryInfo extends IBaseData {
    categoryId: string
    code: string | null
    name: string
}

export interface ItemInfo extends IBaseData {
    itemId: string
    categoryId: string
    name: string
    price: number | null
    imageMinioGetUrl: string | null
    imageMinioPutUrl: string | null
    quantity: number
    highlights: HighlightInfo[]
    badges: BadgeInfo[]
    rate: number | null
    numberOfReviews: number
}