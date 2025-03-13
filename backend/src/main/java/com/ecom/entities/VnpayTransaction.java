package com.ecom.entities;

import com.ecom.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vnpay_transaction")
public class VnpayTransaction {
    @Id
    @Column(name = "vnp_transaction_no", nullable = false)
    private String vnp_TransactionNo;

    @NotNull
    @Column(name = "vnp_tmn_code", nullable = false)
    private String vnp_TmnCode;

    @NotNull
    @Column(name = "vnp_txn_ref", nullable = false)
    private String vnp_TxnRef;

    @NotNull
    @Column(name = "vnp_amount", nullable = false)
    private Long vnp_Amount;

    @NotNull
    @Column(name = "vnp_response_code", nullable = false)
    private String vnp_ResponseCode;

    @NotNull
    @Column(name = "vnp_bank_code", nullable = false)
    private String vnp_BankCode;

    @NotNull
    @Column(name = "vnp_bank_tran_no", nullable = false)
    private String vnp_BankTranNo;

    @NotNull
    @Column(name = "vnp_card_type", nullable = false)
    private String vnp_CardType;

    @NotNull
    @Column(name = "vnp_pay_date", nullable = false)
    private String vnp_PayDate;

    @NotNull
    @Column(name = "vnp_transaction_status", nullable = false)
    private String vnp_TransactionStatus;

    @NotNull
    @Column(name = "vnp_secure_hash", nullable = false)
    private String vnp_SecureHash;

    @Size(max = 50)
    @NotNull
    @Column(name = "create_user", nullable = false, length = 100)
    private String createUser;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "create_datetime", nullable = false)
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime createDatetime;

    @Size(max = 50)
    @Column(name = "modify_user", length = 50)
    private String modifyUser;

    @Column(name = "modify_datetime")
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime modifyDatetime;

    @Column(name = "vnp_bill_mobile")
    private String vnp_BillMobile;

    @Column(name = "vnp_bill_email")
    private String vnp_BillEmail;

    @Column(name = "vnp_bill_firstname")
    private String vnp_BillFirstName;

    @Column(name = "vnp_bill_lastname")
    private String vnp_BillLastName;

    @Column(name = "vnp_bill_address")
    private String vnp_BillAddress;

    @Column(name = "vnp_bill_city")
    private String vnp_BillCity;

    @Column(name = "vnp_bill_country")
    private String vnp_BillCountry;

    @Column(name = "vnp_bill_state")
    private String vnp_BillState;

    @Column(name = "vnp_inv_phone")
    private String vnp_InvPhone;

    @Column(name = "vnp_inv_email")
    private String vnp_InvEmail;

    @Column(name = "vnp_inv_customer")
    private String vnp_InvCustomer;

    @Column(name = "vnp_inv_address")
    private String vnp_InvAddress;

    @Column(name = "vnp_inv_company")
    private String vnp_InvCompany;

    @Column(name = "vnp_inv_taxcode")
    private String vnp_InvTaxCode;

    @Column(name = "vnp_inv_type")
    private String vnp_InvType;
}
