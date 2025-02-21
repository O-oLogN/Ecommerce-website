import {AppContextProvider} from './hooks/AppContext.tsx'
import {App} from './App.tsx'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const AppWrapper = () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <QueryClientProvider client={queryClient}>
        <AppWrapper />
    </QueryClientProvider>
)