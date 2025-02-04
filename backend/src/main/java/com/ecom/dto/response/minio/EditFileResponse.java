package com.ecom.dto.response.minio;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditFileResponse {
    private String presignedGetUrl;
    private String presignedPutUrl;
}
