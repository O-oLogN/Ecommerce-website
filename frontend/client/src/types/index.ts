export interface IBaseData {
    createUser: string | undefined
    createDatetime: string | undefined
    modifyUser?: string | undefined
    modifyDatetime?: string | undefined
}

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data?: T
}

export * from './ItemInfo'
export * from './UserInfo'
export * from './QueryRequest'
export * from './PagingResponse'
export * from './VnpayTransactionInfo'