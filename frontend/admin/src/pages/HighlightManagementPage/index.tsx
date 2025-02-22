import {HighlightList} from "pages/HighlightManagementPage/components/HighlightList"
import {HighlightManagementContextProvider} from "pages/HighlightManagementPage/hooks/HighlightManagementContext.tsx"

const HighlightManagement = () => {
    return (
        <HighlightList />
    )
}

export const HighlightManagementPage = () => {
    return (
        <HighlightManagementContextProvider>
            <HighlightManagement />
        </HighlightManagementContextProvider>
    )
}