
export interface IBase {
    createUser?: string
    createDatetime?: string
    modifyUser?: string
    modifyDatetime?: string
}

export interface IUserInfo extends IBase {
    userId?: string
    username?: string
    password?: string
    email?: string
}