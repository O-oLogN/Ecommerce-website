import {LoginForm} from 'src/pages/Login/types'

export interface IAuthResponse {
    data?: object
}

export interface ILoginRequest extends LoginForm {}