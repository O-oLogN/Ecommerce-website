import {RoleList} from './components/RoleList'
import {RoleManagementContextProvider} from './hooks/RoleManagementContext.tsx'

const RoleManagement = () => {
    return (
        <RoleList />
    )
}

export const RoleManagementPage = () => {
    return (
        <RoleManagementContextProvider>
            <RoleManagement />
        </RoleManagementContextProvider>    
    )
}