import Summary from "pages/CartPage/components/Summary.tsx"
import { InYourCartProps } from "../types"
import React from "react"
import ProductListSummary from "pages/CheckoutPage/components/ProductListSummary.tsx";

const InYourCart: React.FC<InYourCartProps> = ({ subtotal, shippingFee, taxes, products }) => {
    return (
        <div>
            <Summary
                name="In yout Cart"
                subtotal={ subtotal }
                shippingFee={ shippingFee }
                taxes={ taxes }
            />
            <ProductListSummary products={ products } />
            <button className="text-center w-[400px] mt-[30px] ml-[70px] bg-gray-800 py-2 hover:bg-light-gray">
                Go to Order
            </button>
        </div>
    )
}

export default InYourCart