import {ItemManagementContextProps} from '../types'
import {
    ISearchItemRequest, 
    IEditItemRequest,
    IDeleteItemRequest,
    ICreateItemRequest,
} from '../../../services/types'
import React, {useContext, useState} from 'react'
import {useSearchItem, useEditItem, useDeleteItem, useCreateItem, useSearchCategoryById} from '../../../services'
import {HttpStatusCode} from 'axios'
import {ItemInfo, IQueryRequest} from 'src/types'

const ItemManagementContext = React.createContext<ItemManagementContextProps>({
    searchResponse: undefined,
    itemList: [],
    totalElements: 0,
    searchRequest: {
        sample: {
            itemName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 10
        },
        ordersBy: {

        }
    },
    editRequest: {
        itemId: '',
        categoryId: '',
        name: '',
        price: 0,
        image: null,
        quantity: 0,
    },
    deleteRequest: {
        itemId: '',
    },
    createRequest: {
        categoryId: '',
        name: '',
        price: 0,
        image: null,
        quantity: 0,
    },
    setItemList: () => {},
    setSearchRequest: () => {},
    setEditRequest: () => {},
    setDeleteRequest: () => {},
    setCreateRequest: () => {},
    editHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useEditItem>,
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteItem>,
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateItem>,
    searchCategoryHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useSearchCategoryById>,
    refetchItemList: () => {},
})

export const ItemManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [itemList, setItemList] = useState<ItemInfo[] | undefined>([])
    const [totalElements, setTotalElements] = useState<number>(0)
    const [editRequest, setEditRequest] = useState<IEditItemRequest>
    ({
        itemId: '',
        categoryId: '',
        name: '',
        price: 0,
        image: null,
        quantity: 0,
    })
    const [deleteRequest, setDeleteRequest] = useState<IDeleteItemRequest>
    ({
        itemId: '',
    })
    const [createRequest, setCreateRequest] = useState<ICreateItemRequest>
    ({
        categoryId: '',
        name: '',
        price: 0,
        image: null,
        quantity: 0,
    })
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchItemRequest>>
    ({
        sample: {
            itemName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 10
        },
        ordersBy: {

        }
    })
                                    /* Search */
    const searchResponse = useSearchItem(searchRequest)
    const refetchItemList = searchResponse.refetch

    console.log('searchResponse', searchResponse)
    React.useEffect(() => {
        if (!searchResponse) {
            console.log('searchResponse is undefined')
        } else if (!searchResponse.data) {
            console.log('searchResponse.data is undefined')
        } else {
            if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                console.log('CONTEXT - Paging - search item list successfully')
                setItemList(searchResponse.data.data.content as ItemInfo[])
                setTotalElements(searchResponse.data.data.totalElements)
            } else {
                console.log('CONTEXT - Paging - item not found')
                setItemList([])
                setTotalElements(0)
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])
    
    const searchCategoryHelper = useSearchCategoryById()

                                        /* Edit - will be used in index.ts */
    const editHelper = useEditItem()
                                        /* Delete - will be used in index.ts */
    const deleteHelper = useDeleteItem()
                                        /* Create - will be used in index.ts */
    const createHelper = useCreateItem()

    const value = {
        searchResponse,
        itemList,
        totalElements,
        searchRequest,
        editRequest,
        deleteRequest,
        createRequest,
        setItemList,
        setSearchRequest,
        setEditRequest,
        setDeleteRequest,
        setCreateRequest,
        editHelper,
        deleteHelper,
        createHelper,
        searchCategoryHelper,
        refetchItemList,
    }
    
    return (
        <ItemManagementContext.Provider value={value}>
            {children}
        </ItemManagementContext.Provider>
    )
}

export const useItemManagementContext = () => {
    return useContext(ItemManagementContext)
}