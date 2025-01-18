import {UserInfo} from 'src/types'
                                    /* REQUESTS */
export interface ISearchUserRequest {
    username: string | null
}

export interface IEditUserRequest {
    userId: string
    username: string
    email: string | null
}

export interface IDeleteUserRequest {
    userId: string
}

export interface ICreateUserRequest {
    username: string
    password: string
    email: string | null
}

                                    /* RESPONSES */                          

export interface ISearchUserResponse extends UserInfo {}

export interface IEditUserResponse extends UserInfo {}

export interface IDeleteUserResponse extends UserInfo {}

export interface ICreateUserResponse extends UserInfo {}