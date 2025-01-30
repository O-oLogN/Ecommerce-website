package com.admin.dto.request.category;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCategoryRequest {
    private String categoryId;
    private String code;
    private String name;
}
