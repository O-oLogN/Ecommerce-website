import {CategoryInfo, IQueryRequest} from 'src/types'
import {
    ISearchCategoryRequest, 
    IEditCategoryRequest, 
    IDeleteCategoryRequest,
    ICreateCategoryRequest,
} from 'src/services/types'
import {useEditCategory, useDeleteCategory, useCreateCategory} from 'src/services'

export interface CategoryManagementContextProps {
    categoryList: CategoryInfo[] | undefined
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
    refetchCategoryList: () => void
}
