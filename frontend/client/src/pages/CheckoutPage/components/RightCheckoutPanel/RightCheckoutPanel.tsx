import {
    RightCheckoutPanelProps,
} from "pages/CheckoutPage/types"
import React from "react"
import InYourCart from "pages/CheckoutPage/components/InYourCart.tsx"

const RightCheckoutPanel: React.FC<RightCheckoutPanelProps> = (
    {
        subtotal,
        shippingFee,
        taxes,
    }) => {
    return (
        <div>
            <InYourCart
                subtotal={ subtotal }
                shippingFee={ shippingFee }
                taxes={ taxes }
            />
        </div>
    )
}

export default RightCheckoutPanel


