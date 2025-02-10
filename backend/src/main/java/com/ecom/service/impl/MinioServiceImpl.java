package com.ecom.service.impl;

import com.ecom.dto.response.minio.EditFileResponse;
import com.ecom.dto.response.minio.UploadFileResponse;
import com.ecom.service.MinioService;
import io.github.cdimascio.dotenv.Dotenv;
import io.minio.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Objects;
import java.util.UUID;

@Service
public class MinioServiceImpl implements MinioService {
    private final MinioClient minioClient;
    
    private final Dotenv dotenv = Dotenv.load();

    public MinioServiceImpl() throws Exception {
        minioClient = MinioClient.builder()
                .endpoint(Objects.requireNonNull(dotenv.get("MINIO_ENDPOINT")))
                .credentials(Objects.requireNonNull(dotenv.get("MINIO_ACCESS_KEY")), Objects.requireNonNull(dotenv.get("MINIO_SECRET_KEY")))
                .build();

        String bucketName = dotenv.get("MINIO_BUCKET_NAME");
        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
    }

    @Override
    public UploadFileResponse uploadFile(MultipartFile file, String uploadDir) throws Exception {
        String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File tempFile = File.createTempFile("temp-", uniqueFileName);
        file.transferTo(tempFile);

        String objectName = "upload/" + uploadDir + "/" + uniqueFileName;
        minioClient.uploadObject(
                UploadObjectArgs.builder()
                        .bucket(dotenv.get("MINIO_BUCKET_NAME"))
                        .object(objectName)
                        .filename(tempFile.getAbsolutePath())
                        .contentType(file.getContentType())
                        .build()
        );

        String publicGetAndPutUrl = getPublicUrl(objectName);

        return UploadFileResponse.builder()
                .presignedGetUrl(publicGetAndPutUrl)
                .presignedPutUrl(publicGetAndPutUrl)
                .build();
    }

    @Override
    public EditFileResponse editFile(MultipartFile file, String newUploadDir, String oldPresignedPutUrl) throws Exception {
        String objectName = getObjectName(oldPresignedPutUrl);

        this.removeObject(objectName);      // Remove old file

        UploadFileResponse uploadFileResponse = this.uploadFile(file, newUploadDir);
        return EditFileResponse.builder()
                .presignedGetUrl(uploadFileResponse.getPresignedGetUrl())
                .presignedPutUrl(uploadFileResponse.getPresignedPutUrl())
                .build();
    }

    @Override
    public void deleteFile(String presignedPutUrl) throws Exception {
        String objectName = getObjectName(presignedPutUrl);

        this.removeObject(objectName);
    }

    /*=========================================================PRIVATE FUNCTIONS===========================================================================================================================================================================*/
    private String getObjectName(String presignedPutUrl) throws URISyntaxException {
        URI uri = new URI(presignedPutUrl);
        String filePath = uri.getPath();
        return filePath.replaceFirst("/" + dotenv.get("MINIO_BUCKET_NAME") + "/", "");
    }

    private void removeObject(String objectName) throws Exception {
        minioClient.removeObject(
            RemoveObjectArgs.builder()
                    .bucket(dotenv.get("MINIO_BUCKET_NAME"))
                    .object(objectName)
                    .build()
        );
    }
    private String getPublicUrl(String objectName) {
        return dotenv.get("MINIO_ENDPOINT") + "/" + dotenv.get("MINIO_BUCKET_NAME") + "/" + objectName;
    }
}
