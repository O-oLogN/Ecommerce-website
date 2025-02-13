import { DeliveryProps } from "../types"
import React from "react"
import DeliveryUnit from "pages/CheckoutPage/components/DeliveryUnit.tsx"
import Header from "pages/CheckoutPage/components/Header.tsx"

const Delivery: React.FC<DeliveryProps> = ({ deliveryUnits, selectedDeliveryUnit, setSelectedDeliveryUnit }) => {
    return (
        <div>
            <Header name='Delivery' />
            { deliveryUnits.map(deliveryUnit =>
                <DeliveryUnit
                    name={ deliveryUnit.name }
                    price={ deliveryUnit.price }
                    selectedDeliveryUnit={ selectedDeliveryUnit }
                    setSelectedDeliveryUnit={ setSelectedDeliveryUnit }
                />
            ) }
            <button>
                Continue to Payment
            </button>
        </div>
    )
}

export default Delivery