import { ProductImageProps } from "../../types"
import React from "react"

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => {
    return (
        <div className="mx-[50px] mt-[50px]">
            <img className="bg-light-gray" height="778" width="664" src={ imageUrl } alt="Product image" />
        </div>
    )
}

export default ProductImage