package com.admin.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewItem {
    private String categoryId;
    private String name;
    private Float price;
    private String imageUrl;
    private Integer quantity;
}
