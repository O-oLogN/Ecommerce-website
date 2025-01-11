package com.client.service;

import com.client.dto.request.order.CreateTotalOrderRequest;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> deleteChildOrder(String orderId);
    ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception;
    ResponseEntity<?> createTotalOrder(CreateTotalOrderRequest createTotalOrderRequest) throws Exception;
}
