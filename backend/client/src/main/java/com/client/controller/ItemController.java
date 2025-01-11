package com.client.controller;

import com.client.constant.AppRoutes;
import com.client.dto.request.item.SearchItemRequest;
import com.client.model.QueryRequest;
import com.client.service.ItemService;
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
@Tag(name = "CLIENT - Item", description = "CLIENT - Searching item")
public class ItemController {
    private final ItemService itemService;

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
