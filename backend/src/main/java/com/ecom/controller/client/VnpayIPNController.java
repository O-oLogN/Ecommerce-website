package com.ecom.controller.client;

import com.ecom.constant.CoreConstants;
import com.ecom.entities.VnpayTransaction;
import com.ecom.helper.ResponseHelper;
import com.ecom.service.VnpayService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "VNPAY - IPN URL only")
public class VnpayIPNController {
    private final VnpayService vnpayService;

    @GetMapping("/VNPayIPN")
    public ResponseEntity<?> handleVnpayPaymentInfo(
            @RequestParam String vnp_TransactionNo,
            @RequestParam String vnp_TmnCode,
            @RequestParam String vnp_TxnRef,
            @RequestParam Long vnp_Amount,
            @RequestParam String vnp_ResponseCode,
            @RequestParam String vnp_BankCode,
            @RequestParam String vnp_BankTranNo,
            @RequestParam String vnp_CardType,
            @RequestParam String vnp_PayDate,
            @RequestParam String vnp_TransactionStatus,
            @RequestParam String vnp_SecureHash
    ) throws Exception {
        vnpayService.saveVnpayTransaction(VnpayTransaction.builder()
                .vnp_TransactionNo(vnp_TransactionNo)
                .vnp_TmnCode(vnp_TmnCode)
                .vnp_TxnRef(vnp_TxnRef)
                .vnp_Amount(vnp_Amount)
                .vnp_ResponseCode(vnp_ResponseCode)
                .vnp_BankCode(vnp_BankCode)
                .vnp_BankTranNo(vnp_BankTranNo)
                .vnp_CardType(vnp_CardType)
                .vnp_PayDate(vnp_PayDate)
                .vnp_TransactionStatus(vnp_TransactionStatus)
                .vnp_SecureHash(vnp_SecureHash)
                .createUser(CoreConstants.ROLE.ADMIN)
                .createDatetime(LocalDateTime.now())
                .build());
        return ResponseHelper.ok("", HttpStatus.OK, "");
    }
}
