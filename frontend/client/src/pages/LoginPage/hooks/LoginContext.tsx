import {createContext, useContext, useState} from "react"
import {LoginContextProps} from "pages/LoginPage/types"
import {ReactNode} from "react"
import {ILoginRequest} from "services/types"
import {useLogin} from "services"

const LoginContext = createContext<LoginContextProps>({
    handleLogin: async () => {},
    authenticated: undefined,
    setUsername: () => {},
})

export const LoginContextProvider = ({children}: {children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined)
    const [username, setUsername] = useState<string | null>('')
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
                localStorage.setItem('username', username!)
                setAuthenticated(true)
            },
            onError: () => {
                console.log('Invalid username or password')
                setAuthenticated(false)
            }
        })
    }

    return (
        <LoginContext.Provider value={{
            handleLogin,
            authenticated,
            setUsername,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => {
    return useContext(LoginContext)
}