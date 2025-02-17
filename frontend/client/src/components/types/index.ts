import React, {ReactElement} from "react"
import {
    ItemInfo,
} from "types"
import {ItemInCart} from "types/ItemInCart"

export interface AlertProps {
    message: string
    description: string
}

interface Input {
    value: string
    isError: boolean
    alertMsg: string | null
}

export interface UsernameInputProps extends Input {}

export interface PasswordInputProps extends Input {
    title: string
    textHolder?: string
}

export interface AlertMsgProps {
    styles?: string
    alertMsg: string | null
}

export interface TitleProps {
    content: string
}

export interface SubmitButtonProps {
    buttonName: string
}

export interface EmailInputProps extends Input {}


                                    /* Product card interfaces */
export interface HighlightProps {
    content: string
}

export interface ProductNameProps {
    name: string
    href: string
}

export interface RatingProps {
    rate: number
    numberOfReviews: number
}

export interface BadgeProps {
    iconUrl: string | null
    description: string
}

export interface ProductCardProps extends ItemInfo {
    itemsInCart: ItemInCart[]
    setItemsInCart: React.Dispatch<React.SetStateAction<ItemInCart[]>>
    setSelectedProduct: React.Dispatch<React.SetStateAction<ItemInfo | null>>
}

export interface ProductArrayProps {
    categoryName: string
    productCards: ReactElement[]
}