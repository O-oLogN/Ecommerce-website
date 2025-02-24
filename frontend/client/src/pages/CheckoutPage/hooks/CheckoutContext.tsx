import {createContext, useContext, useEffect, useState} from "react"
import {CheckoutContextProps} from "pages/CheckoutPage/types"
import {useGetIpAddress, useInitPayRequest} from "services/pay"
import {HttpStatusCode} from "axios"

export const CheckoutContext = createContext<CheckoutContextProps>({
    initPayRequestHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false
    } as unknown as ReturnType<typeof useInitPayRequest>,
    ipAddress: ''
})

export const CheckoutContextProvider = ({ children }: { children: any }) => {
    const [ipAddress, setIpAddress] = useState<string>('')
    const initPayRequestHelper = useInitPayRequest()
    const getIpAddressResponse = useGetIpAddress()

    useEffect(() => {
        if (getIpAddressResponse.data && (getIpAddressResponse.data.status === HttpStatusCode.Ok || getIpAddressResponse.data.status === HttpStatusCode.Accepted)) {
            setIpAddress(getIpAddressResponse.data.data!)
        }
    }, [getIpAddressResponse])

    const value = {
        initPayRequestHelper,
        ipAddress,
    }

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckoutContext = () => useContext(CheckoutContext)