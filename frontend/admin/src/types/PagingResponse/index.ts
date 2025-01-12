export interface IPagingResponse<T> {
    pageNumber: number
    pageSize: number
    totalPages: number
    numberOfElements: number
    totalElements: number
    content: T
}
