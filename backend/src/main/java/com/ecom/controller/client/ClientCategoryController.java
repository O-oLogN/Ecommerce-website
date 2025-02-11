package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
import com.ecom.service.CategoryService;
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
@RequestMapping(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.CATEGORY)
@Tag(name = "CLIENT - Category searching", description = "CLIENT - Category searching")
public class ClientCategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "Search category by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_CATEGORY_BY_ID)
    public ResponseEntity<?> searchCategoryById(@Valid @RequestParam("categoryId") String categoryId) throws Exception {
        return categoryService.searchCategoryById(categoryId);
    }
}
