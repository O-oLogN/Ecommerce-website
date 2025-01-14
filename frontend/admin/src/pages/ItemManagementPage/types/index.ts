import {ItemInfo, IQueryRequest} from 'src/types'
import {
    ISearchItemRequest, 
    IEditItemRequest, 
    IDeleteItemRequest
} from 'src/services/types'
import {useEditItem, useDeleteItem} from 'src/services'

export interface ItemManagementContextProps {
    itemList: ItemInfo[] | undefined
    searchRequest: IQueryRequest<ISearchItemRequest>
    editRequest: IEditItemRequest
    deleteRequest: IDeleteItemRequest
    setItemList: React.Dispatch<React.SetStateAction<ItemInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchItemRequest>>>
    setEditRequest: React.Dispatch<React.SetStateAction<IEditItemRequest>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteItemRequest>>
    editHelper: ReturnType<typeof useEditItem>
    deleteHelper: ReturnType<typeof useDeleteItem>
    refetchItemList: () => void
}
