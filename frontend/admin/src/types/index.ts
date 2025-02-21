import React from "react"

export * from './QueryRequest'
export * from './PagingResponse'
export * from './UserInfo'
export * from './CategoryInfo'
export * from './ItemInfo'
export * from './RoleInfo'
export * from './HighlightInfo'
export * from './BadgeInfo'

export interface IBaseData {
    createUser: string | undefined
    createDatetime: string | undefined
    modifyUser?: string | undefined
    modifyDatetime?: string | undefined
}

export interface AppContextProps {
    authenticated: boolean
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}