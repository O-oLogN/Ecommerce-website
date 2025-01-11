package com.admin.dto.response.category;

import com.admin.entities.ItemCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ItemCategoryResponse {
    private int size;
    private List<ItemCategory> categories;
}
