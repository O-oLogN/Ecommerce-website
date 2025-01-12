import { createRoot } from 'react-dom/client'
import {LoginPage} from "./pages/Login";
import {QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginContextProvider} from "./pages/Login/hooks/LoginContext.tsx";
import { HomePage } from './pages/HomePage/index.tsx';

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={ queryClient }>
            <LoginContextProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                    </Routes>
                </Router>
            </LoginContextProvider>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);