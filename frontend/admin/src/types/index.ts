export * from './QueryRequest'
export * from './PagingResponse'
export * from './UserInfo'

export interface IBaseData {
    createUser?: string | undefined
    createDatetime?: string | undefined
    modifyUser?: string | undefined
    modifyDatetime?: string | undefined
}