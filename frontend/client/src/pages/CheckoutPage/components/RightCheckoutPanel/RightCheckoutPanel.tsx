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
        products,
        initPayRequestHelper,
        ipAddress,
    }) => {
    return (
        <div>
            <InYourCart
                subtotal={ subtotal }
                shippingFee={ shippingFee }
                taxes={ taxes }
                products={ products }
                initPayRequestHelper={ initPayRequestHelper }
                ipAddress={ ipAddress }
            />
        </div>
    )
}

export default RightCheckoutPanel


