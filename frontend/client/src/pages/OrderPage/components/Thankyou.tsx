import { ThankyouProps } from "./types"
import React from "react"

const Thankyou: React.FC<ThankyouProps> = ({ email, number }) => {
    return (
        <div>
            <p>Thank you!</p>
            <p>Your order was placed successfully.</p>
            <p>We have sent the order confirmation details to <span>{ email }</span></p>
            <p>Order date: { new Date().toDateString() }</p>
            <p className="text-blue-500">Order number: { number } </p>
        </div>
    )
}

export default Thankyou