import {ItemInfo, CategoryInfo, IQueryRequest} from "types"
import React, { SetStateAction } from "react"
import { ISearchItemRequest } from "services/types"

export interface HomePageContextProps {
    categories: CategoryInfo[]
    products: ItemInfo[]
    selectedProduct: ItemInfo | null
    setSelectedProduct: React.Dispatch<SetStateAction<ItemInfo | null>>
    setSearchItemRequest: React.Dispatch<SetStateAction<IQueryRequest<ISearchItemRequest> | undefined>>
}