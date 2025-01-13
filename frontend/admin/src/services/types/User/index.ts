import {UserInfo} from 'src/types'

export interface ISearchUserRequest {
    username: string | undefined
}

export interface ISearchUserResponse {
    size?: number 
    users?: UserInfo[] | undefined
}