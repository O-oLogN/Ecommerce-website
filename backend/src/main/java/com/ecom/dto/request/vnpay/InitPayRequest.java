package com.ecom.dto.request.vnpay;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InitPayRequest {
    private String vnpLocale;
    private String vnpTxnRef;
    private String vnpOrderInfo;
    private Long vnpAmount;
    private String vnpIpAddr;
}
