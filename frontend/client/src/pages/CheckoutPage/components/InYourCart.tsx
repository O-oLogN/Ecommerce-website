import Summary from "pages/CartPage/components/Summary.tsx"
import {InYourCartProps} from "../types"
import React, {useEffect} from "react"
import ProductListSummary from "pages/CheckoutPage/components/ProductListSummary.tsx"
import {HttpStatusCode} from "axios"
import {useCheckoutContext} from "../hooks/CheckoutContext"
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx"
import {getRandomString, getRandomVnpTxnRef} from "utils/RandomUtils"
import {useAppContext} from "hooks/AppContext"

const InYourCart: React.FC<InYourCartProps> = (
    {
        subtotal,
        shippingFee,
        taxes,
    }) => {

    const {
        itemsInCart,
    } = useAppContext()

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

        const vnpTxnRef = getRandomVnpTxnRef()
        const randomOrderCode = getRandomString()
        const vnpayPaymentGatewayUrl = await initPayRequestHelper.mutateAsync({
            vnpLocale: 'vn',
            vnpTxnRef: vnpTxnRef,
            vnpIpAddr: ipAddress,
            // vnpAmount: (subtotal + shippingFee + taxes) * 100,
            vnpAmount: 10000,
            vnpOrderInfo: "OrderCode " + randomOrderCode,
            vnpBillMobile: (document.querySelector(".phone-input") as unknown as HTMLInputElement).value,
            vnpBillEmail: (document.querySelector(".email-input") as unknown as HTMLInputElement).value,
            vnpBillFirstName: (document.querySelector(".first-name-input") as unknown as HTMLInputElement).value,
            vnpBillLastName: (document.querySelector(".last-name-input") as unknown as HTMLInputElement).value,
            vnpBillAddress: (document.querySelector(".address-input") as unknown as HTMLInputElement).value,
            vnpBillCity: (document.querySelector(".city-input") as unknown as HTMLInputElement).value,
            vnpBillCountry: "VN",
            vnpBillState: "",
            vnpInvPhone: "",
            vnpInvCustomer: "",
            vnpInvEmail: "",
            vnpInvAddress: "",
            vnpInvCompany: "",
            vnpInvTaxCode: "",
            vnpInvType: "",
        }).then(res => {
            if (res.status === HttpStatusCode.Ok || res.status === HttpStatusCode.Accepted) {
                return res.data
            }
            return ''
        })

        if (userId && vnpayPaymentGatewayUrl) {
            const response = await createTotalOrderHelper.mutateAsync({
                userId: userId,
                orderCode: randomOrderCode,
                vnpTxnRef: vnpTxnRef,
                createChildOrderRequests: itemsInCart.map(productInCart => ({
                    itemId: productInCart.item.itemId,
                    quantity: productInCart.itemQuantity,
                }))
            })
            if (response && response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Accepted) {
                setOrderCode(randomOrderCode)
                window.location.replace(vnpayPaymentGatewayUrl)
                // window.location.replace(process.env.VITE_BASE_DOMAIN)
                // window.location.replace("/user/pay/pay-result")
            }
        }
    }
    const calcSubtotal = () => {
        let subtotal = 0
        itemsInCart.forEach((productInCart, index) => subtotal += (productInCart.item.price ?? 0) * itemsInCart[index].itemQuantity)
        return subtotal
    }

    useEffect(() => {
        setSubtotal(calcSubtotal())
    }, [itemsInCart])

    return (
        <div>
            <Summary
                name="In yout Cart"
                subtotal={ subtotal }
                shippingFee={ shippingFee }
                taxes={ taxes }
            />
            <ProductListSummary products={ itemsInCart } />
            <button className="text-center w-[400px] mt-[30px] ml-[70px] bg-gray-800 py-2 hover:bg-light-gray"
                    onClick={ onClickGoToOrderButton }
            >
                Go to Order
            </button>
        </div>
    )
}

export default InYourCart