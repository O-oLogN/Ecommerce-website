import {BadgeInfo} from "types"

                                            /* REQUESTS */
export interface ICreateBadgeRequest {
    icon: File | null
    description: string
}

export interface IEditBadgeRequest {
    badgeId: string
    icon: File | null
    iconMinioGetUrl: string
    iconMinioPutUrl: string
    description: string
}

                                            /* RESPONSES */
export interface ICreateBadgeResponse extends BadgeInfo {}

export interface IEditBadgeResponse extends BadgeInfo {}

export interface IDeleteBadgeResponse extends BadgeInfo {}