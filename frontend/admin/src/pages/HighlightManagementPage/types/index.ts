import {useCreateHighlight, useDeleteHighlight, useSearchHighlight} from "services"
import {IQueryRequest} from "types"
import React from "react"

export interface HighlightManagementContextProps {
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<string>>>
    reFetchHighlightList: () => void
    searchResponse: ReturnType<typeof useSearchHighlight> | undefined
    createHelper: ReturnType<typeof useCreateHighlight>
    deleteHelper: ReturnType<typeof useDeleteHighlight>
}