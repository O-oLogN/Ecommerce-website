package com.ecom.service;

import org.springframework.http.ResponseEntity;

import com.ecom.dto.request.badge.CreateBadgeRequest;
import com.ecom.dto.request.badge.UpdateBadgeRequest;
import com.ecom.model.QueryRequest;

public interface BadgeService {
    ResponseEntity<?> createBadge(CreateBadgeRequest createBadgeRequest) throws Exception;
    ResponseEntity<?> updateBadge(UpdateBadgeRequest updateBadgeRequest) throws Exception;
    ResponseEntity<?> searchBadge(QueryRequest<String> searchBadgeRequest);
    ResponseEntity<?> deleteBadge(String badgeId) throws Exception;
}
