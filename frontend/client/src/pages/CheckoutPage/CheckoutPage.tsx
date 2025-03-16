import React, {useState} from "react"
import LeftCheckoutPanel from "pages/CheckoutPage/components/LeftCheckoutPanel/LeftCheckoutPanel.tsx"
import RightCheckoutPanel from "pages/CheckoutPage/components/RightCheckoutPanel/RightCheckoutPanel.tsx"
import {CheckoutPageProps, ShippingAddressFormProps} from "./types"
import {useCartContext} from "pages/CartPage/hooks/CartContext.tsx"

const CheckoutPage: React.FC<CheckoutPageProps> = (
    {
        deliveryUnits,
        paymentMethods,
    }) => {

    const {
        subtotal,
    } = useCartContext()

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
                subtotal={ subtotal }
                shippingFee={ deliveryUnits.find(deliveryUnit => deliveryUnit.name === selectedDeliveryUnit)?.price ?? 0 }
                taxes={0}
            />
        </div>
    )
}

export default CheckoutPage