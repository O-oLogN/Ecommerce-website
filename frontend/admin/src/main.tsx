import {createRoot} from 'react-dom/client'
import {LoginPage} from "./pages/Login";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {UserManagementPage} from './pages/UserManagementPage';
import Layout from './layout/index.tsx'

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={ queryClient }>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/user-management" element={<UserManagementPage />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);