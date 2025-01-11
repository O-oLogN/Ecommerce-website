package com.admin.dto.response.item;

import com.admin.entities.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ItemResponse {
    private int size;
    private List<Item> items;
}
