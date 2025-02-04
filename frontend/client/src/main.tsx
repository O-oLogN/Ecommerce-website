import LoginPage from 'pages/LoginPage'
import SignUpPage from 'pages/SignUpPage'
import "./../index.css"
import {createRoot} from "react-dom/client"
import {LoginContextProvider} from "pages/LoginPage/hooks"
import {SignUpContextProvider} from "pages/SignUpPage/hooks"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const App = () => {
    return (
        <QueryClientProvider client={ new QueryClient() }>
            {/*<LoginContextProvider>*/}
            {/*    <LoginPage />*/}
            {/*</LoginContextProvider>*/}
            <SignUpContextProvider>
                <SignUpPage />
            </SignUpContextProvider>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)