package com.admin.dto.request.item;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchItemRequest {
    private String itemName;
}
