import {IOrderBy, UserInfo} from 'src/types'

export interface ISearchUserRequest {
    username: string | undefined
    ordersBy: IOrderBy[] | undefined
}

export interface ISearchUserResponse {
    data?: UserInfo[] | undefined
}