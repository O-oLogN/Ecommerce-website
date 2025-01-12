import {ILoginRequest} from 'src/services/types'

export interface LoginForm {
    username: string
    password: string
}

export interface LoginContextProps {
    authenticated: boolean | undefined
    loginRequest: ILoginRequest
    setLoginRequest: React.Dispatch<React.SetStateAction<ILoginRequest>>
}
