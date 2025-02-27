import {ItemInCart} from "types/ItemInCart"

export const saveItemsToLocalStorage = (itemsArray: ItemInCart[]) => {
    localStorage.setItem('cartItems', JSON.stringify(itemsArray))
}

export const getItemsFromLocalStorage = () => {
    const itemsString = localStorage.getItem('cartItems')
    return itemsString ? JSON.parse(itemsString) : []
}