import Summary from "pages/CartPage/components/Summary.tsx"
import {InYourCartProps} from "../types"
import React, {useEffect} from "react"
import ProductListSummary from "pages/CheckoutPage/components/ProductListSummary.tsx"
import {HttpStatusCode} from "axios"
import {useCheckoutContext} from "../hooks/CheckoutContext"
import {getItemsFromLocalStorage} from "utils/LocalStorageUtils"
import {ItemInCart} from "types/ItemInCart"
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx"
import {getRandomString} from "utils/RandomUtils"

const InYourCart: React.FC<InYourCartProps> = (
    {
        subtotal,
        shippingFee,
        taxes,
        products,
    }) => {
    const {
        initPayRequestHelper,
        createTotalOrderHelper,
        ipAddress,
        userId,
    } = useCheckoutContext()

    const {
        setOrderCode,
    } = useNavbarContext()

    const {
        setSubtotal,
    } = useCartContext()

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

        if (userId && vnpayPaymentGatewayUrl) {
            const products = getItemsFromLocalStorage() as ItemInCart[]
            const randomOrderCode = getRandomString()
            const response = await createTotalOrderHelper.mutateAsync({
                userId: userId,
                orderCode: randomOrderCode,
                createChildOrderRequests: products.map(product => ({
                    itemId: product.itemId,
                    quantity: product.purchaseQuantity,
                }))
            })
            if (response && response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Accepted) {
                setOrderCode(randomOrderCode)
                window.location.replace(vnpayPaymentGatewayUrl)
                // window.location.replace("https://good-musical-joey.ngrok-free.app/user/pay/pay-result")
                // window.location.replace("/user/pay/pay-result")
            }
        }
    }
    const calcSubtotal = () => {
        let subtotal = 0
        const productsInCart = getItemsFromLocalStorage() as ItemInCart[]
        productsInCart.forEach((product, index) => subtotal += (product.price ?? 0) * productsInCart[index].purchaseQuantity)
        return subtotal
    }

    useEffect(() => {
        setSubtotal(calcSubtotal())
    }, [getItemsFromLocalStorage()])

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