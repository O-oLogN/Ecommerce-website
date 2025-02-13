import { ItemInfo } from "types"
import React from "react"

export interface ProductsOfCartProps {
    products: ItemInfo[]
    setSubtotal: React.Dispatch<React.SetStateAction<number>>
}

export interface CartPageProps {}

export interface SummaryProps {
    subtotal: number
    shippingFee: number
    taxes: number
}

export interface HintProps {
    content: string
    clss: string
}

export interface CartPageContextProps {
    subtotal: number
    setSubtotal:  React.Dispatch<React.SetStateAction<number>>
}