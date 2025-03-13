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
    private String vnpBillMobile;
    private String vnpBillEmail;
    private String vnpBillFirstName;
    private String vnpBillLastName;
    private String vnpBillAddress;
    private String vnpBillCity;
    private String vnpBillCountry;
    private String vnpBillState;
    private String vnpInvPhone;
    private String vnpInvEmail;
    private String vnpInvCustomer;
    private String vnpInvAddress;
    private String vnpInvCompany;
    private String vnpInvTaxCode;
    private String vnpInvType;
}
