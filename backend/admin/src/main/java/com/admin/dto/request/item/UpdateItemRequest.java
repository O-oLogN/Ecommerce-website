package com.admin.dto.request.item;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateItemRequest {
    private String itemId;
    private String categoryId;
    private String name;
    private Float price;
    private String imageUrl;
    private Integer quantity;
}
