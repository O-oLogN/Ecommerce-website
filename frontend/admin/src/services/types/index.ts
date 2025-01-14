export * from './Auth'
export * from './User'
export * from './Category'
export * from './Item'

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}