import {AppContextProps} from '../types/index.ts'
import React from "react"

const AppContext = React.createContext<AppContextProps>({
    authenticated: false,
    setAuthenticated: () => {},
})

export const AppContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = React.useState<boolean>(false)
    console.log(authenticated)
    const value = {
        authenticated,
        setAuthenticated,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return React.useContext(AppContext)
}