import {createContext, useContext, useState} from "react"
import {HighlightManagementContextProps} from "pages/HighlightManagementPage/types"
import {useCreateHighlight, useDeleteHighlight, useSearchHighlight} from "services"
import {IQueryRequest} from "types"

export const HighlightManagementContext = createContext<HighlightManagementContextProps>({
    createHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateHighlight>,
    deleteHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useDeleteHighlight>,
    searchResponse: undefined,
    setSearchRequest: () => {},
    reFetchHighlightList: () => {},
})

export const HighlightManagementContextProvider = ({children}: {children: any}) => {
    const createHelper = useCreateHighlight()
    const deleteHelper = useDeleteHighlight()
    const [searchRequest, setSearchRequest] = useState<IQueryRequest<string>>({
        sample: '',
        pageInfo: {
            pageNumber: 0,
            pageSize: 100,
        },
        ordersBy: {

        }
    })

    const searchResponse = useSearchHighlight(searchRequest)
    const reFetchHighlightList = searchResponse.refetch

    const value = {
        createHelper,
        deleteHelper,
        searchResponse,
        setSearchRequest,
        reFetchHighlightList,
    }

    return (
        <HighlightManagementContext.Provider value={value}>
            {children}
        </HighlightManagementContext.Provider>
    )
}

export const useHighlightManagementContext = () => {
    return useContext(HighlightManagementContext)
}