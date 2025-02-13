import ProductsOfCart from "pages/CartPage/components/ProductsOfCart.tsx"
import {CartPageProps} from "pages/CartPage/types"
import React from "react"
import Summary from "./components/Summary"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx";
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx";

const CartPage: React.FC<CartPageProps> = () => {
    const {
        itemsInCart: products,
    } = useNavbarContext()
    const {
        subtotal,
        setSubtotal,
    } = useCartContext()

    return (
        <div className="flex">
            <ProductsOfCart
                products={ products }
                setSubtotal={ setSubtotal }
            />
            <Summary
                subtotal={ subtotal }
                shippingFee={0}
                taxes={0}
            />
        </div>
    )
}

export default CartPage