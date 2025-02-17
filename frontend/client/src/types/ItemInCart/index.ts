import {ItemInfo} from "types"

export interface ItemInCart extends ItemInfo {
    purchaseQuantity: number
}