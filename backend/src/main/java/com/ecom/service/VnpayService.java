package com.ecom.service;

import com.ecom.dto.request.vnpay.InitPayRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface VnpayService {
    ResponseEntity<?> initPayRequest(InitPayRequest initPayRequest) throws Exception;
    ResponseEntity<?> getRequestIpAddress(HttpServletRequest request);
}
