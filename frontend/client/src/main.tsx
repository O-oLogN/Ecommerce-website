import LoginPageWrapper from 'pages/LoginPage'
import SignUpPageWrapper from 'pages/SignUpPage'
import "./../index.css"
import {createRoot} from "react-dom/client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"

const App = () => {
    return (
        <QueryClientProvider client={ new QueryClient() }>
            <Router>
                <Routes>
                    <Route path={ REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN } element={<LoginPageWrapper />} />
                    <Route path={ REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_UP } element={<SignUpPageWrapper />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)