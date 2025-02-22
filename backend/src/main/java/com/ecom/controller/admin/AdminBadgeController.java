package com.ecom.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.badge.CreateBadgeRequest;
import com.ecom.dto.request.badge.UpdateBadgeRequest;
import com.ecom.model.QueryRequest;
import com.ecom.service.BadgeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.BADGE)
@Tag(name = "ADMIN - Badge management", description = "ADMIN - Badge management")
public class AdminBadgeController {
    private final BadgeService badgeService;

    @Operation(summary = "Update badge")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_BADGE)
    public ResponseEntity<?> updateBadge(@RequestParam("badgeId") String badgeId,
                                         @RequestParam(value = "icon", required = false) MultipartFile icon,
                                         @RequestParam(value = "iconMinioGetUrl", required = false) String iconMinioGetUrl,
                                         @RequestParam(value = "iconMinioPutUrl", required = false) String iconMinioPutUrl,
                                         @RequestParam("description") String description

     ) throws Exception {
        UpdateBadgeRequest updateBadgeRequest = UpdateBadgeRequest.builder()
                .badgeId(badgeId)
                .icon(icon)
                .iconMinioGetUrl(iconMinioGetUrl)
                .iconMinioPutUrl(iconMinioPutUrl)
                .description(description)
                .build();
        return badgeService.updateBadge(updateBadgeRequest);
    }
    
    @Operation(summary = "Create badge")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_BADGE)
    public ResponseEntity<?> createBadge(@RequestParam(value = "icon", required = false) MultipartFile icon,
                                         @RequestParam("description") String description
    ) throws Exception {
        CreateBadgeRequest createBadgeRequest = CreateBadgeRequest.builder()
                                                                .icon(icon)
                                                                .description(description)
                                                                .build();
        return badgeService.createBadge(createBadgeRequest);
    }

    @Operation(summary = "Search badge")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_BADGE)
    public ResponseEntity<?> searchBadge(@Valid @RequestBody QueryRequest<String> searchBadgeRequest) {
        return badgeService.searchBadge(searchBadgeRequest);
    }

    @Operation(summary = "Delete badge")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_BADGE)
    public ResponseEntity<?> deleteBadge(@Valid @RequestParam("badgeId") String badgeId) throws Exception {
        return badgeService.deleteBadge(badgeId);
    }
}
