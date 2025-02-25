import {CategoryInfo} from 'types'
                                    /* REQUESTS */
export interface ISearchCategoryRequest {
    categoryName: string | null
}

export interface ISearchCategoryByIdRequest {
    categoryId: string
}

export interface IEditCategoryRequest {
    categoryId: string
    code: string | null
    name: string
}

export interface ICreateCategoryRequest {
    code: string | null
    name: string
}

export interface IDeleteCategoryRequest {
    categoryId: string
}

                                    /* RESPONSES */
export interface ISearchCategoryResponse extends CategoryInfo {}

export interface ISearchCategoryByIdResponse extends CategoryInfo {}

export interface IEditCategoryResponse extends CategoryInfo {}

export interface IDeleteCategoryResponse extends CategoryInfo {}

export interface ICreateCategoryResponse extends CategoryInfo {}