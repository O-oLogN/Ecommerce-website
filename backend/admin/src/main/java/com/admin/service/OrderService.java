package com.admin.service;

import com.admin.dto.request.order.SearchTotalOrderRequest;
import com.admin.dto.request.order.UpdateOrderPaymentStatusRequest;
import com.admin.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> searchTotalOrder(QueryRequest<SearchTotalOrderRequest> searchTotalOrderRequest);
    ResponseEntity<?> deleteChildOrder(String orderId) throws Exception;
    ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception;
    ResponseEntity<?> updateOrderPaymentStatus(UpdateOrderPaymentStatusRequest updateOrderPaymentStatusRequest) throws Exception;
}
