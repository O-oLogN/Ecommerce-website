import {ProductNameProps} from "components/types"
import React from "react"

const ProductName: React.FC<ProductNameProps> = ({ name, href }) => {
    return (
        <a
            href={ href }
            className="text-lg block font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
            { name }
        </a>
    )
}

export default ProductName