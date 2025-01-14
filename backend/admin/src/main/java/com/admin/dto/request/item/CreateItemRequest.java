package com.admin.dto.request.item;

import com.admin.model.NewItem;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateItemRequest {
    private NewItem newItem;
}
