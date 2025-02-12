import React from "react"
import Description from "./Description.tsx"
import {ProductInfoProps} from "../../types"
import plusIcon from "assets/plus.png"
import minusIcon from "assets/minus.png"

const ProductInfo: React.FC<ProductInfoProps> = () => {
    const [isExpanding, setIsExpanding] = React.useState<boolean>(false)

    return (
        <div className="mt-[20px] mb-[20px]">
            <div className="flex justify-between">
                <span className="text-[0.95rem] text-gray-400">Product Information</span>
                { !isExpanding && <button className="p-[5px] ml-[5px] bg-white hover:bg-gray-800" onClick={ () => setIsExpanding(!isExpanding) }>
                    <img src={ plusIcon } className="h-3 w-3" alt="expand-icon"/>
                </button> }
                { isExpanding && <button className="p-[5px] ml-[5px] bg-white hover:bg-gray-800" onClick={ () => setIsExpanding(!isExpanding) }>
                    <img src={ minusIcon } className="h-3 w-3" alt="collapse-icon" />
                </button> }
            </div>
            { isExpanding ? <div className="flex mt-[40px]">
                <div className="mr-[120px]">
                    <Description title="Material" content="-"/>
                    <Description title="Country" content="-"/>
                    <Description title="Types" content="-"/>
                </div>
                <div>
                    <Description title="Weight" content="-"/>
                    <Description title="Dimensions" content="-"/>
                    <Description title="Water resistance" content="-"/>
                </div>
            </div>
            : '' }
        </div>
    )
}

export default ProductInfo