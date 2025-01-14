import {CategoryInfo} from 'src/types'
                                    /* REQUESTS */
export interface ISearchCategoryRequest {
    categoryName: string | null | undefined
}

export interface IEditCategoryRequest {
    categoryId: string
    code: string | undefined
    name: string
}

export interface ICreateCategoryRequest {
    code: string | undefined
    name: string
}

export interface IDeleteCategoryRequest {
    categoryId: string
}

                                    /* RESPONSES */
export interface ISearchCategoryResponse {
    size?: number
    categories?: CategoryInfo[] | undefined
}

export interface IEditCategoryResponse extends CategoryInfo {}

export interface IDeleteCategoryResponse extends CategoryInfo {}

export interface ICreateCategoryResponse extends CategoryInfo {}