package com.ecom.dto.request.item;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateItemRequest {
    private String categoryId;
    private String name;
    private Float price;
    MultipartFile image;
    private Integer quantity;
}
