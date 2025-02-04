import {ILoginRequest} from "services/types"

export interface LoginContextProps {
    handleLogin: (loginRequest: ILoginRequest) => Promise<void>
    authenticated: boolean | undefined
}