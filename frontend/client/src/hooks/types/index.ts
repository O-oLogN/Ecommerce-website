import React from "react"

export interface AppContextProps {
    authenticated: boolean | undefined
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>
}