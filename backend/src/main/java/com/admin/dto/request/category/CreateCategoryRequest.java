package com.admin.dto.request.category;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCategoryRequest {
    private String code;
    private String name;
}
