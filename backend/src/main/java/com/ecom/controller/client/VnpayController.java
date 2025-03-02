package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.vnpay.InitPayRequest;
import com.ecom.service.VnpayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.PAY)
@Tag(name = "User - VNPAY Payment", description = "User - VNPAY Payment")
public class VnpayController {
    private final VnpayService vnpayService;

    @Operation(summary = "Get request IP Address")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.GET_IP)
    public ResponseEntity<?> getRequestIpAddress(HttpServletRequest request) {
        return vnpayService.getRequestIpAddress(request);
    }

    @Operation(summary = "Initialize a pay request")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.INIT_PAY_REQUEST)
    public ResponseEntity<?> initPayRequest(@Valid @RequestBody InitPayRequest initPayRequest) {
        try {
            return vnpayService.initPayRequest(initPayRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(summary = "Get VNPAY transaction")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.GET_VNPAY_TRANSACTION)
    public ResponseEntity<?> getVnpayTransaction(@Valid @RequestParam String vnp_TransactionNo) throws Exception {
        return vnpayService.getVnpayTransaction(vnp_TransactionNo);
    }
}
