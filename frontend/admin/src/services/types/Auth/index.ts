import {LoginForm} from 'src/pages/Login/types'

export interface IAuthResponse {
    data?: string
}

export interface ILoginRequest extends LoginForm {}