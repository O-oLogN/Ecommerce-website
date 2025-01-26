import {RoleManagementContextProps} from '../types'
import {
    ISearchRoleRequest,
    IDeleteRoleRequest,
    ICreateRoleRequest,
} from 'services/types'
import React, {useContext, useState} from 'react'
import {useSearchRole, useDeleteRole, useCreateRole} from 'services'
import {HttpStatusCode} from 'axios'
import {RoleInfo, IQueryRequest} from 'types'

const RoleManagementContext = React.createContext<RoleManagementContextProps>({
    searchResponse: undefined,
    roleList: [],
    totalElements: 0,
    searchRequest: {
        sample: {
            roleName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
        },
        ordersBy: {

        }
    },
    deleteRequest: {
        roleId: '',
    },
    createRequest: {
        roleName: '',
    },
    setRoleList: () => {},
    setSearchRequest: () => {},
    setDeleteRequest: () => {},
    setCreateRequest:() => {},
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteRole>,
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateRole>,
    reFetchRoleList: () => {},
})

export const RoleManagementContextProvider = ({children}: {children: React.ReactNode}) => {
    const [roleList, setRoleList] = useState<RoleInfo[] | undefined>([])
    const [totalElements, setTotalElements] = useState<number>(0)
    const [deleteRequest, setDeleteRequest] = useState<IDeleteRoleRequest>
    ({
        roleId: '',
    })
    const [createRequest, setCreateRequest] = useState<ICreateRoleRequest>
    ({
        roleName: '',
    })
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<ISearchRoleRequest>>
    ({
        sample: {
            roleName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
        },
        ordersBy: {

        }
    })

                                        /* Search */
    const searchResponse = useSearchRole(searchRequest)
    const reFetchRoleList = searchResponse.refetch

    console.log('searchResponse', searchResponse)
    React.useEffect(() => {
        if (!searchResponse) {
            console.log('searchResponse is undefined')
        } else if (!searchResponse.data) {
            console.log('searchResponse.data is undefined')
        } else {
            if (searchResponse.data.status === HttpStatusCode.Ok || searchResponse.data.status === HttpStatusCode.Accepted) {
                console.log('CONTEXT - Paging - search Role list successfully')
                setRoleList(searchResponse.data.data.content! as RoleInfo[])
                setTotalElements(searchResponse.data.data.totalElements)
            } else {
                console.log('CONTEXT - Paging - Role not found')
                setRoleList([])
                setTotalElements(0)
            }
        }
    }, [searchResponse.isSuccess, searchResponse.data])

                                        /* Delete - will be used in index.ts */
    const deleteHelper = useDeleteRole()
                                        /* Create - will be used in index.ts */
    const createHelper = useCreateRole()
    
    const value = {
        searchResponse,
        roleList,
        totalElements,
        searchRequest,
        deleteRequest,
        createRequest,
        setRoleList,
        setSearchRequest,
        setDeleteRequest,
        setCreateRequest,
        deleteHelper,
        createHelper,
        reFetchRoleList,
    }
    
    return (
        <RoleManagementContext.Provider value={value}>
            {children}
        </RoleManagementContext.Provider>
    )
}

export const useRoleManagementContext = () => {
    return useContext(RoleManagementContext)
}