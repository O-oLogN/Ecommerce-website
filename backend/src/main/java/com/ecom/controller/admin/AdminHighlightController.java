package com.ecom.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecom.constant.AppRoutes;
import com.ecom.dto.request.highlight.UpdateHighlightRequest;
import com.ecom.model.QueryRequest;
import com.ecom.service.HighlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.HIGHLIGHT)
@Tag(name = "ADMIN - Highlight management", description = "ADMIN - Highlight management")
public class AdminHighlightController {
    private final HighlightService highlightService;

    @Operation(summary = "Update highlight")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_HIGHLIGHT)
    public ResponseEntity<?> updateHighlight(@Valid @RequestBody UpdateHighlightRequest updateHighlightRequest) throws Exception {
        return highlightService.updateHighlight(updateHighlightRequest);
    }

    @Operation(summary = "Create highlight")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_HIGHLIGHT)
    public ResponseEntity<?> createHighlight(@Valid @RequestParam("content") String content) throws Exception {
        return highlightService.createHighlight(content);
    }
    
    @Operation(summary = "Search highlight")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_HIGHLIGHT)
    public ResponseEntity<?> searchHighlight(@Valid @RequestBody QueryRequest<String> searchHighlightRequest) {
        return highlightService.searchHighlight(searchHighlightRequest);
    }

    @Operation(summary = "Delete highlight")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_HIGHLIGHT)
    public ResponseEntity<?> deleteHighlight(@Valid @RequestParam("highlightId") String highlightId) throws Exception {
        return highlightService.deleteHighlight(highlightId);
    }
}
