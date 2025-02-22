import {useCreateBadge, useDeleteBadge, useSearchBadge} from "services"
import {IQueryRequest} from "types"
import React from "react"

export interface BadgeManagementContextProps {
    setSearchRequest: React.Dispatch<React.SetStateAction<IQueryRequest<string>>>
    reFetchBadgeList: () => void
    searchResponse: ReturnType<typeof useSearchBadge> | undefined
    createHelper: ReturnType<typeof useCreateBadge>
    deleteHelper: ReturnType<typeof useDeleteBadge>
}