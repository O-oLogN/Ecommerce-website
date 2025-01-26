import {message} from 'antd'
import {QueryClient, QueryClientProvider} from "react-query"
import {useAppContext} from './hooks/AppContext.tsx'
import {AppContextProps} from 'types'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
    LoginPage,
    UserManagementPage, 
    CategoryManagementPage,
    ItemManagementPage,
} from 'pages'
import {Layout} from 'layout'
import {RoleManagementPage} from "pages/RoleManagementPage";

export const App = () => {
    const queryClient = new QueryClient()
    message.config({
        maxCount: 1,
    })
    const {
        authenticated,
        setAuthenticated: setAppAuthenticated,
    } = useAppContext() as AppContextProps
    return (
        <QueryClientProvider client={ queryClient }>
            <Router>
                <Routes>
                        <Route path="/login" element={<LoginPage setAppAuthenticated={setAppAuthenticated} />} />
                        <Route path="/" element={<Layout authenticated={authenticated}/>}>
                            <Route path="user-management" element={<UserManagementPage/>}/>
                            <Route path="category-management" element={<CategoryManagementPage/>}/>
                            <Route path="item-management" element={<ItemManagementPage/>}/>
                            <Route path="role-management" element={<RoleManagementPage/>}/>
                        </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}