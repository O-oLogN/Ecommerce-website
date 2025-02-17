import React from "react"
import {PaymentMethodProps} from "pages/CheckoutPage/types"

const PaymentMethod: React.FC<PaymentMethodProps> = ({ name, imageUrl, selectedPaymentMethod, setSelectedPaymentMethod }) => {
    return (
        <div className={`flex mt-[20px] ml-[10px] rounded-lg items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active border-ui-border-interactive ${ selectedPaymentMethod === name ? 'border-blue-700' : '' }`}
             onClick={ () => setSelectedPaymentMethod ? setSelectedPaymentMethod(name) : {} }
        >
            <span>{ name }</span>
            <img src={ imageUrl } alt={ name } />
        </div>
    )
}

export default PaymentMethod