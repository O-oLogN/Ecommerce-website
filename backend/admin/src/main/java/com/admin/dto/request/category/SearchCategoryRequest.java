package com.admin.dto.request.category;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchCategoryRequest {
    private String keyword;
}
