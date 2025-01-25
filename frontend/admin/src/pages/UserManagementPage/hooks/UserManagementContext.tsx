import {UserManagementContextProps} from '../types'
import {
    ISearchUserRequest, 
    IEditUserRequest,
    IDeleteUserRequest,
    ICreateUserRequest,
} from '../../../services/types'
import React, {useContext, useState} from 'react'
import {useSearchUser, useEditUser, useDeleteUser, useCreateUser} from '../../../services/User'
import {HttpStatusCode} from 'axios'
import {UserInfo, IQueryRequest} from 'src/types'

const UserManagementContext = React.createContext<UserManagementContextProps>({
    searchResponse: undefined,
    userList: [],
    totalElements: 0,
    searchRequest: {
        sample: {
            username: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
        },
        ordersBy: {

        }
    },
    editRequest: {
        userId: '',
        username: '',
        email: '',
    },
    deleteRequest: {
        userId: '',
    },
    createRequest: {
        username: '',
        password: '',
        email: '',
    },
    setUserList: () => {},
    setSearchRequest: () => {},
    setEditRequest: () => {},
    setDeleteRequest: () => {},
    setCreateRequest:() => {},
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
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateUser>,
    refetchUserList: () => {},
})

export const UserManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userList, setUserList] = useState<UserInfo[] | undefined>([])
    const [totalElements, setTotalElements] = useState<number>(0)
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
    const [createRequest, setCreateRequest] = useState<ICreateUserRequest>
    ({
        username: '',
        password: '',
        email: '',
    })
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchUserRequest>>
    ({
        sample: {
            username: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
        },
        ordersBy: {

        }
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
            if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                console.log('CONTEXT - Paging - search user list successfully')
                setUserList(searchResponse.data.data.content! as UserInfo[])
                setTotalElements(searchResponse.data.data.totalElements)
            } else {
                console.log('CONTEXT - Paging - user not found')
                setUserList([])
                setTotalElements(0)
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])

                                        /* Edit - will be used in index.ts */
    const editHelper = useEditUser()
                                        /* Delete - will be used in index.ts */
    const deleteHelper = useDeleteUser()
                                        /* Create - will be used in index.ts */
    const createHelper = useCreateUser()
    
    const value = {
        searchResponse,
        userList,
        totalElements,
        searchRequest,
        editRequest,
        deleteRequest,
        createRequest,
        setUserList,
        setSearchRequest,
        setEditRequest,
        setDeleteRequest,
        setCreateRequest,
        editHelper,
        deleteHelper,
        createHelper,
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