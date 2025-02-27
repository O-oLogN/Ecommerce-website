import {CategoryInfo, ItemInfo} from 'types'
import React from "react"
import {ItemInCart} from "types/ItemInCart"

export interface NavbarContextProps {
    itemsInCart: ItemInCart[]
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInCart[]>>
    orderCode: string
    setOrderCode: React.Dispatch<React.SetStateAction<string>>
}

export interface ProductListProps {
    categories: CategoryInfo[]
    products: ItemInfo[]
    itemsInCart: ItemInCart[]
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInCart[]>>
    setSelectedProduct: React.Dispatch<React.SetStateAction<ItemInfo | null>>
}