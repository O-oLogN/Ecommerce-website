import {createRoot} from 'react-dom/client'
import {LoginPage} from "./pages/Login";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
    UserManagementPage, 
    CategoryManagementPage,
    ItemManagementPage,
} from './pages';
import Layout from './layout'

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={ queryClient }>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="user-management" element={<UserManagementPage />} />
                        <Route path="category-management" element={<CategoryManagementPage />} />
                        <Route path="item-management" element={<ItemManagementPage />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);