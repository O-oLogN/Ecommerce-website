import {UserManagementContextProps} from '../types'
import {
    ISearchUserRequest, 
    IEditUserRequest,
    IDeleteUserRequest,
} from '../../../services/types'
import React, {useContext, useState} from 'react'
import {useSearchUser, useEditUser, useDeleteUser} from '../../../services/User'
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
    editRequest: {
        userId: '',
        username: '',
        email: '',
    },
    deleteRequest: {
        userId: '',
    },
    setUserList: () => {},
    setSearchRequest: () => {},
    setEditRequest: () => {},
    setDeleteRequest: () => {},
    editHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useEditUser>,
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteUser>,
    refetchUserList: () => {},
})

export const UserManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userList, setUserList] = useState<UserInfo[] | undefined>([])
    const [editRequest, setEditRequest] = useState<IEditUserRequest>
    ({
        userId: '',
        username: '',
        email: '',
    })
    const [deleteRequest, setDeleteRequest] = useState<IDeleteUserRequest>
    ({
        userId: '',
    })
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

                                    /* Search */
    const searchResponse = useSearchUser(searchRequest)
    const refetchUserList = searchResponse.refetch

    console.log('searchResponse', searchResponse)
    React.useEffect(() => {
        if (!searchResponse) {
            console.log('searchResponse is undefined')
        } else if (!searchResponse.data) {
            console.log('searchResponse.data is undefined')
        } else {
            if ('content' in searchResponse.data) {
                if (searchResponse.data.content.status === HttpStatusCode.Ok || searchResponse.data.content.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - Paging - search user list successfully')
                    setUserList(searchResponse.data.content.data.users as UserInfo[])
                } else {
                    console.log('CONTEXT - Paging - user not found')
                    setUserList([])
                }
            } else {
                if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                    console.log('CONTEXT - NON-Paging - search user list successfully')
                    setUserList(searchResponse.data.data.users as UserInfo[])
                } else {
                    console.log('CONTEXT - NON-Paging - user not found')
                    setUserList([])
                }
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])

                                        /* Edit - will be used in index.ts */
    const editHelper = useEditUser()
                                        /* Delete - will be used in index.ts */

    const deleteHelper = useDeleteUser()
    
    const value = {
        userList,
        searchRequest,
        editRequest,
        deleteRequest,
        setUserList,
        setSearchRequest,
        setEditRequest,
        setDeleteRequest,
        editHelper,
        deleteHelper,
        refetchUserList,
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