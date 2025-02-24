import React from "react"
import {ItemInCart} from "types/ItemInCart"
import {useInitPayRequest} from "services/pay"

export interface CheckoutContextProps {
    initPayRequestHelper: ReturnType<typeof useInitPayRequest>
    ipAddress: string
}

export interface InputFieldProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    clss?: string
    type?: string
    style?: string
    defaultValue?: string
}

export interface DropdownProps {
    name: string
    label: string
    options: string[]
    clss: string
    style?: string
    defaultOption?: string
}

export interface DeliveryUnitProps {
    name: string
    price: number
    selectedDeliveryUnit?: string
    setSelectedDeliveryUnit?: React.Dispatch<React.SetStateAction<string>>
}

export interface DeliveryProps {
    deliveryUnits: DeliveryUnitProps[]
    setSelectedDeliveryUnit: React.Dispatch<React.SetStateAction<string>>
    status: boolean[]
    setStatus: React.Dispatch<React.SetStateAction<boolean[]>>
}

export interface LeftCheckoutPanelProps {
    deliveryUnits: DeliveryUnitProps[]
    paymentMethods: PaymentMethodProps[]
    setShippingAddressForm: React.Dispatch<React.SetStateAction<ShippingAddressFormProps>>
    setSelectedDeliveryUnit: React.Dispatch<React.SetStateAction<string>>
    setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>
}

export interface HeaderProps {
    name: string
    sectionIndex: number
    status: boolean[]
    setStatus: React.Dispatch<React.SetStateAction<boolean[]>>
}

export interface InYourCartProps {
    subtotal: number
    shippingFee: number
    taxes: number
    products: ItemInCart[]
    initPayRequestHelper: ReturnType<typeof useInitPayRequest>
    ipAddress: string
}

export interface ProductListSummaryProps {
    products: ItemInCart[]
}

export interface PaymentMethodProps {
    name: string
    imageUrl: string
    selectedPaymentMethod?: string
    setSelectedPaymentMethod?: React.Dispatch<React.SetStateAction<string>>
}

export interface PaymentProps {
    paymentMethods: PaymentMethodProps[]
    setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>
    status: boolean[]
    setStatus: React.Dispatch<React.SetStateAction<boolean[]>>
}

export interface RightCheckoutPanelProps {
    subtotal: number
    shippingFee: number
    taxes: number
    products: ItemInCart[]
    initPayRequestHelper: ReturnType<typeof useInitPayRequest>
    ipAddress: string
}

export interface CheckoutPageProps {
    deliveryUnits: DeliveryUnitProps[]
    paymentMethods: PaymentMethodProps[]
}

export interface ShippingAddressProps {
    status: boolean[]
    setStatus: React.Dispatch<React.SetStateAction<boolean[]>>
    setShippingAddressForm: React.Dispatch<React.SetStateAction<ShippingAddressFormProps>>
}

export interface ShippingAddressFormProps {
    firstName: string
    lastName: string
    address: string
    postalCode: string
    country: string
    email: string
    company: string
    city: string
    stateProvince: string
    phone: string
}