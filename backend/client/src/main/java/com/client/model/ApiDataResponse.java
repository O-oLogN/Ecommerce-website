package com.client.model;

import com.client.constant.CoreConstants;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiDataResponse<T> {

    private int status;

    @Builder.Default
    @JsonFormat(pattern = CoreConstants.DateTimePattern.FORMAT_24H)
    private LocalDateTime timestamp = LocalDateTime.now();

    private String message;

    private T data;
}