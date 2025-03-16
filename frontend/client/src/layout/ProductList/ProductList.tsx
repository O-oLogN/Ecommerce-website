import {ProductListProps} from "layout/Navbar/types"
import React, {useEffect, useState} from "react"
import ProductArray from "components/ProductArray/ProductArray.tsx"
import ProductCard from "components/ProductCard/ProductCard.tsx"
import {ItemInfo} from "types"

const ProductList: React.FC<ProductListProps> = (props) => {
    let { categories, products } = props
    const [productsMappedByCategories, setProductsMappedByCategories] = useState<ItemInfo[][]>(Array(categories.length).fill([]))

    useEffect(() => {
        let categoriesArrIndex = 0
        let productsArrIndex = 0
        let tmpProductsMappedByCategories: ItemInfo[][] = Array(categories.length).fill([])
        products = products.sort((a, b) => a.categoryId.localeCompare(b.categoryId))
        while (categoriesArrIndex < categories.length && productsArrIndex < products.length) {
            tmpProductsMappedByCategories[categoriesArrIndex].push(products[productsArrIndex])
            if ((productsArrIndex < products.length - 1 && products[productsArrIndex].categoryId !== products[productsArrIndex + 1].categoryId)
                || productsArrIndex === products.length - 1) {
                ++categoriesArrIndex
            }
            ++productsArrIndex
        }
        setProductsMappedByCategories(tmpProductsMappedByCategories)
    }, [products, categories])

    return (
        <>
            {categories && categories.length > 0 ? categories.map((category, index) => {
                return (
                    <ProductArray
                        categoryName={category.name}
                        productCards={productsMappedByCategories && productsMappedByCategories.length > 0 ?
                            productsMappedByCategories[index].map(product => {
                                return <ProductCard
                                    itemId={product.itemId}
                                    categoryId={product.categoryId}
                                    name={product.name}
                                    imageMinioGetUrl='https://next.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-server-testing.s3.us-east-1.amazonaws.com%2Fheadphones-nobg-1700675136219.png&w=1080&q=50'
                                    imageMinioPutUrl='https://next.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-server-testing.s3.us-east-1.amazonaws.com%2Fheadphones-nobg-1700675136219.png&w=1080&q=50'
                                    price={product.price ?? 0}
                                    highlights={product.highlights}
                                    badges={product.badges}
                                    quantity={product.quantity}
                                    rate={product.rate}
                                    numberOfReviews={product.numberOfReviews}
                                    setSelectedProduct={props.setSelectedProduct}
                                    createUser={product.createUser}
                                    createDatetime={product.createDatetime}
                                    modifyUser={product.modifyUser}
                                    modifyDatetime={product.modifyDatetime}
                                />}
                            )
                        : []}
                    />
                )
             })
            : ''}
        </>
    )
}

export default ProductList