package com.ecom.controller.admin;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.order.DeleteChildOrderRequest;
import com.ecom.dto.request.order.UpdateOrderPaymentStatusRequest;
import com.ecom.model.QueryRequest;
import com.ecom.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.ORDER)
@Tag(name = "ADMIN - Order", description = "ADMIN - Order management")
public class AdminOrderController {
    private final OrderService orderService;

    @Operation(summary = "Search total order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_TOTAL_ORDER)
    public ResponseEntity<?> searchTotalOrder(@Valid @RequestBody QueryRequest<String> searchTotalOrderRequest)  {
        return orderService.searchTotalOrder(searchTotalOrderRequest);
    }

    @Operation(summary = "Search child orders")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_CHILD_ORDERS)
    public ResponseEntity<?> searchChildOrders(@Valid @RequestParam String totalOrderId) {
        try {
            return orderService.searchChildOrders(totalOrderId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(summary = "Delete child order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_CHILD_ORDER)
    public ResponseEntity<?> deleteChildOrder(@Valid @RequestBody DeleteChildOrderRequest deleteChildOrderRequest) throws Exception {
        return orderService.deleteChildOrder(deleteChildOrderRequest);
    }

    @Operation(summary = "Delete total order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_TOTAL_ORDER)
    public ResponseEntity<?> deleteTotalOrder(@Valid @RequestParam String totalOrderId) throws Exception {
        return orderService.deleteTotalOrder(totalOrderId);
    }

    @Operation(summary = "Update total order payment status")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_PAYMENT_STATUS_TOTAL_ORDER)
    public ResponseEntity<?> updateTotalOrderPaymentStatus(@Valid @RequestBody UpdateOrderPaymentStatusRequest updateOrderPaymentStatusRequest) throws Exception {
        return orderService.updateOrderPaymentStatus(updateOrderPaymentStatusRequest);
    }
}
