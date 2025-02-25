import {ItemInCart} from "types/ItemInCart"

export const saveItemsToLocalStorage = (itemsArray: ItemInCart[]) => {
    localStorage.setItem('cartItems', JSON.stringify(itemsArray))
    console.log(localStorage.getItem('cartItems'))
}

export const getItemsFromLocalStorage = () => {
    const itemsString = localStorage.getItem('cartItems')
    return itemsString ? JSON.parse(itemsString) : []
}