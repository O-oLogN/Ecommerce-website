import {createContext} from "react"
import {NavbarContextProps} from "../types"
import {useState, useContext} from "react"

const navbarContext = createContext<NavbarContextProps>({
	orderCode: '',
	setOrderCode: () => {},
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
	const [orderCode, setOrderCode] = useState<string>('')

	return (
		<navbarContext.Provider value={{
			orderCode,
			setOrderCode,
		}}>
            {children}
        </navbarContext.Provider>
	)
}

export const useNavbarContext = () => {
	return useContext(navbarContext)
}