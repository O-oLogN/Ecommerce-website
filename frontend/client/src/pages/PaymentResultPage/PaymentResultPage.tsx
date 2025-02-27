import {useEffect, useState} from "react"
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx"

const PaymentResultPage = () => {
    const [isTransactionSucceeded, setIsTransactionSucceeded] = useState<boolean | undefined>(undefined)

    const {
        orderCode,
    } = useNavbarContext()

    useEffect(() => {
        console.log(orderCode)
        const vnpTransactionQueryParamsStr = window.location.search
        const params: {key: string, value: string}[] = vnpTransactionQueryParamsStr.slice(1).split("&")
            .map(token => ({ key: token.split("=")[0], value: token.split("=")[1] }))
        for (let i = 0; i < params.length; ++i) {
            if (params[i].key === 'vnp_ResponseCode') {
                if (params[i].value === '00') {
                    setIsTransactionSucceeded(true)
                }
                else {
                    setIsTransactionSucceeded(false)
                }
                break
            }
        }
    }, [window.location.search])

    return (
        <div className="w-full ml-[500px] mt-[150px]">
            { isTransactionSucceeded &&
                <>
                    <p className="text-[3.2rem] font-semibold">Thank you!</p>
                    <p className="text-[2.2rem]">Your order was placed successfully.</p>
                </> }
            { !isTransactionSucceeded &&
                <>
                    <p className="text-[3.2rem] font-semibold">Payment failed!</p>
                    <p className="text-[2.2rem]">Your order has met problem successfully.</p>
                </> }

            <p className="text-[1.2rem] mt-[20px]">Order date: {new Date().toDateString()}</p>
            <p className="text-blue-500 mt-[5px]">Order code: { orderCode } </p>
        </div>
    )
}

export default PaymentResultPage