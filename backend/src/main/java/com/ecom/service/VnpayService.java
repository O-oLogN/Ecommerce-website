package com.ecom.service;

import com.ecom.dto.request.vnpay.InitPayRequest;
import com.ecom.entities.VnpayTransaction;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface VnpayService {
    ResponseEntity<?> initPayRequest(InitPayRequest initPayRequest) throws Exception;
    ResponseEntity<?> getRequestIpAddress(HttpServletRequest request);
    ResponseEntity<?> getVnpayTransaction(String vnp_TransactionNo) throws Exception;
    void saveVnpayTransaction(VnpayTransaction vnpayTransaction) throws Exception;
}
