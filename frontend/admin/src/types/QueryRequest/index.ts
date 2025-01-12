export interface IPageInfo {
    pageNumber: number
    pageSize : number
}

export interface IOrderBy {
    property: string
    orderBy: string
}

export interface IQueryRequest<T> {
    sample: T
    pageInfo?: IPageInfo
    ordersBy?: IOrderBy[] | any
}