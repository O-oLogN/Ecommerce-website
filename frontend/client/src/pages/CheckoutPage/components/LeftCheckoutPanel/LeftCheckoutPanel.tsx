import ShippingAddress from "../ShippingAddress"
import Delivery from "pages/CheckoutPage/components/Delivery.tsx"
import { LeftCheckoutPanelProps } from "pages/CheckoutPage/types"
import Divider from "pages/ProductDetailsPage/components/LeftPanel/Divider.tsx"
import React from "react"

const LeftCheckoutPanel: React.FC<LeftCheckoutPanelProps> = ({ deliveryUnits, selectedDeliveryUnit, setSelectedDeliveryUnit }) => {
    return (
        <div>
            <ShippingAddress />
            <Divider />
            <Delivery
                deliveryUnits={ deliveryUnits }
                selectedDeliveryUnit={ selectedDeliveryUnit }
                setSelectedDeliveryUnit={ setSelectedDeliveryUnit }
            />
            <Divider />
            
        </div>
    )
}

export default LeftCheckoutPanel