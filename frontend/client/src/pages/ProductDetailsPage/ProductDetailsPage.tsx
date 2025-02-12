import {ProductDetailsProps} from "pages/ProductDetailsPage/types"
import React from "react"
import {useHomePageContext} from "pages/HomePage/hooks/HomePageContext.tsx"
import LeftPanel from "pages/ProductDetailsPage/components/LeftPanel/LeftPanel.tsx"
import ProductImage from "pages/ProductDetailsPage/components/ProductImage/ProductImage.tsx"
import RightPanel from "./components/RightPanel/RightPanel"

const ProductDetailsPage: React.FC<ProductDetailsProps> = () => {
    const {
        selectedProduct: product,
    } = useHomePageContext()

    return (
        <div className="flex">
            <LeftPanel product={ product } />
            <ProductImage imageUrl={ product && product.imageMinioGetUrl ? product.imageMinioGetUrl : '#' } />
            <RightPanel product={ product } />
        </div>
    )
}




export default ProductDetailsPage



