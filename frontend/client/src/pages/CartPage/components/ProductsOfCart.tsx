import React, {useEffect} from "react"
import bin from "assets/bin.png"
import {ProductsOfCartProps} from "pages/CartPage/types"

const ProductsOfCart: React.FC<ProductsOfCartProps> = (
    {
        itemsInCart,
        setSubtotal,
        setItemsInCart,
    }) => {

    const calcSubtotal = () => {
        let subtotal = 0
        itemsInCart.forEach((product, index) => subtotal += (product.price ?? 0) * itemsInCart[index].purchaseQuantity)
        return subtotal
    }
    const onQuantityInputChange = (index: number, value: number) => {
        const newItemsInCart = [...itemsInCart]
        newItemsInCart.splice(index, 1, {...itemsInCart[index], purchaseQuantity: value})
        setItemsInCart(newItemsInCart)
    }
    const onDeleteButtonClick = (index: number) => {
        const newItemsInCart = [...itemsInCart]
        newItemsInCart.splice(index, 1)
        setItemsInCart(newItemsInCart)
    }

    useEffect(() => {
        setSubtotal(calcSubtotal())
    }, [itemsInCart])

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
                    { itemsInCart.map((product, index) =>
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
                                       value={ product.purchaseQuantity }
                                       onChange={ (e) => onQuantityInputChange(index, Number(e.target.value)) }
                                />
                            </td>
                            <td className="text-blue-700">${ product.price }</td>
                            <td className="text-blue-700">
                                ${ ((product.price ?? 0) * product.purchaseQuantity).toFixed(1) }
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