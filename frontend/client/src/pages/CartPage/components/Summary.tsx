import {SummaryProps} from "pages/CartPage/types"
import React, {useEffect} from "react"
import Divider from "pages/ProductDetailsPage/components/LeftPanel/Divider.tsx"
import info from "assets/info.png"
import Hint from "pages/CartPage/components/Hint.tsx"
import {useNavigate} from "react-router-dom"
import {REQUEST_MAPPING} from "routes"

const Summary: React.FC<SummaryProps> = ({ name, subtotal, shippingFee, taxes, buttonName }) => {
    const navigate = useNavigate()
    const onClickGoToCheckoutButton = () => {
        navigate(REQUEST_MAPPING.CHECKOUT)
    }
    useEffect(() => {
        const subtotalHintIcon = document.querySelector('.subtotal-hint-icon')
        const subtotalHintInfo = document.querySelector('.subtotal-hint-info')
        subtotalHintIcon!.addEventListener('mouseenter', () => {
            (subtotalHintInfo! as HTMLElement).style.display = 'block'
        })

        subtotalHintIcon!.addEventListener('mouseleave', () => {
            (subtotalHintInfo! as HTMLElement).style.display = 'none'
        })
    }, [])

    return (
        <div className="text-left mt-[40px] ml-[70px] mr-[40px] w-[400px]">
            <p className="text-[2.5rem] font-semibold mb-[30px]">{ name }</p>
            <Divider />
            <div className="my-[20px]">
                <div className="flex mb-[10px] justify-between">
                    <div className="flex">
                        <span>Subtotal</span>
                        <div className="relative">
                            <img height={14} width={14} src={info} alt="hint" className="subtotal-hint-icon mt-[5px] ml-[3px]" />
                            <Hint content="Cart total excluding shipping and taxes." clss="subtotal-hint-info" />
                        </div>
                    </div>
                    <p>${ subtotal.toFixed(1) }</p>
                </div>
                <div className="flex mb-[10px] justify-between">
                    <span>Shipping</span>
                    <p>${ shippingFee.toFixed(1) }</p>
                </div>
                <div className="flex mb-[10px] justify-between">
                    <span>Taxes</span>
                    <p>${ taxes.toFixed(1) }</p>
                </div>
            </div>
            <Divider />
            <div className="flex justify-between my-[15px]">
                <span>Total</span>
                <p className="text-[1.2rem] font-semibold">${ (subtotal + shippingFee + taxes).toFixed(1) }</p>
            </div>
            <Divider />
            { buttonName && buttonName !== '' ? <button onClick={ onClickGoToCheckoutButton } className="text-center w-[400px] mt-[30px] bg-gray-800 py-2 hover:bg-light-gray">{ buttonName }</button> : '' }
        </div>
    )
}

export default Summary