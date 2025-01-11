import { createRoot } from 'react-dom/client'
import {LoginPage} from "./pages/Login";
import {QueryClient, QueryClientProvider} from "react-query";
import {LoginContextProvider} from "./pages/Login/hooks/LoginContext.tsx";

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={ queryClient }>
            <LoginContextProvider>
                <LoginPage />
            </LoginContextProvider>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);