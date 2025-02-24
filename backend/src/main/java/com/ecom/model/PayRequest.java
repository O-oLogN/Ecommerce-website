package com.ecom.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayRequest {
    private String vnpVersion;
    private String vnpCommand;
    private String vnpTmnCode;
    private String vnpBankCode;
    private String vnpLocale;
    private String vnpCurrCode;
    private String vnpTxnRef;
    private String vnpOrderInfo;
    private String vnpOrderType;
    private Long vnpAmount;
    private String vnpReturnUrl;
    private String vnpIpAddr;
    private Long vnpCreateDate;
    private Long vnpExpireDate;
    private String vnpSecureHash;
}
