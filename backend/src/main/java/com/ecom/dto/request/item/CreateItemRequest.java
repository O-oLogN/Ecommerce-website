package com.ecom.dto.request.item;

import lombok.*;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateItemRequest {
    private String name;
    private String categoryId;
    private Float price;
    private MultipartFile image;
    private Integer quantity;
    private Float rate;
    private Integer numberOfReviews;
    private List<String> highlightIds;
    private List<String> badgeIds;
}
