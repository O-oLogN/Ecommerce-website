package com.admin.helper;

import com.admin.model.ApiDataResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;

public class ResponseHelper {
    public static <T> ResponseEntity<Object> ok(@Nullable T body, HttpStatus status, String message) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(ApiDataResponse.builder().status(status.value()).message(message).data(body).build());
    }

    public static ResponseEntity<Object> error(@Nullable Exception ex) {
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(ApiDataResponse.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(ex != null ? ex.getMessage() : null)
                        .data(null)
                        .build()
                );
    }

    public static <T> ResponseEntity<Object> notFound(@Nullable T body, String message) {
        return ResponseEntity.status(HttpStatus.OK).body(ApiDataResponse
                .builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(message)
                .data(body)
                .build()
        );
    }

    public static <T> ResponseEntity<Object> unauthorized(@Nullable T body, String message) {
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiDataResponse
                .builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(message)
                .data(body)
                .build()
        );
    }
}
