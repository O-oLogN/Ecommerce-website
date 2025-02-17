import {PaymentProps} from "pages/CheckoutPage/types"
import React, {useEffect} from "react"
import PaymentMethod from "pages/CheckoutPage/components/PaymentMethod.tsx"
import Header from "pages/CheckoutPage/components/Header.tsx";

const Payment: React.FC<PaymentProps> = (
    {
        paymentMethods,
        setSelectedPaymentMethod,
        status,
        setStatus,
    }) => {
    const [selectedPaymentMethod, saveSelectedPaymentMethod] = React.useState<string>('')
    const onGoToReviewButtonClick = () => {
        if (selectedPaymentMethod === '') return
        setStatus([status[0], status[1], true])
    }

    useEffect(() => {
        if (status[0] && status[1] && status[2]) {
            setSelectedPaymentMethod(selectedPaymentMethod)
        }
    }, [status])

    return (
        <div>
            <Header
                name='Payment'
                sectionIndex={2}
                status={ status }
                setStatus={ setStatus }
            />
            { !status[2] && paymentMethods.map(paymentMethod =>
                <PaymentMethod
                    name={ paymentMethod.name }
                    imageUrl={ paymentMethod.imageUrl }
                    selectedPaymentMethod={ selectedPaymentMethod }
                    setSelectedPaymentMethod={ saveSelectedPaymentMethod }
                />
            ) }
            { !status[2] && <button onClick={onGoToReviewButtonClick} className="w-[250px] mt-[40px] ml-[240px] p-2 mb-[40px] bg-gray-800 border border-white">
                Go to Review
            </button> }
        </div>
    )
}

export default Payment