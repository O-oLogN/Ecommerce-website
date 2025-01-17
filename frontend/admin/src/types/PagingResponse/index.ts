export interface IPagingResponse<T> {
    totalPages: number
    totalElements: number
    pageNumber: number
    pageSize: number
    numberOfElements: number
    content: T[] | undefined
}
