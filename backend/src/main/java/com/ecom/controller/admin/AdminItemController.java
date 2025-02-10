package com.ecom.controller.admin;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.item.CreateItemRequest;
import com.ecom.dto.request.item.SearchItemRequest;
import com.ecom.dto.request.item.UpdateItemRequest;
import com.ecom.model.QueryRequest;
import com.ecom.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.ITEM)
@Tag(name = "ADMIN - Item", description = "ADMIN - Item management")
public class AdminItemController {
    private final ItemService itemService;

    @Operation(summary = "Update item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_ITEM)
    public ResponseEntity<?> updateItem(
                                        @RequestParam("itemId") String itemId,
                                        @RequestParam("categoryId") String categoryId,
                                        @RequestParam("name") String name,
                                        @RequestParam("price") Float price,
                                        @RequestParam("quantity") Integer quantity,
                                        @RequestParam("image") MultipartFile image,
                                        @RequestParam("imageMinioGetUrl") String imageMinioGetUrl,
                                        @RequestParam("imageMinioPutUrl") String imageMinioPutUrl,
                                        @RequestParam("highlightIds") List<String> hightlightIds,
                                        @RequestParam("badgeIds") List<String> badgeIds,
                                        @RequestParam("rate") Float rate,
                                        @RequestParam("numberOfReviews") Integer numberOfReviews
        ) throws Exception {
        return itemService.updateItem(UpdateItemRequest.builder()
                                                        .itemId(itemId)
                                                        .categoryId(categoryId)
                                                        .name(name)
                                                        .price(price)
                                                        .quantity(quantity)
                                                        .image(image)
                                                        .imageMinioGetUrl(imageMinioGetUrl)
                                                        .imageMinioPutUrl(imageMinioPutUrl)
                                                        .highlightIds(hightlightIds)
                                                        .badgeIds(badgeIds)
                                                        .rate(rate)
                                                        .numberOfReviews(numberOfReviews)
                                                        .build());
    }

    @Operation(summary = "Create item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_ITEM)
    public ResponseEntity<?> createItem(@RequestParam("categoryId") String categoryId,
                                        @RequestParam("name") String name,
                                        @RequestParam("price") Float price,
                                        @RequestParam("quantity") Integer quantity,
                                        @RequestParam("image") MultipartFile image,
                                        @RequestParam("highlightIds") List<String> hightlightIds,
                                        @RequestParam("badgeIds") List<String> badgeIds,
                                        @RequestParam("rate") Float rate,
                                        @RequestParam("numberOfReivews") Integer numberOfReviews
    ) throws Exception {
        return itemService.createItem(CreateItemRequest.builder()
                                                        .categoryId(categoryId)
                                                        .name(name)
                                                        .price(price)
                                                        .quantity(quantity)
                                                        .image(image)
                                                        .highlightIds(hightlightIds)
                                                        .badgeIds(badgeIds)
                                                        .rate(rate)
                                                        .numberOfReviews(numberOfReviews)
                                                        .build());
    }

    @Operation(summary = "Delete item")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_ITEM)
    public ResponseEntity<?> deleteItem(@Valid @RequestParam("itemId") String itemId) throws Exception {
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
