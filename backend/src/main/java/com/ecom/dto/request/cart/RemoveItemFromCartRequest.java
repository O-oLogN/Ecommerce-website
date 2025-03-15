package com.ecom.dto.request.cart;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RemoveItemFromCartRequest {
    private String itemId;
    private String userId;
}
