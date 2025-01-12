import {UserInfo} from 'src/types'
import {ISearchUserRequest} from 'src/services/types'

export interface UserManagementContextProps {
    userList: UserInfo[] | undefined
    searchRequest: ISearchUserRequest
    setSearchRequest: React.Dispatch<React.SetStateAction<ISearchUserRequest>>
}
