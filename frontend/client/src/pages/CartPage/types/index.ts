import React from "react"
import {ItemInCart} from "types/ItemInCart"

export interface ProductsOfCartProps {
    itemsInCart: ItemInCart[]
    setSubtotal: React.Dispatch<React.SetStateAction<number>>
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInCart[]>>
}

export interface CartPageProps {}

export interface SummaryProps {
    name: string
    subtotal: number
    shippingFee: number
    taxes: number
    buttonName?: string
}

export interface HintProps {
    content: string
    clss: string
}

export interface CartPageContextProps {
    subtotal: number
    setSubtotal:  React.Dispatch<React.SetStateAction<number>>
}