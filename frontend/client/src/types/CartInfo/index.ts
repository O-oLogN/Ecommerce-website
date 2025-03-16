import {IBaseData, ItemInfo} from "types"

export interface CartInfo extends IBaseData {
    itemQuantity: number
    item: ItemInfo
}