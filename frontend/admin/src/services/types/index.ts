export * from './Auth'
export * from './User'
export * from './Category'
export * from './Item'
export * from './Role'

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}