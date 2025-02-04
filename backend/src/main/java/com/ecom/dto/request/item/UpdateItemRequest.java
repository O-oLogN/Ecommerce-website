package com.ecom.dto.request.item;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateItemRequest {
    private String itemId;
    private String categoryId;
    private String name;
    private Float price;
    private Integer quantity;
    private MultipartFile image;
    private String imageMinioGetUrl;
    private String imageMinioPutUrl;
}
