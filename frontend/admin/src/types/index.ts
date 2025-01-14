export * from './QueryRequest'
export * from './PagingResponse'
export * from './UserInfo'
export * from './CategoryInfo'
export * from './ItemInfo'

export interface IBaseData {
    createUser: string | undefined
    createDatetime: string | undefined
    modifyUser?: string | undefined
    modifyDatetime?: string | undefined
}