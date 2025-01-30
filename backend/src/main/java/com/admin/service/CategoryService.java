package com.admin.service;

import com.admin.dto.request.category.CreateCategoryRequest;
import com.admin.dto.request.category.SearchCategoryRequestByName;
import com.admin.dto.request.category.UpdateCategoryRequest;
import com.admin.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface CategoryService {
    ResponseEntity<?> createCategory(CreateCategoryRequest createCategoryRequest) throws Exception;
    ResponseEntity<?> updateCategory(UpdateCategoryRequest updateCategoryRequest) throws Exception;
    ResponseEntity<?> searchCategoryByName(QueryRequest<SearchCategoryRequestByName> searchCategoryRequest);
    ResponseEntity<?> searchCategoryById(String categoryId) throws Exception;
    ResponseEntity<?> deleteCategory(String categoryId) throws Exception;
}
