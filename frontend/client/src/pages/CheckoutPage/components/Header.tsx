import checked from "assets/checked.png"
import React from "react"
import {HeaderProps} from "pages/CheckoutPage/types"

const Header: React.FC<HeaderProps> = ({ name }) => {
    return (
        <div className="flex">
            <p>{ name }</p>
            <img src={ checked } alt="finish-icon" />
        </div>
    )
}

export default Header