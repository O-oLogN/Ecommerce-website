package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.order.CreateTotalOrderRequest;
import com.ecom.dto.request.order.DeleteChildOrderRequest;
import com.ecom.dto.request.order.UpdateTotalOrderPaymentStatusRequest;
import com.ecom.dto.request.order.UpdateTotalOrderStatusRequest;
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
@RequestMapping(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.ORDER)
@Tag(name = "User - Order searching", description = "User - Order searching")
public class ClientOrderController {
    private final OrderService orderService;

    @Operation(summary = "Search total order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_TOTAL_ORDER)
    public ResponseEntity<?> searchTotalOrder(@Valid @RequestBody QueryRequest<String> searchTotalOrderRequest) {
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

    @Operation(summary = "Find user ID by username")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_USER_ID_BY_USERNAME)
    public ResponseEntity<?> findUserIdByUsername(@Valid @RequestParam String username) throws Exception {
        return orderService.findUserIdByUsername(username);
    }

    @Operation(summary = "Create total order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_TOTAL_ORDER)
    public ResponseEntity<?> createTotalOrder(@Valid @RequestBody CreateTotalOrderRequest createTotalOrderRequest) {
        return orderService.createTotalOrder(createTotalOrderRequest, CoreConstants.ROLE.USER);
    }

    @Operation(summary = "Get the latest order code")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.GET_LATEST_ORDER_CODE)
    public ResponseEntity<?> getLatestOrderCode() {
        return orderService.getLatestOrderCode();
    }

    @Operation(summary = "Delete child order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_CHILD_ORDER)
    public ResponseEntity<?> deleteChildOrder(@Valid @RequestBody DeleteChildOrderRequest deleteChildOrderRequest) throws Exception {
        return orderService.deleteChildOrder(deleteChildOrderRequest, CoreConstants.ROLE.USER);
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
    public ResponseEntity<?> updateTotalOrderPaymentStatus(@Valid @RequestBody UpdateTotalOrderPaymentStatusRequest updateTotalOrderPaymentStatusRequest) throws Exception {
        return orderService.updateOrderPaymentStatus(updateTotalOrderPaymentStatusRequest, CoreConstants.ROLE.USER);
    }

    @Operation(summary = "Update total order status")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_TOTAL_ORDER_STATUS)
    public ResponseEntity<?> updateTotalOrderStatus(@Valid @RequestBody UpdateTotalOrderStatusRequest updateTotalOrderStatusRequest) {
        try {
            return orderService.updateTotalOrderStatus(updateTotalOrderStatusRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}