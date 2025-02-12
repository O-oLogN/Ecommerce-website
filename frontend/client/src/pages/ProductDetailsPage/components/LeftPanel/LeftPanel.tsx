import Divider from "./Divider.tsx"
import ProductInfo from "./ProductInfo.tsx"
import ShippingAndReturns from "pages/ProductDetailsPage/components/LeftPanel/ShippingAndReturns.tsx"
import {LeftPanelProps} from "pages/ProductDetailsPage/types"
import React from "react"

const LeftPanel: React.FC<LeftPanelProps> = ({ product }) => {
    return (
        <div className="mt-[40px] ml-[40px] text-left w-[25%]">
            <p className="text-[1.5rem] text-gray-400 mb-[5px]">Latest drops</p>
            <p className="text-[2.55rem] font-semibold mb-[10px]">{ product ? product.name : '' }</p>
            <p className="text-gray-700 text-[0.9rem] mb-[25px]">Immerse in audio with the Audio Arrogance AuralElite Bluetooth headphones. Enjoy Active Noise Cancellation (ANC) for immersive experience. Indulge in flawless sound.</p>
            <Divider />
            <div className="text-[0.85rem]">
                <ProductInfo />
                <Divider />
                <ShippingAndReturns />
                <Divider />
            </div>
        </div>
    )
}

export default LeftPanel