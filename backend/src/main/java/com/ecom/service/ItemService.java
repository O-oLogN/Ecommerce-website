package com.ecom.service;

import com.ecom.dto.request.item.CreateItemRequest;
import com.ecom.dto.request.item.SearchItemRequest;
import com.ecom.dto.request.item.UpdateItemRequest;
import com.ecom.model.QueryRequest;
import org.springframework.http.ResponseEntity;


public interface ItemService {
    ResponseEntity<?> searchItem(QueryRequest<SearchItemRequest> searchItemRequest);
    ResponseEntity<?> createItem(CreateItemRequest createItemRequest) throws Exception;
    ResponseEntity<?> updateItem(UpdateItemRequest request) throws Exception;
    ResponseEntity<?> deleteItem(String itemId) throws Exception;
}
