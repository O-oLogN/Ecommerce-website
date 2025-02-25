import {createContext} from "react"
import {NavbarContextProps} from "../types"
import {useState, useContext} from "react"
import {ItemInCart} from "types/ItemInCart"

const navbarContext = createContext<NavbarContextProps>({
	itemsInCart: [],
	orderNumber: 0,
	setItemsInCart: () => {},
	setOrderNumber: () => {},
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
	const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([])
	const [orderNumber, setOrderNumber] = useState<number>(0)

	return (
		<navbarContext.Provider value={{ 
			itemsInCart,
			orderNumber,
			setItemsInCart,
			setOrderNumber,
		}}>
            {children}
        </navbarContext.Provider>
	)
}

export const useNavbarContext = () => {
	return useContext(navbarContext)
}