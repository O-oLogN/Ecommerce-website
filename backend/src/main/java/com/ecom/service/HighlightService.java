package com.ecom.service;

import org.springframework.http.ResponseEntity;

import com.ecom.dto.request.highlight.UpdateHighlightRequest;
import com.ecom.model.QueryRequest;

public interface HighlightService {
    ResponseEntity<?> createHighlight(String content) throws Exception;
    ResponseEntity<?> updateHighlight(UpdateHighlightRequest updateHighlightRequest) throws Exception;
    ResponseEntity<?> searchHighlight(QueryRequest<String> searchHighlightRequest);
    ResponseEntity<?> deleteHighlight(String highlightId) throws Exception;
}
