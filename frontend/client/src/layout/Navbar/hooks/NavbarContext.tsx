import {createContext} from "react"
import {NavbarContextProps} from "../types"
import {ItemInfo} from "types"
import {useState, useContext} from "react"

const navbarContext = createContext<NavbarContextProps>({
	itemsInCart: [],
	setItemsInCart: () => {},
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
	const [itemsInCart, setItemsInCart] = useState<ItemInfo[]>([])

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