package com.ecom.entities;

import com.ecom.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "total_order")
public class TotalOrder {
    @Id
    @Size(max = 50)
    @Column(name = "total_order_id", nullable = false, length = 50)
    private String totalOrderId;

    @NotNull
    @JsonIgnore
    @Column(name = "payment_status", nullable = false)
    private Integer paymentStatus;
    @Transient
    @JsonProperty("paymentStatus")
    public String getPaymentStatusInText() {
        return this.paymentStatus.equals(CoreConstants.PAYMENT_STATUS.PAID) ? "PAID" : "UNPAID";
    }

    @Size(max = 50)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @NotNull
    @Column(name = "price", nullable = false)
    private Float price;

    @NotNull
    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    @Size(max = 100)
    @NotNull
    @Column(name = "create_user", nullable = false, length = 100)
    private String createUser;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "create_datetime", nullable = false)
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime createDatetime;

    @Size(max = 100)
    @Column(name = "modify_user", length = 100)
    private String modifyUser;

    @Column(name = "modify_datetime")
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime modifyDatetime;

    @OneToMany(mappedBy = "totalOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private Set<Order> orders;

    @NotNull
    @JsonIgnore
    @Column(name = "status", nullable = false)
    private Integer status;
    @Transient
    @JsonProperty("status")
    public String getStatusInText() {
        return (this.status.equals(CoreConstants.TOTAL_ORDER_STATUS.ACTIVE) ? "ACTIVE" : "INACTIVE" );
    }
}