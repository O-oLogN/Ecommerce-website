import {ItemInfo, CategoryInfo} from "types"
import React, { SetStateAction } from "react"

export interface HomePageContextProps {
    categories: CategoryInfo[]
    products: ItemInfo[]
    selectedProduct: ItemInfo | null
    setSelectedProduct: React.Dispatch<SetStateAction<ItemInfo | null>>
}