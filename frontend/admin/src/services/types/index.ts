export * from './Auth'
export * from './User'
export * from './Category'

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}