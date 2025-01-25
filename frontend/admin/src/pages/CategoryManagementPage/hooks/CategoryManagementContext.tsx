import {CategoryManagementContextProps} from '../types'
import {
    ISearchCategoryRequest, 
    IEditCategoryRequest,
    IDeleteCategoryRequest,
    ICreateCategoryRequest,
} from 'services/types'
import React, {useContext, useState} from 'react'
import {useSearchCategory, useEditCategory, useDeleteCategory, useCreateCategory} from 'services'
import {HttpStatusCode} from 'axios'
import {CategoryInfo, IQueryRequest} from 'types'

const CategoryManagementContext = React.createContext<CategoryManagementContextProps>({
    categoryList: [],
    searchResponse: undefined,
    totalElements: 0,
    searchRequest: {
        sample: {
            categoryName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 10
        },
        ordersBy: {

        }
    },
    editRequest: {
        categoryId: '',
        code: '',
        name: '',
    },
    deleteRequest: {
        categoryId: '',
    },
    createRequest: {
        code: '',
        name: '',
    },
    setCategoryList: () => {},
    setSearchRequest: () => {},
    setEditRequest: () => {},
    setDeleteRequest: () => {},
    setCreateRequest: () => {},
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
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateCategory>,
    reFetchCategoryList: () => {},
})

export const CategoryManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [categoryList, setCategoryList] = useState<CategoryInfo[] | undefined>([])
    const [totalElements, setTotalElements] = useState<number>(0)
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
    const [createRequest, setCreateRequest] = useState<ICreateCategoryRequest>
    ({
        code: '',
        name: '',
    })
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchCategoryRequest>>
    ({
        sample: {
            categoryName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 10
        },
        ordersBy: {

        }
    })

                                    /* Search */
    const searchResponse = useSearchCategory(searchRequest)
    const reFetchCategoryList = searchResponse.refetch
    console.log('searchResponse', searchResponse)
    React.useEffect(() => {
        if (!searchResponse) {
            console.log('searchResponse is undefined')
        } else if (!searchResponse.data) {
            console.log('searchResponse.data is undefined')
        } else {
            if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                console.log('CONTEXT - Paging - search category list successfully')
                setCategoryList(searchResponse.data.data.content as CategoryInfo[])
                setTotalElements(searchResponse.data.data.totalElements)
            } else {
                console.log('CONTEXT - Paging - category not found')
                setCategoryList([])
                setTotalElements(0)
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])

                                        /* Edit - will be used in index.ts */
    const editHelper = useEditCategory()
                                        /* Delete - will be used in index.ts */
    const deleteHelper = useDeleteCategory()
                                        /* Create - will be used in index.ts */
    const createHelper = useCreateCategory()
    
    const value = {
        searchResponse,
        categoryList,
        totalElements,
        searchRequest,
        editRequest,
        deleteRequest,
        createRequest,
        setCategoryList,
        setSearchRequest,
        setEditRequest,
        setDeleteRequest,
        setCreateRequest,
        editHelper,
        deleteHelper,
        createHelper,
        reFetchCategoryList,
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