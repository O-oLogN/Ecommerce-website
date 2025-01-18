import {IBaseData} from '../index.ts'

export interface UserInfo extends IBaseData {
    userId: string
    username: string
    password: string
    email: string | null
}