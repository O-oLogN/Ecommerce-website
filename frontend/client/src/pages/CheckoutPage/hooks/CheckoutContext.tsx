import {createContext, useContext, useEffect, useState} from "react"
import {CheckoutContextProps} from "pages/CheckoutPage/types"
import {useGetIpAddress, useInitPayRequest} from "services/pay"
import {HttpStatusCode} from "axios"
import {useCreateTotalOrder, useSearchUserIdByUsername} from "services/order"

export const CheckoutContext = createContext<CheckoutContextProps>({
    initPayRequestHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false
    } as unknown as ReturnType<typeof useInitPayRequest>,
    createTotalOrderHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false
    } as unknown as ReturnType<typeof useCreateTotalOrder>,
    ipAddress: '',
    userId: '',
})

export const CheckoutContextProvider = ({ children }: { children: any }) => {
    const [ipAddress, setIpAddress] = useState<string>('')
    const [searchUserIdByUsernameRequest, setSearchUserIdByUsernameRequest] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const initPayRequestHelper = useInitPayRequest()
    const searchUserIdByUsernameResponse = useSearchUserIdByUsername(searchUserIdByUsernameRequest)
    const getIpAddressResponse = useGetIpAddress()
    const createTotalOrderHelper = useCreateTotalOrder()

    useEffect(() => {
        if (getIpAddressResponse.data && (getIpAddressResponse.data.status === HttpStatusCode.Ok || getIpAddressResponse.data.status === HttpStatusCode.Accepted)) {
            setIpAddress(getIpAddressResponse.data.data!)
        }
    }, [getIpAddressResponse])

    useEffect(() => {
        const getUserId = async() => {
            const response = await searchUserIdByUsernameResponse
            if (response && (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Accepted)) {
                setUserId(response.data ?? '')
            }
        }

        getUserId().then(() => {})
    }, [searchUserIdByUsernameResponse])

    const value = {
        initPayRequestHelper,
        createTotalOrderHelper,
        setSearchUserIdByUsernameRequest,
        ipAddress,
        userId,
    }

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckoutContext = () => useContext(CheckoutContext)