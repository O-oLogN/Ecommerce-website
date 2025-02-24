package com.ecom.service.impl;

import com.ecom.dto.request.vnpay.InitPayRequest;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.service.VnpayService;
import com.ecom.utils.DatetimeUtils;
import com.ecom.utils.HashUtils;
import com.ecom.utils.QueryParamsParser;
import com.ecom.utils.ValidationUtils;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class VnpayServiceImpl implements VnpayService {
    private final MessageHelper messageHelper;

    private final Dotenv dotenv = Dotenv.load();

    @Override
    public ResponseEntity<?> initPayRequest(InitPayRequest initPayRequest) throws Exception {
        String vnpLocale = initPayRequest.getVnpLocale();
        String vnpOrderInfo = initPayRequest.getVnpOrderInfo();
        String vnpIpAddr = initPayRequest.getVnpIpAddr();
        Long vnpAmount = initPayRequest.getVnpAmount();

        if (ValidationUtils.isNullOrEmpty(vnpLocale)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpLocale")
            );
        }
        if (ValidationUtils.isNullOrEmpty(vnpOrderInfo)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpOrderInfo")
            );
        }
        if (ValidationUtils.isNullOrEmpty(vnpIpAddr)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpIpAddr")
            );
        }
        if (ValidationUtils.isNullOrEmpty(vnpAmount)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpAmount")
            );
        }
        if (vnpAmount < 5000) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.minimumTransactionAmount")
            );
        }
        Long vnp_Amount = vnpAmount;
        String vnp_Command = dotenv.get("VNPAY_PAY_COMMAND");
        Long vnp_CreateDate = DatetimeUtils.getVnpCreateDate();
        String vnp_CurrCode = dotenv.get("VNPAY_CURR_CODE");
        Long vnp_ExpireDate = DatetimeUtils.getVnpExpireDate();
        String vnp_IpAddr = vnpIpAddr;
        String vnp_Locale = vnpLocale;
        String vnp_OrderInfo = vnpOrderInfo;
        String vnp_OrderType = dotenv.get("VNPAY_ORDER_TYPE");
        String vnp_ReturnUrl = dotenv.get("VNPAY_RETURN_URL");
        String vnp_TmnCode = dotenv.get("VNPAY_TMN_CODE");
        String vnp_TxnRef = generateRandomVnp_TxnRef();
        String vnp_Version = dotenv.get("VNPAY_VERSION");

        HashMap<String, String> params = new HashMap<>();
        params.put("vnp_Amount", String.valueOf(vnp_Amount * 100));
        params.put("vnp_Command", vnp_Command);
        params.put("vnp_CreateDate", vnp_CreateDate.toString());
        params.put("vnp_CurrCode", vnp_CurrCode);
        params.put("vnp_ExpireDate", vnp_ExpireDate.toString());
        params.put("vnp_IpAddr", vnp_IpAddr);
        params.put("vnp_Locale", vnp_Locale);
        params.put("vnp_OrderInfo", vnp_OrderInfo);
        params.put("vnp_OrderType", vnp_OrderType);
        params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        params.put("vnp_TmnCode", vnp_TmnCode);
        params.put("vnp_TxnRef", vnp_TxnRef);
        params.put("vnp_Version", vnp_Version);

        String queryParams = QueryParamsParser.convertToQueryParams(params);
        String vnp_SecureHash = HashUtils.getVnpSecureHash(queryParams);

        return ResponseHelper.ok(
            dotenv.get("VNPAY_PAYMENT_GATEWAY_WEBSITE_URL") + "?" + queryParams + "&vnp_SecureHash=" + vnp_SecureHash,
            HttpStatus.OK, ""
        );
    }

    @Override
    public ResponseEntity<?> getRequestIpAddress(HttpServletRequest request) {
        String clientIp = getIpAddressFromRequest(request);
        return ResponseHelper.ok(clientIp, HttpStatus.OK, "");
    }

    private String getIpAddressFromRequest(HttpServletRequest request)  {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ValidationUtils.isNullOrEmpty(ipAddress)) {
            ipAddress = request.getLocalAddr();
        }
        return ipAddress;
    }

    private String generateRandomVnp_TxnRef() {
        long timestamp = System.currentTimeMillis();
        Random random = new Random();
        int randomSuffix = 1000 + random.nextInt(9000);
        return timestamp + String.valueOf(randomSuffix);
    }
}
