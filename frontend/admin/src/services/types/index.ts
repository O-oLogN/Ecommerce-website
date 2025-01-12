export * from './Auth'
export * from './User'

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}