import {useCreateTotalOrder} from "services/order"

export interface PostPaymentContextProps {
    createTotalOrderHelper: ReturnType<typeof useCreateTotalOrder>
}