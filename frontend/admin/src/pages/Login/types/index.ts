export interface LoginContextStates {
    authenticated: boolean | undefined
    loginRequest: ILoginRequest
}

export interface LoginContextSetStates {
    setLoginRequest: React.Dispatch<React.SetStateAction<ILoginRequest>>
}

export interface LoginContextProps extends LoginContextStates, LoginContextSetStates {
}

export interface LoginForm {
    username: string
    password: string
}
export interface ILoginRequest extends LoginForm {
}