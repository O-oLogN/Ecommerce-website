import {UserInfo, IQueryRequest} from 'src/types'
import {
    ISearchUserRequest, 
    IEditUserRequest, 
    IDeleteUserRequest
} from 'src/services/types'
import {useEditUser, useDeleteUser} from 'src/services'

export interface UserManagementContextProps {
    userList: UserInfo[] | undefined
    searchRequest: IQueryRequest<ISearchUserRequest>
    editRequest: IEditUserRequest
    deleteRequest: IDeleteUserRequest
    setUserList: React.Dispatch<React.SetStateAction<UserInfo[] | undefined>>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchUserRequest>>>
    setEditRequest: React.Dispatch<React.SetStateAction<IEditUserRequest>>
    setDeleteRequest: React.Dispatch<React.SetStateAction<IDeleteUserRequest>>
    editHelper: ReturnType<typeof useEditUser>
    deleteHelper: ReturnType<typeof useDeleteUser>
    refetchUserList: () => void
}
