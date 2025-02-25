import {ILoginRequest} from "services/types"
import React from "react";

export interface LoginContextProps {
    handleLogin: (loginRequest: ILoginRequest) => Promise<void>
    authenticated: boolean | undefined
    setUsername: React.Dispatch<React.SetStateAction<string>>
}