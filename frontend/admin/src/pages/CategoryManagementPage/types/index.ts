import {CategoryInfo, IQueryRequest} from 'src/types'
import {
    ISearchCategoryRequest, 
    IEditCategoryRequest, 
    IDeleteCategoryRequest
} from 'src/services/types'
import {useEditCategory, useDeleteCategory} from 'src/services'

export interface CategoryManagementContextProps {
    categoryList: CategoryInfo[] | undefined
    searchRequest: IQueryRequest<ISearchCategoryRequest>
    editRequest: IEditCategoryRequest
    deleteRequest: IDeleteCategoryRequest
    setCategoryList: React.Dispatch<React.SetStateAction<CategoryInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchCategoryRequest>>>
    setEditRequest: React.Dispatch<React.SetStateAction<IEditCategoryRequest>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteCategoryRequest>>
    editHelper: ReturnType<typeof useEditCategory>
    deleteHelper: ReturnType<typeof useDeleteCategory>
    refetchCategoryList: () => void
}
