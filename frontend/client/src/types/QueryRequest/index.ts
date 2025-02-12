interface PageInfo {
    pageNumber: number
    pageSize: number
}

interface OrderBy {
    property: string
    direction: string
}

export interface IQueryRequest<T> {
    sample: T
    pageInfo: PageInfo
    orders: OrderBy[]
}