import {UserInfo, IQueryRequest} from 'src/types'
import {ISearchUserRequest} from 'src/services/types'

export interface UserManagementContextProps {
    userList: UserInfo[]
    searchRequest: IQueryRequest<ISearchUserRequest>
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<ISearchUserRequest>>>
}
