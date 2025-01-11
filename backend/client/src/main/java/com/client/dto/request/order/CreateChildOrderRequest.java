package com.client.dto.request.order;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateChildOrderRequest {
    private String userId;
    private String itemId;
    private String parentId;
    private Integer quantity;
}
