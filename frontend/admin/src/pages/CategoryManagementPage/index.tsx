import {CategoryList} from './components/CategoryList'
import {CategoryManagementContextProvider} from './hooks/CategoryManagementContext.tsx'

const CategoryManagement = () => {
    return (
        <CategoryList />
    )
}

export const CategoryManagementPage = () => {
    return (
        <CategoryManagementContextProvider>
            <CategoryManagement />
        </CategoryManagementContextProvider>    
    )
}