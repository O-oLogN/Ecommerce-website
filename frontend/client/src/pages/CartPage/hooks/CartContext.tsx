import {createContext, useContext, useState} from "react"
import {CartPageContextProps} from "pages/CartPage/types"

const CartContext = createContext<CartPageContextProps>({
    subtotal: 0,
    setSubtotal: () => {}
})

export const CartContextProvider = ({ children }: { children: any }) => {
    const [subtotal, setSubtotal] = useState<number>(0)

    const value = {
        subtotal,
        setSubtotal,
    }

    return (
        <CartContext.Provider value={ value }>
            { children }
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}