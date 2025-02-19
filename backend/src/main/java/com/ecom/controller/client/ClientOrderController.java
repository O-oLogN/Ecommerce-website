package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
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
}