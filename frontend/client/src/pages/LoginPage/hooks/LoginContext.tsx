import {createContext, useContext, useState} from "react"
import {LoginContextProps} from "pages/LoginPage/types"
import {ReactNode} from "react"
import {ILoginRequest} from "services/types"
import {useLogin} from "services"

const LoginContext = createContext<LoginContextProps>({
    handleLogin: async () => {},
    loginContextAuthenticated: undefined,
})

export const LoginContextProvider = ({children}: {children: ReactNode }) => {
    const [loginContextAuthenticated, setLoginContextAuthenticated] = useState<boolean | undefined>(undefined)
    const loginMutation = useLogin()
    const handleLogin = async (loginRequest: ILoginRequest) => {
        if (!loginRequest) {
            return
        }

        loginMutation.mutate(loginRequest!,
        {
            onSuccess: (loginResponse) => {
                localStorage.setItem('jwt', btoa(loginResponse.data))
                console.log('Sign in successfully')
                localStorage.setItem('username', loginRequest.username)
                setLoginContextAuthenticated(true)
            },
            onError: () => {
                console.log('Invalid username or password')
                setLoginContextAuthenticated(false)
            }
        })
    }

    return (
        <LoginContext.Provider value={{
            handleLogin,
            loginContextAuthenticated,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    return useContext(LoginContext)
}