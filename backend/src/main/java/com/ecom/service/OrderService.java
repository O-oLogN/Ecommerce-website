package com.ecom.service;

import com.ecom.dto.request.order.DeleteChildOrderRequest;
import com.ecom.dto.request.order.UpdateOrderPaymentStatusRequest;
import com.ecom.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    ResponseEntity<?> searchTotalOrder(QueryRequest<String> searchTotalOrderRequest);
    ResponseEntity<?> searchChildOrders(String totalOrderId) throws Exception;
    ResponseEntity<?> deleteChildOrder(DeleteChildOrderRequest deleteChildOrderRequest) throws Exception;
    ResponseEntity<?> deleteTotalOrder(String totalOrderId) throws Exception;
    ResponseEntity<?> updateOrderPaymentStatus(UpdateOrderPaymentStatusRequest updateOrderPaymentStatusRequest) throws Exception;
}
