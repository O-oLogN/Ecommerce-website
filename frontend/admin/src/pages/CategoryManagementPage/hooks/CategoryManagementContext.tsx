import {CategoryManagementContextProps} from '../types'
import {
    ISearchCategoryRequest, 
    IEditCategoryRequest,
    IDeleteCategoryRequest,
} from '../../../services/types'
import React, {useContext, useState} from 'react'
import {useSearchCategory, useEditCategory, useDeleteCategory} from '../../../services/Category'
import {HttpStatusCode} from 'axios'
import {CategoryInfo, IQueryRequest} from 'src/types'

const CategoryManagementContext = React.createContext<CategoryManagementContextProps>({
    categoryList: [],
    searchRequest: {
        sample: {
            categoryName: ''
        },
        // pageInfo: {
        //     pageNumber: 0,
        //     pageSize: 10
        // },
        // ordersBy: {
        //
        // }
    },
    editRequest: {
        categoryId: '',
        code: '',
        name: '',
    },
    deleteRequest: {
        categoryId: '',
    },
    setCategoryList: () => {},
    setSearchRequest: () => {},
    setEditRequest: () => {},
    setDeleteRequest: () => {},
    editHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useEditCategory>,
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteCategory>,
    refetchCategoryList: () => {},
})

export const CategoryManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [categoryList, setCategoryList] = useState<CategoryInfo[] | undefined>([])
    const [editRequest, setEditRequest] = useState<IEditCategoryRequest>
    ({
        categoryId: '',
        code: '',
        name: '',
    })
    const [deleteRequest, setDeleteRequest] = useState<IDeleteCategoryRequest>
    ({
        categoryId: '',
    })
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchCategoryRequest>>
    ({
        sample: {
            categoryName: ''
        },
        // pageInfo: {
        //     pageNumber: 0,
        //     pageSize: 10
        // },
        // ordersBy: {
        //
        // }
    })

                                    /* Search */
    const searchResponse = useSearchCategory(searchRequest)
    const refetchCategoryList = searchResponse.refetch

    console.log('searchResponse', searchResponse)
    React.useEffect(() => {
        if (!searchResponse) {
            console.log('searchResponse is undefined')
        } else if (!searchResponse.data) {
            console.log('searchResponse.data is undefined')
        } else {
            if ('content' in searchResponse.data) {
                if (searchResponse.data.content.status === HttpStatusCode.Ok || searchResponse.data.content.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - Paging - search category list successfully')
                    setCategoryList(searchResponse.data.content.data.categories as CategoryInfo[])
                } else {
                    console.log('CONTEXT - Paging - category not found')
                    setCategoryList([])
                }
            } else {
                if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - NON-Paging - search category list successfully')
                    setCategoryList(searchResponse.data.data.categories as CategoryInfo[])
                } else {
                    console.log('CONTEXT - NON-Paging - category not found')
                    setCategoryList([])
                }
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])

                                        /* Edit - will be used in index.ts */
    const editHelper = useEditCategory()
                                        /* Delete - will be used in index.ts */
    const deleteHelper = useDeleteCategory()
    
    const value = {
        categoryList,
        searchRequest,
        editRequest,
        deleteRequest,
        setCategoryList,
        setSearchRequest,
        setEditRequest,
        setDeleteRequest,
        editHelper,
        deleteHelper,
        refetchCategoryList,
    }
    
    return (
        <CategoryManagementContext.Provider value={value}>
            {children}
        </CategoryManagementContext.Provider>
    )
}

export const useCategoryManagementContext = () => {
    return useContext(CategoryManagementContext)
}