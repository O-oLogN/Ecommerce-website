import React, {ReactNode, useContext, useState} from "react"
import {LoginContextProps} from "../types"
import {ILoginRequest} from "services/types"
import {useLogin} from "services"
import {localStorageKeys} from "constants/LocalStorageKeys"
import {HttpStatusCode} from "axios"

const LoginContext = React.createContext<LoginContextProps>({
    authenticated: undefined,
    loginRequest: {
        username: '',
        password: '',
    },
    setLoginRequest: () => {},
    setAuthenticated: () => {},
})

export const LoginContextProvider = ({children}: {children: ReactNode }) => {
    const [loginRequest, setLoginRequest] = useState<ILoginRequest>({
        username: '',
        password: '',
    })
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined)

    const response = useLogin(loginRequest)

    React.useEffect(() => {
        if (!response) {
            console.log('Response is undefined')
        }
        else if (!response.data) {
            console.log('response.data is undefined')
        }
        else {
            if (response.data.status === HttpStatusCode.Ok || response.data.status === HttpStatusCode.Accepted) {
                console.log('CONTEXT - login successfully')
                setAuthenticated(true)
                localStorage.setItem(localStorageKeys.JWT, btoa(response.data.data))
            }
            else {
                setAuthenticated(false)
                console.log('CONTEXT - invalid username or password')
            }
        }
    }, [response.data])

    const value: LoginContextProps = {
        authenticated,
        loginRequest,
        setLoginRequest,
        setAuthenticated,
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    return useContext(LoginContext)
}
