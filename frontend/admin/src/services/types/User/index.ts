import {UserInfo} from 'src/types'
                                    /* REQUESTS */
export interface ISearchUserRequest {
    username: string | null | undefined
}

export interface IEditUserRequest {
    userId: string
    username: string
    email: string | null | undefined
}

export interface IDeleteUserRequest {
    userId: string
}

export interface ICreateUserRequest {
    username: string
    password: string
    email: string | undefined
}

                                    /* RESPONSES */                          
export interface ISearchUserResponse {
    size?: number 
    users?: UserInfo[] | undefined
}

export interface IEditUserResponse extends UserInfo {}

export interface IDeleteUserResponse extends UserInfo {}

export interface ICreateUserResponse extends UserInfo {}