package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchTotalOrderRequest {
    private String totalOrderId;
}
