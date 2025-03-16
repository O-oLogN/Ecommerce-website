import React, {useEffect} from "react"
import bin from "assets/bin.png"
import {ProductsOfCartProps} from "pages/CartPage/types"
import {getItemFromLocalStorage} from "utils/LocalStorageUtils"
import {useAppContext} from "hooks/AppContext.tsx"

const ProductsOfCart: React.FC<ProductsOfCartProps> = ({ setSubtotal }) => {
    const {
        itemsInCart,
        setUpdateItemInCartRequest,
        setRemoveItemFromCartRequest,
    } = useAppContext()

    const calcSubtotal = () => {
        let subtotal = 0
        itemsInCart.forEach((product, index) => subtotal += (product.item.price ?? 0) * itemsInCart[index].itemQuantity)
        return subtotal
    }
    const onQuantityInputChange = (index: number, value: number) => {
        setUpdateItemInCartRequest({
            username: getItemFromLocalStorage("username") ?? '@',
            itemId: itemsInCart[index].item.itemId,
            itemQuantity: value
        })
    }
    const onDeleteButtonClick = (index: number) => {
        setRemoveItemFromCartRequest({
            username: getItemFromLocalStorage("username") ?? '@',
            itemId: itemsInCart[index].item.itemId,
        })
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
                    { itemsInCart.map((productInCart, index) =>
                        <tr className="border-b">
                            <td>
                                <img className="bg-light-gray my-[5px]" height={110} width={110} src={ 'https://next.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-server-testing.s3.us-east-1.amazonaws.com%2Fheadphones-nobg-1700675136219.png&w=1080&q=50' } alt={ "Product " + index}/>
                            </td>
                            <td>{ productInCart.item.name }</td>
                            <td>
                                <input type="number"
                                       className="text-center w-[50px] bg-transparent border rounded-[5px]"
                                       min={ Math.min(1, productInCart.item.quantity) }
                                       max={ productInCart.item.quantity }
                                       value={ productInCart.itemQuantity }
                                       onChange={ (e) => onQuantityInputChange(index, Number(e.target.value)) }
                                />
                            </td>
                            <td className="text-blue-700">${ productInCart.item.price }</td>
                            <td className="text-blue-700">
                                ${ ((productInCart.item.price ?? 0) * productInCart.itemQuantity).toFixed(1) }
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