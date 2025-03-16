import React from "react"
import {IRemoveItemFromCartRequest, IUpdateItemInCartRequest } from "services/types"
import { CartInfo } from "types"

export interface AppContextProps {
    authenticated: boolean | undefined
    itemsInCart: CartInfo[]
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
    setUpdateItemInCartRequest: React.Dispatch<React.SetStateAction<IUpdateItemInCartRequest | undefined>>
    setRemoveItemFromCartRequest: React.Dispatch<React.SetStateAction<IRemoveItemFromCartRequest | undefined>>
}