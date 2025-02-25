import { useNavbarContext } from "layout/Navbar/hooks/NavbarContext"

const PaymentSuccess = () => {
    const {
        orderNumber,
    } = useNavbarContext()

    return (
        <div>
            <p>Thank you!</p>
            <p>Your order was placed successfully.</p>
            <p>Order date: { new Date().toDateString() }</p>
            <p className="text-blue-500">Order number: { orderNumber } </p>
        </div>
    )
}

export default PaymentSuccess