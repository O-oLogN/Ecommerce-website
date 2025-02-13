import {ProductsOfCartProps} from "pages/CartPage/types"
import React, {useEffect, useState} from "react"
import bin from "assets/bin.png"

const ProductsOfCart: React.FC<ProductsOfCartProps> = ({ products, setSubtotal }) => {
    const [productQuantitiesArr, setProductQuantitiesArr] = useState<number[]>(Array(products.length).fill(0))
    const calcSubtotal = () => {
        let subtotal = 0
        products.forEach((product, index) => subtotal += (product.price ?? 0) * productQuantitiesArr[index])
        return subtotal
    }
    const onQuantityInputChange = (index: number, value: number) => {
        const newProductQuantitiesArr = [...productQuantitiesArr]
        newProductQuantitiesArr[index] = value
        setProductQuantitiesArr(newProductQuantitiesArr)
    }
    const onDeleteButtonClick = (index: number) => {
        products.splice(index, 1)
        const newProductQuantitiesArr = [...productQuantitiesArr]
        newProductQuantitiesArr.splice(index, 1)
        setProductQuantitiesArr(newProductQuantitiesArr)
    }

    useEffect(() => {
        setSubtotal(calcSubtotal())
    }, [productQuantitiesArr])

    return (
        <div className="text-left mt-[40px] ml-[20px]">
            <p className="text-[2.5rem] font-semibold">Cart</p>
            <table className="mt-[20px]">
                <thead className="border-b">
                    <tr className="text-gray-500 text-[0.9rem]">
                        <th className="p-3">Item</th>
                        <th className="w-[400px]"></th>
                        <th className="w-[200px]">Quantity</th>
                        <th className="w-[200px]">Price</th>
                        <th className="w-[150px]">Total</th>
                        <th className="w-[30px]"></th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) =>
                        <tr className="border-b">
                            <td>
                                <img className="bg-light-gray my-[5px]" height={110} width={110} src={ 'https://next.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-server-testing.s3.us-east-1.amazonaws.com%2Fheadphones-nobg-1700675136219.png&w=1080&q=50' } alt={ "Product " + index}/>
                            </td>
                            <td>{ product.name }</td>
                            <td>
                                <input type="number"
                                       className="text-center w-[50px] bg-transparent border rounded-[5px]"
                                       min={ Math.min(1, product.quantity) }
                                       max={ product.quantity }
                                       value={ productQuantitiesArr[index] }
                                       onChange={ (e) => onQuantityInputChange(index, Number(e.target.value)) }
                                />
                            </td>
                            <td className="text-blue-700">${ product.price }</td>
                            <td className="text-blue-700">
                                ${ ((product.price ?? 0) * productQuantitiesArr[index]).toFixed(1) }
                            </td>
                            <td>
                                <button
                                    className="bg-transparent h-7 w-7 hover:bg-gray-600 p-[5px]"
                                    onClick={ () => onDeleteButtonClick(index) }
                                >
                                    <img src={ bin } alt="Delete-icon" />
                                </button>
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsOfCart