import checked from "assets/checked.png"
import React from "react"
import {HeaderProps} from "pages/CheckoutPage/types"

const Header: React.FC<HeaderProps> = ({ name, status, sectionIndex, setStatus }) => {
    const onClickEditButton = () => {
        const newStatus = [...status]
        newStatus.splice(sectionIndex, status.length - sectionIndex, false)
        setStatus(newStatus)
    }
    return (
        <div className="flex mt-[20px] ml-[15px] text-[2.2rem] font-semibold justify-between">
            <div className="flex">
                <p>{ name }</p>
                { status ? status[sectionIndex] && <img src={ checked } alt="finish-icon" className="h-7 w-7 mt-[15px] ml-[10px]"/> : '' }
            </div>
            { status ? status[sectionIndex] && <button className="text-blue-500 text-[1.1rem] mr-[10px] mt-[5px] font-normal" onClick={ onClickEditButton }>
                Edit
            </button> : '' }
        </div>
    )
}

export default Header