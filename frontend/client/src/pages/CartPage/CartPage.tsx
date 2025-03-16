import ProductsOfCart from "pages/CartPage/components/ProductsOfCart.tsx"
import {CartPageProps} from "pages/CartPage/types"
import React from "react"
import Summary from "./components/Summary"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx"

const CartPage: React.FC<CartPageProps> = () => {
    const {
        subtotal,
        setSubtotal,
    } = useCartContext()

    return (
        <div className="flex">
            <ProductsOfCart
                setSubtotal={ setSubtotal }
            />
            <Summary
                name="Summary"
                subtotal={ subtotal }
                shippingFee={0}
                taxes={0}
                buttonName="Go to Checkout"
            />
        </div>
    )
}

export default CartPage