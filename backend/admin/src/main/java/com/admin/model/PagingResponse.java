package com.admin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagingResponse<T> {
    private int pageNumber;
    private int pageSize;
    private int totalPages;
    private int numberOfElements;
    private long totalElements;
    private List<T> content;
}
