export interface VnpayTransactionInfo {
    vnp_TransactionNo: string,
    vnp_TmnCode: string,
    vnp_TxnRef: string,
    vnp_Amount: number,
    vnp_ResponseCode: string,
    vnp_BankCode: string,
    vnp_BankTranNo: string,
    vnp_CardType: string,
    vnp_PayDate: string,
    vnp_TransactionStatus: string,
    vnp_SecureHash: string
}