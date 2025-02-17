import {createContext} from "react"
import {NavbarContextProps} from "../types"
import {useState, useContext} from "react"
import {ItemInCart} from "types/ItemInCart"

const navbarContext = createContext<NavbarContextProps>({
	itemsInCart: [],
	setItemsInCart: () => {},
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
	const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([])

	return (
		<navbarContext.Provider value={{ 
			itemsInCart, 
			setItemsInCart,
		}}>
            {children}
        </navbarContext.Provider>
	)
}

export const useNavbarContext = () => {
	return useContext(navbarContext)
}