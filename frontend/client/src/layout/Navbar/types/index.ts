import {CategoryInfo, ItemInfo} from 'types'
import React from "react"

export interface NavbarContextProps {
    orderCode: string
    setOrderCode: React.Dispatch<React.SetStateAction<string>>
}

export interface ProductListProps {
    categories: CategoryInfo[]
    products: ItemInfo[]
    setSelectedProduct: React.Dispatch<React.SetStateAction<ItemInfo | null>>
}