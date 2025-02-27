import {createContext, useContext} from "react"
import {PostPaymentContextProps} from "pages/PaymentResultPage/types"
import {useCreateTotalOrder} from "services/order"

const PaymentResultContext = createContext<PostPaymentContextProps>({
    createTotalOrderHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateTotalOrder>,
})

export const PaymentResultContextProvider = ({ children }: { children: any }) => {
    const createTotalOrderHelper = useCreateTotalOrder()

    const value = {
        createTotalOrderHelper, // Redundant, now it's moved to navbar context
    }

    return (
        <PaymentResultContext.Provider value={value}>
            { children }
        </PaymentResultContext.Provider>
    )
}

export const usePaymentResultContext = () => useContext(PaymentResultContext)