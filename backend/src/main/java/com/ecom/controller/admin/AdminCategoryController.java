package com.ecom.controller.admin;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.category.CreateCategoryRequest;
import com.ecom.dto.request.category.SearchCategoryRequestByName;
import com.ecom.dto.request.category.UpdateCategoryRequest;
import com.ecom.model.QueryRequest;
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
@RequestMapping(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.CATEGORY)
@Tag(name = "ADMIN - Category", description = "ADMIN - Category management")
public class AdminCategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "Create category")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_CATEGORY)
    public ResponseEntity<?> createCategory(@Valid @RequestBody CreateCategoryRequest createCategoryRequest) throws Exception {
        return categoryService.createCategory(createCategoryRequest);
    }

    @Operation(summary = "Update category")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_CATEGORY)
    public ResponseEntity<?> updateCategory(@Valid @RequestBody UpdateCategoryRequest updateCategoryRequest) throws Exception {
        return categoryService.updateCategory(updateCategoryRequest);
    }

    @Operation(summary = "Search category by name")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_CATEGORY_BY_NAME)
    public ResponseEntity<?> searchCategoryByName(@Valid @RequestBody QueryRequest<SearchCategoryRequestByName> searchCategoryRequest) {
        return categoryService.searchCategoryByName(searchCategoryRequest);
    }

    @Operation(summary = "Search category by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @GetMapping(AppRoutes.REQUEST_PATH.SEARCH_CATEGORY_BY_ID)
    public ResponseEntity<?> searchCategoryById(@Valid @RequestParam("categoryId") String categoryId) throws Exception {
        return categoryService.searchCategoryById(categoryId);
    }

    @Operation(summary = "Delete category")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @GetMapping(AppRoutes.REQUEST_PATH.DELETE_CATEGORY)
    public ResponseEntity<?> deleteCategory(@Valid @RequestParam String categoryId) throws Exception {
        return categoryService.deleteCategory(categoryId);
    }
}
