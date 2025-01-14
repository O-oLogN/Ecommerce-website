import {ItemList} from './components/ItemList'
import {ItemManagementContextProvider} from './hooks/ItemManagementContext.tsx'

const ItemManagement = () => {
    return (
        <ItemList />
    )
}

export const ItemManagementPage = () => {
    return (
        <ItemManagementContextProvider>
            <ItemManagement />
        </ItemManagementContextProvider>    
    )
}