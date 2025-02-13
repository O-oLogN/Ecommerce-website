import React from "react"

export interface InputFieldProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    clss?: string
    type?: string
}

export interface DropdownProps {
    name: string
    options: string[]
    clss: string
}

export interface DeliveryUnitProps {
    name: string
    price: number
    selectedDeliveryUnit: string
    setSelectedDeliveryUnit: React.Dispatch<React.SetStateAction<string>>
}

export interface DeliveryProps {
    deliveryUnits: DeliveryUnitProps[]
    selectedDeliveryUnit: string
    setSelectedDeliveryUnit: React.Dispatch<React.SetStateAction<string>>
}

export interface LeftCheckoutPanelProps {
    deliveryUnits: DeliveryUnitProps[]
    selectedDeliveryUnit: string
    setSelectedDeliveryUnit: React.Dispatch<React.SetStateAction<string>>
}

export interface HeaderProps {
    name: string
}