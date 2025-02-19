package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeleteChildOrderRequest {
    private String totalOrderId;
    private String childOrderId;
}
