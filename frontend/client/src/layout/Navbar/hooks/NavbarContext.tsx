import {createContext} from "react"
import {NavbarContextProps} from "../types"
import {useState, useContext} from "react"
import {ItemInCart} from "types/ItemInCart"

const navbarContext = createContext<NavbarContextProps>({
	itemsInCart: [],
	orderCode: '',
	setItemsInCart: () => {},
	setOrderCode: () => {},
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
	const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([])
	const [orderCode, setOrderCode] = useState<string>('')

	return (
		<navbarContext.Provider value={{
			itemsInCart,
			orderCode,
			setItemsInCart,
			setOrderCode,
		}}>
            {children}
        </navbarContext.Provider>
	)
}

export const useNavbarContext = () => {
	return useContext(navbarContext)
}