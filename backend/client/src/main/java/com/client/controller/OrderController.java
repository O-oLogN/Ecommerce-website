package com.client.controller;

import com.client.constant.AppRoutes;
import com.client.dto.request.order.CreateTotalOrderRequest;
import com.client.service.OrderService;
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
@RequestMapping(AppRoutes.REQUEST_MAPPING.ORDER)
@Tag(name = "CLIENT - Order", description = "CLIENT - Create & Delete order")
public class OrderController {
    private final OrderService orderService;

    @Operation(summary = "Delete child order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_CHILD_ORDER)
    public ResponseEntity<?> deleteChildOrder(@Valid @RequestParam String orderId)  {
        return orderService.deleteChildOrder(orderId);
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

    @Operation(summary = "Create total order")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_TOTAL_ORDER)
    public ResponseEntity<?> createTotalOrder(@Valid @RequestBody CreateTotalOrderRequest createTotalOrderRequest) throws Exception {
        return orderService.createTotalOrder(createTotalOrderRequest);
    }

}
