export interface UserInfo {
    userId: string
    username: string
    password: string
    email: string | null
    roles: string[] | null
}