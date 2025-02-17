import { DeliveryProps } from "../types"
import React, {useEffect} from "react"
import DeliveryUnit from "pages/CheckoutPage/components/DeliveryUnit.tsx"
import Header from "pages/CheckoutPage/components/Header.tsx"

const Delivery: React.FC<DeliveryProps> = ({ deliveryUnits, setSelectedDeliveryUnit, status, setStatus }) => {
    const [selectedDeliveryUnit, saveSelectedDeliveryUnit] = React.useState<string>('')
    const onContinueToPaymentButtonClick = () => {
        if (selectedDeliveryUnit === '') return
        setStatus([status[0], true, status[2]])
    }

    useEffect(() => {
        if (status[0] && status[1] && status[2]) {
            setSelectedDeliveryUnit(selectedDeliveryUnit)
        }
    }, [status])

    return (
        <div>
            <Header name='Delivery'
                    sectionIndex={1}
                    status={ status }
                    setStatus={ setStatus }
            />
            { !status[1] && deliveryUnits.map(deliveryUnit =>
                <DeliveryUnit
                    name={ deliveryUnit.name }
                    price={ deliveryUnit.price }
                    selectedDeliveryUnit={ selectedDeliveryUnit }
                    setSelectedDeliveryUnit={ saveSelectedDeliveryUnit }
                />
            ) }
            { !status[1] && <button onClick={onContinueToPaymentButtonClick} className="w-[250px] mt-[40px] ml-[240px] p-2 mb-[40px] bg-gray-800 border border-white">
                Continue to Payment
            </button> }
        </div>
    )
}

export default Delivery