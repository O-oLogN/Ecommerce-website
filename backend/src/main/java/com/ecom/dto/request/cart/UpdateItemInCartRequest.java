package com.ecom.dto.request.cart;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateItemInCartRequest {
    private String itemId;
    private String username;
    private Integer itemQuantity;
}
