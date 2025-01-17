import {ItemInfo, IQueryRequest} from 'src/types'
import {
    ISearchItemRequest, 
    IEditItemRequest, 
    IDeleteItemRequest,
    ICreateItemRequest,
} from 'src/services/types'
import {useEditItem, useDeleteItem, useCreateItem, useSearchCategoryById} from 'src/services'

export interface ItemManagementContextProps {
    itemList: ItemInfo[] | undefined
    totalElements: number
    searchRequest: IQueryRequest<ISearchItemRequest>
    editRequest: IEditItemRequest
    deleteRequest: IDeleteItemRequest
    createRequest: ICreateItemRequest
    setItemList: React.Dispatch<React.SetStateAction<ItemInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchItemRequest>>>
    setEditRequest: React.Dispatch<React.SetStateAction<IEditItemRequest>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteItemRequest>>
    setCreateRequest: React.Dispatch<React.SetStateAction<ICreateItemRequest>>
    editHelper: ReturnType<typeof useEditItem>
    deleteHelper: ReturnType<typeof useDeleteItem>
    createHelper: ReturnType<typeof useCreateItem>
    searchCategoryHelper: ReturnType<typeof useSearchCategoryById>
    refetchItemList: () => void
}
