import LoginPageWrapper from 'pages/LoginPage/LoginPage.tsx'
import SignUpPageWrapper from 'pages/SignUpPage/SignUpPage.tsx'
import "./../index.css"
import {createRoot} from "react-dom/client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"
import StickyNavbar from "layout/Navbar/StickyNavbar.tsx"
import Footer from "layout/Footer/Footer.tsx"
import {NavbarContextProvider} from 'layout/Navbar/hooks/NavbarContext.tsx'
import HomePage from 'pages/HomePage/HomePage.tsx'
import {HomePageContextProvider} from "pages/HomePage/hooks/HomePageContext.tsx"
import ProductDetailsPage from "pages/ProductDetailsPage/ProductDetailsPage.tsx"
import CartPage from "pages/CartPage/CartPage.tsx"
import {CartContextProvider} from 'pages/CartPage/hooks/CartContext'
import CheckoutPage from "pages/CheckoutPage/CheckoutPage.tsx"
import cod from "assets/cod.png"
import card from "assets/card.png"
import {CheckoutContextProvider} from 'pages/CheckoutPage/hooks/CheckoutContext'
import PaymentResultPage from "pages/PaymentResultPage/PaymentResultPage.tsx"
import React, {useEffect} from "react"
import NotFoundPage from "pages/404NotFoundPage/404NotFoundPage.tsx"
import {AppContextProvider, useAppContext} from "hooks/AppContext.tsx"

const queryClient = new QueryClient()

const App = () => {
    // const [authenticated, setAuthenticated] = useState<boolean | undefined>(true)
    const {
        authenticated,
        setAuthenticated,
    } = useAppContext()

    return (
        <div className="w-full overflow-x-hidden">
            <div className="min-h-[700px]">
                <Router>
                    <Routes>
                        <Route path={REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN} element={<LoginPageWrapper setAuthenticated={ setAuthenticated }/>}/>
                        <Route path={REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_UP} element={<SignUpPageWrapper/>}/>
                    </Routes>
                    <InternalZone authenticated={ authenticated } />
                    <Routes>
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                </Router>
            </div>
            <Footer />
        </div>
    )
}

interface InternalZoneProps {
    authenticated: boolean | undefined
}

const InternalZone: React.FC<InternalZoneProps> = ({ authenticated }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (authenticated) {
            if (window.location.pathname === REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN) {
                navigate(REQUEST_MAPPING.HOMEPAGE)
            }
            else {
                navigate(window.location.pathname)
            }
        }
        else if (authenticated === undefined) { // Waiting to be verified or auth status of VNPAY return URL
            navigate(window.location.pathname)
        }
        else {
            navigate(REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN)
        }
    }, [authenticated])

    if (!authenticated) {
        if (window.location.origin === "https://" + process.env.VITE_BASE_DOMAIN) {
            return (
                <Routes>
                    <Route path={REQUEST_MAPPING.PAY + REQUEST_PATH.PAY_RESULT} element={<PaymentResultPage/>}/>
                </Routes>
            )
        }
        return <></>
    }

    return (
        <NavbarContextProvider>
            <StickyNavbar />
            <HomePageContextProvider>
                <Routes>
                    <Route path={REQUEST_MAPPING.HOMEPAGE} element={<HomePage/>} />
                    <Route path={REQUEST_MAPPING.ITEM + REQUEST_PATH.ITEM_DETAILS} element={<ProductDetailsPage/>} />
                </Routes>
            </HomePageContextProvider>
            <CartContextProvider>
                <CheckoutContextProvider>
                    <Routes>
                        <Route path={REQUEST_MAPPING.CART} element={ <CartPage/> } />
                        <Route path={REQUEST_MAPPING.CHECKOUT} element={ <CheckoutPage
                            deliveryUnits={[
                                {
                                    name: 'SPX',
                                    price: 12.9,
                                },
                                {
                                    name: 'GHTK',
                                    price: 9.7,
                                }
                            ]}
                            paymentMethods={[
                                {
                                    name: 'COD',
                                    imageUrl: cod,
                                },
                                {
                                    name: 'Card',
                                    imageUrl: card,
                                }
                            ]}

                        /> } />
                        <Route path={REQUEST_MAPPING.PAY + REQUEST_PATH.PAY_RESULT} element={<PaymentResultPage/>} />
                    </Routes>
                </CheckoutContextProvider>
            </CartContextProvider>
        </NavbarContextProvider>
    )
}

const container = document.getElementById('root')
const root = container && createRoot(container)
root!.render(
    <QueryClientProvider client={ queryClient }>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </QueryClientProvider>
)
