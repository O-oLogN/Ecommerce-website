package com.ecom.service;

import com.ecom.dto.request.cart.RemoveItemFromCartRequest;
import com.ecom.dto.request.cart.UpdateItemInCartRequest;
import org.springframework.http.ResponseEntity;

public interface CartService {
    ResponseEntity<?> updateItem(UpdateItemInCartRequest updateItemInCartRequest) throws Exception;
    ResponseEntity<?> removeItemFromCart(RemoveItemFromCartRequest removeItemFromCartRequest) throws Exception;
    ResponseEntity<?> getItems(String userId) throws Exception;
    ResponseEntity<?> clearCart(String userId) throws Exception;
}
