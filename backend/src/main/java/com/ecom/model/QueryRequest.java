package com.ecom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueryRequest<T> {
    private T sample;
    private PageInfo pageInfo;
    private List<OrderBy> orders;
}
