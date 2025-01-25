import {CategoryInfo, IQueryRequest} from 'types'
import {
    ISearchCategoryRequest, 
    IEditCategoryRequest, 
    IDeleteCategoryRequest,
    ICreateCategoryRequest,
} from 'services/types'
import {useSearchCategory, useEditCategory, useDeleteCategory, useCreateCategory} from 'services'
import React from "react";

export interface CategoryManagementContextProps {
    categoryList: CategoryInfo[] | undefined
    searchResponse: ReturnType<typeof useSearchCategory> | undefined
    totalElements: number
    searchRequest: IQueryRequest<ISearchCategoryRequest>
    editRequest: IEditCategoryRequest
    deleteRequest: IDeleteCategoryRequest
    createRequest: ICreateCategoryRequest
    setCategoryList: React.Dispatch<React.SetStateAction<CategoryInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchCategoryRequest>>>
    setEditRequest: React.Dispatch<React.SetStateAction<IEditCategoryRequest>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteCategoryRequest>>
    setCreateRequest: React.Dispatch<React.SetStateAction<ICreateCategoryRequest>>
    editHelper: ReturnType<typeof useEditCategory>
    deleteHelper: ReturnType<typeof useDeleteCategory>
    createHelper: ReturnType<typeof useCreateCategory>
    reFetchCategoryList: () => void
}
