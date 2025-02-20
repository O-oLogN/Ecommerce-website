package com.ecom.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateChildOrderRequest {
    private String itemId;
    private Integer quantity;
}
