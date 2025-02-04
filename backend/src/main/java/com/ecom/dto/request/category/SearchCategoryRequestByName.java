package com.ecom.dto.request.category;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchCategoryRequestByName {
    private String categoryName;
}
