package com.admin.controller;

import com.admin.constant.AppRoutes;
import com.admin.dto.request.item.CreateItemsRequest;
import com.admin.dto.request.item.SearchItemRequest;
import com.admin.dto.request.item.UpdateItemRequest;
import com.admin.model.QueryRequest;
import com.admin.service.ItemService;
import io.micrometer.common.lang.Nullable;
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
@RequestMapping(AppRoutes.REQUEST_MAPPING.ITEM)
@Tag(name = "ADMIN - Item", description = "ADMIN - Item management")
public class ItemController {
    private final ItemService itemService;

    @Operation(summary = "Update item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_ITEM)
    public ResponseEntity<?> updateItem(@Valid @RequestBody UpdateItemRequest updateItemRequest) throws Exception {
        return itemService.updateItem(updateItemRequest);
    }

    @Operation(summary = "Create item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_ITEM)
    public ResponseEntity<?> createItem(@Valid @RequestBody CreateItemsRequest createItemsRequest) throws Exception {
        return itemService.createItem(createItemsRequest);
    }

    @Operation(summary = "Delete item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_ITEM)
    public ResponseEntity<?> deleteItem(@Valid @RequestParam String itemId) throws Exception {
        return itemService.deleteItem(itemId);
    }

    @Operation(summary = "Search item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_ITEM)
    public ResponseEntity<?> searchItem(@Valid @RequestBody QueryRequest<SearchItemRequest> searchItemRequest) {
        return itemService.searchItem(searchItemRequest);
    }
}
