import React, {ReactNode, useContext, useState} from "react"
import {ILoginRequest, LoginContextProps } from "../types"
import {useLogin} from "../../../services"
import {localStorageKeys} from "../../../constants";
import {HttpStatusCode} from "axios";

const LoginContext = React.createContext<LoginContextProps>({
    authenticated: undefined,
    loginRequest: {
        username: '',
        password: '',
    },
    setLoginRequest: () => {},
})

export const LoginContextProvider = ({children }: {children: ReactNode }) => {
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
            if ('content' in response.data) {
                if (response.data.content.status === HttpStatusCode.Ok || response.data.content.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - Paging - login successfully')
                    setAuthenticated(true)
                    localStorage.setItem(localStorageKeys.SESSION, JSON.stringify(response.data.content.data))
                }
                else {
                    setAuthenticated(false)
                    console.log('CONTEXT - Paging - invalid username or password')
                }
            }
            else {
                if (response.data.status === HttpStatusCode.Ok || response.data.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - NON-Paging - login successfully')
                    setAuthenticated(true)
                    localStorage.setItem(localStorageKeys.SESSION, JSON.stringify(response.data.data))
                }
                else {
                    setAuthenticated(false)
                    console.log('CONTEXT - NON-Paging - invalid username or password')
                }
            }
        }
    }, [response.data])

    const value: LoginContextProps = {
        authenticated,
        loginRequest,
        setLoginRequest,
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
