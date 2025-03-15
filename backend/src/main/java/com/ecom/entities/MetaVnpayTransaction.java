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
@Table(name = "meta_vnpay_transaction")
public class MetaVnpayTransaction {
    @Id
    @Column(name = "meta_vnpay_transaction_id", nullable = false)
    private String metaVnpayTransactionId;

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

    @Column(name = "vnp_txn_ref")
    private String vnp_TxnRef;

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
}
