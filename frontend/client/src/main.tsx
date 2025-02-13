import LoginPageWrapper from 'pages/LoginPage/LoginPage.tsx'
import SignUpPageWrapper from 'pages/SignUpPage/SignUpPage.tsx'
import "./../index.css"
import {createRoot} from "react-dom/client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"
import StickyNavbar from "layout/Navbar/Navbar.tsx"
import Footer from "layout/Footer/Footer.tsx"
import {NavbarContextProvider} from 'layout/Navbar/hooks/NavbarContext.tsx'
import HomePage from 'pages/HomePage/HomePage.tsx'
import {HomePageContextProvider} from "pages/HomePage/hooks/HomePageContext.tsx"
import ProductDetailsPage from "pages/ProductDetailsPage/ProductDetailsPage.tsx"
import CartPage from "pages/CartPage/CartPage.tsx"
import { CartContextProvider } from 'pages/CartPage/hooks/CartContext'

const queryClient = new QueryClient()

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN} element={<LoginPageWrapper/>}/>
                    <Route path={REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_UP} element={<SignUpPageWrapper/>}/>
                </Routes>
                <NavbarContextProvider>
                    <StickyNavbar />
                    <HomePageContextProvider>
                        <Routes>
                            <Route path={REQUEST_MAPPING.HOMEPAGE} element={<HomePage/>} />
                            <Route path={REQUEST_MAPPING.ITEM + REQUEST_PATH.ITEM_DETAILS} element={<ProductDetailsPage/>} />
                        </Routes>
                    </HomePageContextProvider>
                    <CartContextProvider>
                        <Routes>
                            <Route path={REQUEST_MAPPING.CART} element={ <CartPage/> } />
                        </Routes>
                    </CartContextProvider>
                </NavbarContextProvider>
                <Footer />
            </Router>
        </>
    )
}

const container = document.getElementById('root')
const root = container && createRoot(container)
root!.render(
    <QueryClientProvider client={ queryClient }>
        <App/>
    </QueryClientProvider>
)
