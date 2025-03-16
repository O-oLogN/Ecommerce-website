import React from "react"

export interface ProductsOfCartProps {
    setSubtotal: React.Dispatch<React.SetStateAction<number>>
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