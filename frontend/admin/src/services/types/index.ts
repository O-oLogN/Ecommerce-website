export * from './Auth'
export * from './User'
export * from './Category'
export * from './Item'
export * from './Role'
export * from './Highlight'
export * from './Badge'

export interface IBaseResponse<T> {
    status: number
    timestamp: string
    message: string
    data: T
}