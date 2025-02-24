import React, {useState} from "react"
import LeftCheckoutPanel from "pages/CheckoutPage/components/LeftCheckoutPanel/LeftCheckoutPanel.tsx"
import RightCheckoutPanel from "pages/CheckoutPage/components/RightCheckoutPanel/RightCheckoutPanel.tsx"
import {CheckoutPageProps, ShippingAddressFormProps} from "./types"
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx"
import {useCheckoutContext} from "pages/CheckoutPage/hooks/CheckoutContext.tsx"

const CheckoutPage: React.FC<CheckoutPageProps> = (
    {
        deliveryUnits,
        paymentMethods,
    }) => {

    const {
        itemsInCart: products,
    } = useNavbarContext()

    const {
        subtotal,
    } = useCartContext()

    const {
        initPayRequestHelper,
        ipAddress,
    } = useCheckoutContext()

    const [shippingAddressForm, setShippingAddressForm] = useState<ShippingAddressFormProps>({
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        country: '',
        email: '',
        company: '',
        city: '',
        stateProvince: '',
        phone: '',
    })
    const [selectedDeliveryUnit, setSelectedDeliveryUnit] = useState<string>('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')

    return (
        <div className="flex ml-[50px] justify-between">
            <LeftCheckoutPanel
                deliveryUnits={ deliveryUnits }
                paymentMethods={ paymentMethods }
                setShippingAddressForm={ setShippingAddressForm }
                setSelectedDeliveryUnit={ setSelectedDeliveryUnit }
                setSelectedPaymentMethod={ setSelectedPaymentMethod }
            />
            <RightCheckoutPanel
                products={ products }
                subtotal={ subtotal }
                shippingFee={ deliveryUnits.find(deliveryUnit => deliveryUnit.name === selectedDeliveryUnit)?.price ?? 0 }
                taxes={0}
                initPayRequestHelper={initPayRequestHelper}
                ipAddress={ipAddress}
            />
        </div>
    )
}

export default CheckoutPage