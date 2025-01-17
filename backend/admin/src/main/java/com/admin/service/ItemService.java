package com.admin.service;

import com.admin.dto.request.item.CreateItemRequest;
import com.admin.dto.request.item.SearchItemRequest;
import com.admin.dto.request.item.UpdateItemRequest;
import com.admin.model.QueryRequest;
import org.springframework.http.ResponseEntity;


public interface ItemService {
    ResponseEntity<?> searchItem(QueryRequest<SearchItemRequest> searchItemRequest);
    ResponseEntity<?> createItem(CreateItemRequest createItemRequest) throws Exception;
    ResponseEntity<?> updateItem(UpdateItemRequest request) throws Exception;
    ResponseEntity<?> deleteItem(String itemId) throws Exception;
}
