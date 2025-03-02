package com.ecom.service.impl;

import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.order.UpdateTotalOrderPaymentStatusRequest;
import com.ecom.dto.request.vnpay.InitPayRequest;
import com.ecom.entities.TotalOrder;
import com.ecom.entities.VnpayTransaction;
import com.ecom.helper.MessageHelper;
import com.ecom.helper.ResponseHelper;
import com.ecom.repository.TotalOrderRepository;
import com.ecom.repository.VnpayTransactionRepository;
import com.ecom.service.OrderService;
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

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class VnpayServiceImpl implements VnpayService {
    private final VnpayTransactionRepository vnpayTransactionRepository;
    private final TotalOrderRepository totalOrderRepository;

    private final OrderService orderService;

    private final MessageHelper messageHelper;

    private final Dotenv dotenv = Dotenv.load();

    @Override
    public ResponseEntity<?> initPayRequest(InitPayRequest initPayRequest) throws Exception {
        String vnpLocale = initPayRequest.getVnpLocale();
        String vnpTxnRef = initPayRequest.getVnpTxnRef();
        String vnpOrderInfo = initPayRequest.getVnpOrderInfo();
        String vnpIpAddr = initPayRequest.getVnpIpAddr();
        Long vnpAmount = initPayRequest.getVnpAmount();

        if (ValidationUtils.isNullOrEmpty(vnpLocale)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpLocale")
            );
        }
        if (ValidationUtils.isNullOrEmpty(vnpTxnRef)) {
            throw new ValidationException(
                    messageHelper.getMessage("admin.vnpayController.initPayRequest.error.validation.vnpTxnRef")
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
        String vnp_Command = dotenv.get("VNPAY_PAY_COMMAND");
        Long vnp_CreateDate = DatetimeUtils.getVnpCreateDate();
        String vnp_CurrCode = dotenv.get("VNPAY_CURR_CODE");
        Long vnp_ExpireDate = DatetimeUtils.getVnpExpireDate();
        String vnp_OrderType = dotenv.get("VNPAY_ORDER_TYPE");
        String vnp_ReturnUrl = dotenv.get("VNPAY_RETURN_URL");
        String vnp_TmnCode = dotenv.get("VNPAY_TMN_CODE");
        String vnp_Version = dotenv.get("VNPAY_VERSION");

        HashMap<String, String> params = new HashMap<>();
        params.put("vnp_Amount", String.valueOf(vnpAmount * 100));
        params.put("vnp_Command", vnp_Command);
        params.put("vnp_CreateDate", vnp_CreateDate.toString());
        params.put("vnp_CurrCode", vnp_CurrCode);
        params.put("vnp_ExpireDate", vnp_ExpireDate.toString());
        params.put("vnp_IpAddr", vnpIpAddr);
        params.put("vnp_Locale", vnpLocale);
        params.put("vnp_OrderInfo", vnpOrderInfo);
        params.put("vnp_OrderType", vnp_OrderType);
        params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        params.put("vnp_TmnCode", vnp_TmnCode);
        params.put("vnp_TxnRef", vnpTxnRef);
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

    @Override
    public ResponseEntity<?> getVnpayTransaction(String vnp_TransactionNo) throws ValidationException {
        if (ValidationUtils.isNullOrEmpty(vnp_TransactionNo)) {
            throw new ValidationException(
                messageHelper.getMessage("admin.vnpayController.getVnpayTransaction.error.validation.vnpTransactionNo")
            );
        }

        VnpayTransaction vnpayTransaction = vnpayTransactionRepository.findById(vnp_TransactionNo).orElse(null);

        if (vnpayTransaction == null) {
            return ResponseHelper.notFound("", messageHelper.getMessage("admin.vnpayController.getVnpayTransaction.error.notFound"));
        }
        return ResponseHelper.ok(vnpayTransaction, HttpStatus.OK, "");
    }

    @Override
    public void saveVnpayTransaction(VnpayTransaction vnpayTransaction) throws Exception {
        vnpayTransactionRepository.save(vnpayTransaction);
        if (vnpayTransaction.getVnp_TransactionStatus().equals("00")) {
            TotalOrder totalOrder = totalOrderRepository.findTotalOrderByVnpTxnRef(vnpayTransaction.getVnp_TxnRef());
            orderService.updateOrderPaymentStatus(
                    UpdateTotalOrderPaymentStatusRequest
                            .builder()
                            .totalOrderId(totalOrder.getTotalOrderId())
                            .paymentStatus(CoreConstants.PAYMENT_STATUS.PAID)
                            .build(),
                    CoreConstants.ROLE.ADMIN);
            orderService.updateItemsWhenPaymentSuccessful(totalOrder.getTotalOrderId());
        }
        ResponseHelper.ok("", HttpStatus.OK, "");
    }

    private String getIpAddressFromRequest(HttpServletRequest request)  {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ValidationUtils.isNullOrEmpty(ipAddress)) {
            ipAddress = request.getLocalAddr();
        }
        return ipAddress;
    }
}
