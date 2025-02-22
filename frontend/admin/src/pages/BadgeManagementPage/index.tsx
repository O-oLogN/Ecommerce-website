import {BadgeList} from "pages/BadgeManagementPage/components/BadgeList"
import {BadgeManagementContextProvider} from "pages/BadgeManagementPage/hooks/BadgeManagementContext.tsx"

const BadgeManagement = () => {
    return (
        <BadgeList />
    )
}

export const BadgeManagementPage = () => {
    return (
        <BadgeManagementContextProvider>
            <BadgeManagement />
        </BadgeManagementContextProvider>
    )
}