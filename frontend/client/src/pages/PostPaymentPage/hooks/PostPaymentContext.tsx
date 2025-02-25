import {createContext, useContext} from "react"
import {PostPaymentContextProps} from "pages/PostPaymentPage/types"
import {useCreateTotalOrder} from "services/order"

const PostPaymentContext = createContext<PostPaymentContextProps>({
    createTotalOrderHelper: {
        mutate: () => {},
        isLoading: false,
        isSuccess: false,
    } as unknown as ReturnType<typeof useCreateTotalOrder>,
})

export const PostPaymentContextProvider = ({ children }: { children: any }) => {
    const createTotalOrderHelper = useCreateTotalOrder()

    const value = {
        createTotalOrderHelper,
    }

    return (
        <PostPaymentContext.Provider value={value}>
            { children }
        </PostPaymentContext.Provider>
    )
}

export const usePostPaymentContext = () => useContext(PostPaymentContext)