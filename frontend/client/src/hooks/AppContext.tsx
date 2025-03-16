import {createContext, useContext, useEffect, useState} from "react"
import {AppContextProps} from "hooks/types"
import {useGetItemsInCart, useRemoveItemFromCart, useUpdateItemInCart, useVerifyToken} from "services"
import {HttpStatusCode} from "axios"
import {getItemFromLocalStorage} from "utils/LocalStorageUtils"
import { CartInfo } from "types"
import {IRemoveItemFromCartRequest, IUpdateItemInCartRequest} from "services/types"

export const AppContext = createContext<AppContextProps>({
    authenticated: undefined,
    itemsInCart: [],
    setAuthenticated: () => {},
    setUpdateItemInCartRequest: () => {},
    setRemoveItemFromCartRequest: () => {},
})

export const AppContextProvider = ({ children }: { children: any }) => {
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined)
    const [itemsInCart, setItemsInCart] = useState<CartInfo[]>([])
    const [updateItemInCartRequest, setUpdateItemInCartRequest] = useState<IUpdateItemInCartRequest | undefined>(undefined)
    const [removeItemFromCartRequest, setRemoveItemFromCartRequest] = useState<IRemoveItemFromCartRequest | undefined>(undefined)

    const verifyTokenMutation = useVerifyToken()
    const getItemsInCartMutation = useGetItemsInCart()
    const updateItemInCartMutation = useUpdateItemInCart()
    const removeItemFromCartMutation = useRemoveItemFromCart()

    useEffect(() => {                                    // Verify token
        const verifyToken = async () => {
            if (!authenticated && window.location.origin !== "https://" + process.env.VITE_BASE_DOMAIN) {
                try {
                    const verifyTokenResponse = await verifyTokenMutation.mutateAsync()
                    if (verifyTokenResponse.status === HttpStatusCode.Ok || verifyTokenResponse.status === HttpStatusCode.Accepted) {
                        setAuthenticated(true)
                    } else {
                        setAuthenticated(false)
                    }
                } catch (error) {
                    setAuthenticated(false)
                    console.log(error)
                }
            }
        }

        verifyToken().then(() => {})
    }, [authenticated])

    useEffect(() => {                                   // Get items in cart
        const getItemsInCart = async () => {
            const getItemsInCartResponse = await getItemsInCartMutation.mutateAsync(getItemFromLocalStorage("username") ?? '@')
            if (getItemsInCartResponse && (getItemsInCartResponse.status === HttpStatusCode.Ok || getItemsInCartResponse.status === HttpStatusCode.Accepted)) {
                setItemsInCart(getItemsInCartResponse.data!)
            }
        }

        getItemsInCart().then(() => {})
    }, [])

    useEffect(() => {                                   // Update item in cart
        const updateItemInCart = async () => {
            const updateItemInCartResponse = await updateItemInCartMutation.mutateAsync(updateItemInCartRequest!)
            if (updateItemInCartResponse && (updateItemInCartResponse.status === HttpStatusCode.Ok || updateItemInCartResponse.status === HttpStatusCode.Accepted)) {
                setItemsInCart(updateItemInCartResponse.data!)
            }
        }

        if (updateItemInCartRequest) {
            updateItemInCart().then(() => {})
        }
    }, [updateItemInCartRequest])

    useEffect(() => {                                   // Remove item from cart
        const removeItemFromCart = async () => {
            const removeItemFromCartResponse = await removeItemFromCartMutation.mutateAsync(removeItemFromCartRequest!)
            if (removeItemFromCartResponse && (removeItemFromCartResponse.status === HttpStatusCode.Ok || removeItemFromCartResponse.status === HttpStatusCode.Accepted)) {
                setItemsInCart(removeItemFromCartResponse.data!)
            }
        }

        if (removeItemFromCartRequest) {
            removeItemFromCart().then(() => {})
        }
    }, [removeItemFromCartRequest])

    const value = {
        authenticated,
        itemsInCart,
        setAuthenticated,
        setUpdateItemInCartRequest,
        setRemoveItemFromCartRequest,
    }

    return (
        <AppContext.Provider value={ value }>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}


