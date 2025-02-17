import ShippingAddress from "../ShippingAddress"
import Delivery from "pages/CheckoutPage/components/Delivery.tsx"
import { LeftCheckoutPanelProps } from "pages/CheckoutPage/types"
import Divider from "pages/ProductDetailsPage/components/LeftPanel/Divider.tsx"
import React from "react"
import Payment from "../Payment"

const LeftCheckoutPanel: React.FC<LeftCheckoutPanelProps> = (
    {
        deliveryUnits,
        paymentMethods,
        setShippingAddressForm,
        setSelectedDeliveryUnit,
        setSelectedPaymentMethod,
    }) => {
    const [status, setStatus] = React.useState<boolean[]>([false, false, false])
    return (
        <div>
            <ShippingAddress
                status={ status }
                setStatus={ setStatus }
                setShippingAddressForm={ setShippingAddressForm }
            />
            <Divider />
            <Delivery
                deliveryUnits={ deliveryUnits }
                setSelectedDeliveryUnit={ setSelectedDeliveryUnit }
                status={ status }
                setStatus={ setStatus }
            />
            <Divider />
            <Payment
                paymentMethods={ paymentMethods }
                setSelectedPaymentMethod={ setSelectedPaymentMethod }
                status={ status }
                setStatus={ setStatus }
            />
            <Divider />
            
        </div>
    )
}

export default LeftCheckoutPanel