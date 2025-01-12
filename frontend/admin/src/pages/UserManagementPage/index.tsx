import {UserList} from './components/UserList'
import {UserManagementContextProvider} from './hooks/UserManagementContext.tsx'

const UserManagement = () => {
    return (
        <UserList />
    )
}

export const UserManagementPage = () => {
    return (
        <UserManagementContextProvider>
            <UserManagement />
        </UserManagementContextProvider>    
    )
}