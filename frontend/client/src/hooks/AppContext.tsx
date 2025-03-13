import {createContext, useContext, useEffect, useState} from "react"
import {AppContextProps} from "hooks/types"
import { useVerifyToken } from "services"
import {HttpStatusCode} from "axios"

export const AppContext = createContext<AppContextProps>({
    authenticated: undefined,
    setAuthenticated: () => {},
})

export const AppContextProvider = ({ children }: { children: any }) => {
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined)

    const verifyTokenMutation = useVerifyToken()

    useEffect(() => {
        const verifyToken = async () => {
            if (!authenticated) {
                try {
                    const verifyTokenResponse = await verifyTokenMutation.mutateAsync()
                    if (verifyTokenResponse.status === HttpStatusCode.Ok || verifyTokenResponse.status === HttpStatusCode.Accepted) {
                        setAuthenticated(true)
                    } else {
                        setAuthenticated(false)
                    }
                } catch (error) {
                    setAuthenticated(false)
                    console.log(error)
                }
            }
        }

        verifyToken().then(() => {})
    }, [authenticated])

    const value = {
        authenticated,
        setAuthenticated,
    }

    return (
        <AppContext.Provider value={ value }>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}


