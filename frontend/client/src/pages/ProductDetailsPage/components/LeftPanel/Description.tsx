import {DescriptionProps} from "pages/ProductDetailsPage/types"
import React from "react"

const Description: React.FC<DescriptionProps> = ({ title, content }) => {
    return (
        <div className="text-left text-[0.85rem] font-bold mb-[20px]">
            <p>{ title }</p>
            <p>{ content }</p>
        </div>
    )
}

export default Description