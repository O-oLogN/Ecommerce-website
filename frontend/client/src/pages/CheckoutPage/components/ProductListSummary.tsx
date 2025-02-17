import {ProductListSummaryProps} from "pages/CheckoutPage/types"
import React from "react"

const ProductListSummary: React.FC<ProductListSummaryProps> = ({ products }) => {
    return (
        <>
            { products.map(product => (
                <div className="border-t border-b border-gray-200 justify-between flex ml-[70px] py-5">
                    <div className="flex">
                        <img src={ product.imageMinioGetUrl ?? '#' } alt="product-img" className="h-[70px] w-[70px]" />
                        <span className="ml-[20px] mt-[25px]">{ product.name }</span>
                    </div>
                    <span className="mt-[25px] mr-[40px] text-[0.85rem]">{ product.purchaseQuantity }x ${ (product.price ?? 0).toFixed(1) }</span>
                </div>
            )) }
        </>
    )
}

export default ProductListSummary