package com.ecom.controller.admin;

import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.item.CreateItemRequest;
import com.ecom.dto.request.item.SearchItemRequest;
import com.ecom.dto.request.item.UpdateItemRequest;
import com.ecom.model.MultipleRequests;
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
    private int cnt = 0;

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
                                        @RequestParam("highlightIds") List<String> highlightIds,
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
                                                        .highlightIds(highlightIds)
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
                                        @RequestParam("highlightIds") List<String> highlightIds,
                                        @RequestParam("badgeIds") List<String> badgeIds,
                                        @RequestParam("rate") Float rate,
                                        @RequestParam("numberOfReviews") Integer numberOfReviews
    ) throws Exception {
        return itemService.createItem(CreateItemRequest.builder()
                                                        .categoryId(categoryId)
                                                        .name(name)
                                                        .price(price)
                                                        .quantity(quantity)
                                                        .image(image)
                                                        .highlightIds(highlightIds)
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

    @Operation(summary = "Update items")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping("/update_items")
    public ResponseEntity<?> updateItems(@Valid @RequestBody MultipleRequests<UpdateItemRequest> updateItemRequestMultipleRequests) {
        List<UpdateItemRequest> updateItemRequests = updateItemRequestMultipleRequests.getRequests();
        String[] itemIds = {
                "22d95f5f-2de3-44d2-a331-47bf48bc7d67",
                "22de0064-e9bf-42bd-9657-ac99c4d2cfd3",
                "2ba6449d-e7d8-4b38-ab17-7556b66c69ae",
                "31cb81f6-7de3-4932-b900-ad2d2d661f05",
                "321a9eab-dae8-4c8c-b5d2-ff9df2a2b4fe",
                "3793d2a9-2f05-49de-b532-7fb914acd5d6",
                "478c8cde-40af-4bf8-8488-7ed94c0bc905",
                "499d8f4f-ec1e-4a83-b893-30353a53c42a",
                "49f9d961-8cca-4e3d-ba20-b6296afb071a",
                "4fcb6b36-a21a-4494-a09d-6f913f05ad8b",
                "51ba1009-c6b7-414c-bfda-59d12e49abdd",
                "58b2036a-badc-4a98-9fc6-3ecc036768b7",
                "5abfb656-6094-4360-b8e1-1fff8b802dcd",
                "5eeef942-0d54-4946-bdc9-cffb000e1476",
                "60449424-1172-4e20-b87d-7b8314654692",
                "6f0907fc-87c1-41f4-a551-787a1cc12ffa",
                "72c0d033-0a08-455a-846f-76f2f0981f33",
                "78bcaaf6-4b6a-4c48-ae4c-ef5bfc6debae",
                "7d43f850-5284-4bcd-90bb-ac02c602b14b",
                "7e7a0d98-d114-4558-a981-fa2c7e21efe6",
                "80947c4e-d17c-4641-8f08-bde5bc5dc16f",
                "843e92bb-0c28-4986-bbef-c7f31a157485",
                "85fc3761-142f-45cf-b000-824840946bd2",
                "8fb8b0cf-4d86-41c4-a858-9d8518665b07",
                "90335090-d973-440b-8d73-591f3caef645",
                "90621b58-886a-4011-ad00-f84a1b5412a2",
                "9640c944-9cce-4f89-832c-3cd78a9bf2f2",
                "97e32428-ecc7-4f91-adf0-5ffc0ee563b8",
                "a6ac9996-e6b7-4d49-a608-19bfa97281e9",
                "b26204cd-3437-4694-9012-9934e41a86f3",
                "bb6acec1-ab30-4e06-a56d-20921213dbdf",
                "bd80ef9f-0e0f-4855-9f4b-e8f35a6b1637",
                "cf384cf9-2b91-4457-864f-8583eb9ba26a",
                "d7e0ccb7-572d-4f2f-abe7-99feba27ccde",
                "e1d8a554-3a35-4f49-9251-a4befa5c43cd",
                "e23d9283-7778-40d1-9d1b-2ec711346f88",
                "ee6ceaaf-1d03-44ad-b556-64a6a57309e6",
                "f0f40791-1e69-478a-9833-98a73549b6b9",
                "f290d040-7136-4f05-9156-9659e6f5653b",
                "f2e70214-9f4b-4cc0-966a-8f6ac98f3a82"
        };
        updateItemRequests.forEach(updateItemRequest -> {
            try {
                updateItemRequest.setItemId(itemIds[cnt]);
                ++cnt;
                itemService.updateItem(updateItemRequest);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
        return ResponseEntity.ok().body("Items updated successfully!");
    }
}
