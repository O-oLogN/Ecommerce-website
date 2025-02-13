import { DeliveryUnitProps } from "../types"
import React from "react"

const DeliveryUnit: React.FC<DeliveryUnitProps> = ({ name, price, selectedDeliveryUnit, setSelectedDeliveryUnit }) => {
    return (
        <div className={`flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active border-ui-border-interactive ${ selectedDeliveryUnit === name ? 'border-blue-700' : '' }`}
            onClick={ () => setSelectedDeliveryUnit(name) }
        >
            <span>{ name }</span>
            <span>${ price.toFixed(1) }</span>
        </div>
    )
}

export default DeliveryUnit