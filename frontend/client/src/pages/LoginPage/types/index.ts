import {ILoginRequest} from "services/types"
import React from "react"

export interface LoginContextProps {
    handleLogin: (loginRequest: ILoginRequest) => Promise<void>
    loginContextAuthenticated: boolean | undefined
}

export interface LoginPageProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export interface LoginPageWrapperProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
}