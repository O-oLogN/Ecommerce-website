import {ProductArrayProps} from "components/types"
import React from "react"

const ProductArray: React.FC<ProductArrayProps> = ({ categoryName, productCards }) => {
    const chunkArray = (arr: any[], chunkSize: number) => {
        const result = []
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize))
        }
        return result
    }

    const productChunks = chunkArray(productCards, 4)

    return (
        <div className="block">
            <ProductCategoryTitle categoryName={categoryName} />
            <div className="flex flex-wrap">
                {productChunks.map((chunk, index) => (
                    <div className="flex w-full" key={index}>
                        {chunk.map((productCard, idx) => (
                            <div key={idx} className="w-1/4 p-2">
                                {productCard}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const ProductCategoryTitle: React.FC<{ categoryName: string }> = ({ categoryName }) => {
    return (
        <p className="text-[2rem] font-bold ml-5 mt-[40px]">
            { categoryName }
        </p>
    )
}

export default ProductArray