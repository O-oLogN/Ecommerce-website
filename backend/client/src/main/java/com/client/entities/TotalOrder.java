package com.client.entities;

import com.client.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
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
@Table(name = "total_order")
public class TotalOrder {
    @Id
    @Size(max = 50)
    @Column(name = "total_order_id", nullable = false, length = 50)
    private String totalOrderId;

    @NotNull
    @Column(name = "payment_status", nullable = false)
    private Integer paymentStatus;

    @Size(max = 50)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @NotNull
    @Column(name = "price", nullable = false)
    private Float price;

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

}