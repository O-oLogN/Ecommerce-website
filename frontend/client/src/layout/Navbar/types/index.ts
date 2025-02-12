import {CategoryInfo, ItemInfo} from 'types'
import React from "react"

export interface NavbarContextProps {
    itemsInCart: ItemInfo[]
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInfo[]>>
}

export interface ProductListProps {
    categories: CategoryInfo[]
    products: ItemInfo[]
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInfo[]>>
    setSelectedProduct: React.Dispatch<React.SetStateAction<ItemInfo | null>>
}