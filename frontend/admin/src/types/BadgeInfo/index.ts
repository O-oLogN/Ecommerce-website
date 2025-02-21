import { IBaseData } from "types"

export interface BadgeInfo extends IBaseData {
    badgeId: string
    iconMinioGetUrl: string | null
    iconMinioPutUrl: string | null
    description: string
}