package com.ecom.dto.response.minio;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadFileResponse {
    private String presignedGetUrl;
    private String presignedPutUrl;
}
