import {useEffect, useState} from "react"
import {useGetVnpayTransaction} from "services/pay"
import {HttpStatusCode} from "axios"
import {VnpayTransactionInfo} from "types"
import {deleteItemFromLocalStorage} from "utils/LocalStorageUtils"

interface PaymentResult {
    isSuccess: boolean | undefined,
    createTime: string,
    orderCode: string
}

const PaymentResultPage = () => {
    const [paymentResult, setPaymentResult] = useState<PaymentResult>({
        isSuccess: undefined,
        createTime: '',
        orderCode: '',
    })

    const getVnpayTransaction = useGetVnpayTransaction()

    useEffect(() => {
       const postPaymentProcess = async() => {
            const vnpTransactionQueryParamsStr = window.location.search
            const params: { key: string, value: string }[] = vnpTransactionQueryParamsStr.slice(1).split("&")
                .map(token => ({key: token.split("=")[0], value: token.split("=")[1]}))

           const now = new Date()
           const hours = (now.getHours() < 10 ? '0' : '') + now.getHours()
           const minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
           const seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds()
           const date = (now.getDate() < 10 ? '0' + now.getDate() : now.getDate()).toString()
           const month = (now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)).toString()
           const year = now.getFullYear().toString()
           const createTime = date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds

           let isSuccess: boolean | undefined = undefined
           let orderCode: string = ''

           for (let i = 0; i < params.length; ++i) {
                if (params[i].key === 'vnp_TransactionNo') {
                    const response = await getVnpayTransaction.mutateAsync(params[i].value)
                    if (response && (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Accepted)) {
                        const vnpayTransaction = response.data as VnpayTransactionInfo
                        if (vnpayTransaction.vnp_TransactionStatus === "00") {
                            isSuccess = true
                        }
                    }
                }
                else if (params[i].key === 'vnp_OrderInfo') {   // OrderCode+{code}
                   orderCode = params[i].value.split("+")[1]
                }
           }
           if (isSuccess) {
               deleteItemFromLocalStorage("cartItems")
           }

           setPaymentResult({
               isSuccess,
               createTime,
               orderCode,
           })
        }

        postPaymentProcess().then(() => {})

    }, [window.location.search])

    return (
        <div className="w-full ml-[500px] mt-[150px]">
            { paymentResult.isSuccess &&
                <>
                    <p className="text-[3.2rem] font-semibold">Thank you!</p>
                    <p className="text-[2.2rem]">Your order was placed successfully.</p>
                </> }
            { !paymentResult.isSuccess &&
                <>
                    <p className="text-[3.2rem] font-semibold">Payment failed!</p>
                    <p className="text-[2.2rem]">Your order has met problem successfully.</p>
                </> }

            <p className="text-[1.2rem] mt-[20px]">Order time: { paymentResult.createTime }</p>
            <p className="text-blue-500 mt-[5px]">Order code: { paymentResult.orderCode } </p>
        </div>
    )
}

export default PaymentResultPage