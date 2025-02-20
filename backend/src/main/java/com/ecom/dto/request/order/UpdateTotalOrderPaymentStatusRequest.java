package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTotalOrderPaymentStatusRequest {
    private String totalOrderId;
    private Integer paymentStatus;
}
