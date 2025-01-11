package com.client.service;

import com.client.dto.request.item.SearchItemRequest;
import com.client.model.QueryRequest;
import org.springframework.http.ResponseEntity;


public interface ItemService {
    ResponseEntity<?> searchItem(QueryRequest<SearchItemRequest> searchItemRequest);
}
