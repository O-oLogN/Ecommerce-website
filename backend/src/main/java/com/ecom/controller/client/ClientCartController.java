package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.cart.RemoveItemFromCartRequest;
import com.ecom.dto.request.cart.UpdateItemInCartRequest;
import com.ecom.service.CartService;
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
@RequestMapping(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.CART)
@Tag(name = "CLIENT - Cart", description = "CLIENT - Cart")
public class ClientCartController {
    private final CartService cartService;

    @Operation(summary = "Update item in cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_ITEM_IN_CART)
    public ResponseEntity<?> updateItem(@Valid @RequestBody UpdateItemInCartRequest updateItemInCartRequest) throws Exception {
        return cartService.updateItem(updateItemInCartRequest);
    }

    @Operation(summary = "Remove item from cart")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.REMOVE_ITEM_FROM_CART)
    public ResponseEntity<?> removeItemFromCart(@Valid @RequestBody RemoveItemFromCartRequest removeItemFromCartRequest) throws Exception {
        return cartService.removeItemFromCart(removeItemFromCartRequest);
    }

    @Operation(summary = "Get items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.GET_ITEMS)
    public ResponseEntity<?> getItems(@RequestParam String userId) throws Exception {
        return cartService.getItems(userId);
    }
}
