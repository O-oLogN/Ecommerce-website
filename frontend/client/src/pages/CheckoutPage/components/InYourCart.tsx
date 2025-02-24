import Summary from "pages/CartPage/components/Summary.tsx"
import { InYourCartProps } from "../types"
import React from "react"
import ProductListSummary from "pages/CheckoutPage/components/ProductListSummary.tsx"
import { HttpStatusCode } from "axios"

const InYourCart: React.FC<InYourCartProps> = (
    {
        subtotal,
        shippingFee,
        taxes,
        products,
        initPayRequestHelper,
        ipAddress,
    }) => {
    const onClickGoToOrderButton = async() => {
        const now = new Date()
        const date = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()).toString()
        const month = (now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)).toString()
        const year = now.getFullYear().toString()
        const vnpayPaymentGatewayUrl = await initPayRequestHelper.mutateAsync({
            vnpLocale: 'vn',
            vnpIpAddr: ipAddress,
            // vnpAmount: (subtotal + shippingFee + taxes) * 100,
            vnpAmount: 100000,
            vnpOrderInfo: 'Order created - ' + date + "/" + month + "/" + year,
        }).then(res => {
            if (res.status === HttpStatusCode.Ok || res.status === HttpStatusCode.Accepted) {
                return res.data
            }
            return ''
        })

        window.location.replace(vnpayPaymentGatewayUrl ?? '#')
    }

    return (
        <div>
            <Summary
                name="In yout Cart"
                subtotal={ subtotal }
                shippingFee={ shippingFee }
                taxes={ taxes }
            />
            <ProductListSummary products={ products } />
            <button className="text-center w-[400px] mt-[30px] ml-[70px] bg-gray-800 py-2 hover:bg-light-gray"
                    onClick={ onClickGoToOrderButton }
            >
                Go to Order
            </button>
        </div>
    )
}

export default InYourCart