import {ILoginRequest} from 'services/types'
import React from "react"

export interface LoginForm {
    username: string
    password: string
}

export interface LoginContextProps {
    authenticated: boolean | undefined
    loginRequest: ILoginRequest
    setLoginRequest: React.Dispatch<React.SetStateAction<ILoginRequest>>
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
