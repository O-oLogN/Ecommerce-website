package com.ecom.dto.request.badge;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBadgeRequest {
    private String badgeId;
    private MultipartFile icon;
    private String iconMinioGetUrl;
    private String iconMinioPutUrl;
    private String description;  
}
