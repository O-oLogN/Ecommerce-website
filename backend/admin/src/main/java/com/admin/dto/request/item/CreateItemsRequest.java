package com.admin.dto.request.item;

import com.admin.model.NewItem;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateItemsRequest {
    private List<NewItem> items;
}
