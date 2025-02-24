package com.ecom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VnpayTransaction {
    private String vnpTransactionId;
    private String vnpTmnCode;
    private String vpnTxnRef;
    private Long vnpAmount;
    private String vnpOrderInfo;
    private String vnpResponseCode;
    private String vnpBankCode;
    private String vnpBankTranNo;
    private String vnpCardType;
    private Long vnpPayDate;
    private Long vnpTransactionNo;
    private Integer vnpTransactionStatus;
    private String vnpSecureHash;
}
