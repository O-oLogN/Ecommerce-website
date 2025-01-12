import {UserManagementContextProps} from '../types'
import {ISearchUserRequest} from 'src/services/types'
import React, {useContext, useState} from 'react'
import {useSearchUser} from 'src/services'
import {HttpStatusCode} from "axios"
import {UserInfo} from 'src/types'

const UserManagementContext = React.createContext<UserManagementContextProps>({
    userList: undefined,
    searchRequest: {
        username: '',
        ordersBy: undefined
    },
    setSearchRequest: () => {}
})

export const UserManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userList, setUserList] = useState<UserInfo[] | undefined>()
    const [searchRequest, setSearchRequest] = useState<ISearchUserRequest>
    ({
        username: '',
        ordersBy: undefined
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
                    setUserList(response.data.content.data as UserInfo[])
                }
                else {
                    console.log('CONTEXT - Paging - user not found')
                    setUserList(undefined)
                }
            }
            else {
                if (response.data.status === HttpStatusCode.Ok || response.data.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - NON-Paging - search user list successfully')
                    setUserList(response.data.data as UserInfo[])
                }
                else {
                    console.log('CONTEXT - NON-Paging - user not found')
                    setUserList(undefined)
                }
            }
        }
    }, [response.data])
    
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