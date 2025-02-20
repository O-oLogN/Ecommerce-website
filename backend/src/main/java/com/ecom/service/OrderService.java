package com.ecom.service;

import com.ecom.dto.request.order.CreateTotalOrderRequest;
import com.ecom.dto.request.order.DeleteChildOrderRequest;
import com.ecom.dto.request.order.UpdateTotalOrderPaymentStatusRequest;
import com.ecom.dto.request.order.UpdateTotalOrderStatusRequest;
import com.ecom.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> searchTotalOrder(QueryRequest<String> searchTotalOrderRequest);
    ResponseEntity<?> searchChildOrders(String totalOrderId) throws Exception;
    ResponseEntity<?> createTotalOrder(CreateTotalOrderRequest createTotalOrderRequest, String role);
    ResponseEntity<?> deleteChildOrder(DeleteChildOrderRequest deleteChildOrderRequest, String role) throws Exception;
    ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception;
    ResponseEntity<?> updateOrderPaymentStatus(UpdateTotalOrderPaymentStatusRequest updateTotalOrderPaymentStatusRequest, String role) throws Exception;
    ResponseEntity<?> updateTotalOrderStatus(UpdateTotalOrderStatusRequest updateTotalOrderStatusRequest) throws Exception;
}
