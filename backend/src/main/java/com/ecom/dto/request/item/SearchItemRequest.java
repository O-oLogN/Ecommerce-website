package com.ecom.dto.request.item;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchItemRequest {
    private String itemName;
}
