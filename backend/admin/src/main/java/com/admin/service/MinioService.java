package com.admin.service;

import com.admin.dto.response.minio.EditFileResponse;
import com.admin.dto.response.minio.UploadFileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface MinioService {
    UploadFileResponse uploadFile(MultipartFile file, String uploadDir) throws Exception;
    EditFileResponse editFile(MultipartFile file, String newUploadDir, String oldPresignedPutUrl) throws Exception;
    void deleteFile (String presignedPutUrl) throws Exception;
}
