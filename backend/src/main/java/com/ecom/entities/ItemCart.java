package com.ecom.entities;

import com.ecom.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "item_cart")
public class ItemCart {
    @Id
    @Size(max = 50)
    @JsonIgnore
    @Column(name = "item_cart_id", nullable = false, length = 50)
    private String itemCartId;

    @Column(name = "item_quantity", nullable = false)
    private Integer itemQuantity;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
}
