import {ItemInfo, IQueryRequest} from 'types'
import {
    ISearchItemRequest, 
    IEditItemRequest, 
    IDeleteItemRequest,
    ICreateItemRequest,
} from 'services/types'
import {useSearchItem, useEditItem, useDeleteItem, useCreateItem, useSearchCategoryById} from 'services'

export interface ItemManagementContextProps {
    searchResponse: ReturnType<typeof useSearchItem>  | undefined 
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
    reFetchItemList: () => void
}
