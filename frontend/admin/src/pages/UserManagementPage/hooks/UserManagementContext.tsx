import {UserManagementContextProps} from '../types'
import {ISearchUserRequest} from '../../../services/types'
import React, {useContext, useState} from 'react'
import {useSearchUser} from '../../../services/User'
import {HttpStatusCode} from 'axios'
import {UserInfo, IQueryRequest} from 'src/types'

const UserManagementContext = React.createContext<UserManagementContextProps>({
    userList: [],
    searchRequest: {
        sample: {
            username: ''
        },
        // pageInfo: {
        //     pageNumber: 0,
        //     pageSize: 10
        // },
        // ordersBy: {
        //
        // }
    },
    setSearchRequest: () => {}
})

export const UserManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userList, setUserList] = useState<UserInfo[]>([])
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchUserRequest>>
    ({
        sample: {
            username: ''
        },
        // pageInfo: {
        //     pageNumber: 0,
        //     pageSize: 10
        // },
        // ordersBy: {
        //
        // }
    })

    const response = useSearchUser(searchRequest)

    React.useEffect(() => {
        if (!response) {
            console.log('Response is undefined')
        }
        else if (!response.data) {
            console.log('response.data is undefined')
        }
        else {
            if ('content' in response.data) {
                if (response.data.content.status === HttpStatusCode.Ok || response.data.content.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - Paging - search user list successfully')
                    setUserList(response.data.content.data.users as UserInfo[])
                }
                else {
                    console.log('CONTEXT - Paging - user not found')
                    setUserList([])
                }
            }
            else {
                if (response.data.status === HttpStatusCode.Ok || response.data.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - NON-Paging - search user list successfully')
                    setUserList(response.data.data.users as UserInfo[])
                }
                else {
                    console.log('CONTEXT - NON-Paging - user not found')
                    setUserList([])
                }
            }
        }
    }, [response.isSuccess, response.data])

    const value = {
        userList: userList,
        searchRequest: searchRequest,
        setSearchRequest: setSearchRequest,
    }
    
    return (
        <UserManagementContext.Provider value={value}>
            {children}
        </UserManagementContext.Provider>
    )
}

export const useUserManagementContext = () => {
    return useContext(UserManagementContext)
}