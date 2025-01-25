import {IBaseData} from 'types'

export interface UserInfo extends IBaseData {
    userId: string
    username: string
    password: string
    email: string | null
    roles: string[] | null
}