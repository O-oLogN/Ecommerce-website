package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTotalOrderStatusRequest {
    private String totalOrderId;
    private Integer status;
}
