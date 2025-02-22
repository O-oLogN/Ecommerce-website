import {createContext, useContext, useState} from "react"
import {BadgeManagementContextProps} from "pages/BadgeManagementPage/types"
import {useCreateBadge, useDeleteBadge, useSearchBadge} from "services"
import {IQueryRequest} from "types"

export const BadgeManagementContext = createContext<BadgeManagementContextProps>({
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateBadge>,
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteBadge>,
    searchResponse: undefined,
    setSearchRequest: () => {},
    reFetchBadgeList: () => {},
})

export const BadgeManagementContextProvider = ({children}: {children: any}) => {
    const createHelper = useCreateBadge()
    const deleteHelper = useDeleteBadge()
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<string>>({
        sample: '',
        pageInfo: {
            pageNumber: 0,
            pageSize: 100,
        },
        ordersBy: {

        }
    })

    const searchResponse = useSearchBadge(searchRequest)
    const reFetchBadgeList = searchResponse.refetch

    const value = {
        createHelper,
        deleteHelper,
        searchResponse,
        setSearchRequest,
        reFetchBadgeList,
    }

    return (
        <BadgeManagementContext.Provider value={value}>
            {children}
        </BadgeManagementContext.Provider>
    )
}

export const useBadgeManagementContext = () => {
    return useContext(BadgeManagementContext)
}