package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderPaymentStatusRequest {
    private String totalOrderId;
    private Integer paymentStatus;
}
