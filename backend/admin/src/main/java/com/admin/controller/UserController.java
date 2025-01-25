package com.admin.controller;

import com.admin.constant.AppRoutes;
import com.admin.dto.request.auth.CreateUserRequest;
import com.admin.dto.request.user.SearchUserRequest;
import com.admin.dto.request.user.UpdateUserRequest;
import com.admin.model.QueryRequest;
import com.admin.service.UserService;
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
@RequestMapping(AppRoutes.REQUEST_MAPPING.USER)
@Tag(name = "ADMIN - User", description = "ADMIN - User management")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Create user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_USER)
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest createUserRequest) throws Exception {
        return userService.createUser(createUserRequest);
    }

    @Operation(summary = "Update user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_USER)
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest updateUserRequest) throws Exception {
        return userService.updateUser(updateUserRequest);
    }

    @Operation(summary = "Delete user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_USER)
    public ResponseEntity<?> deleteUser(@Valid @RequestParam("userId") String userId) throws Exception {
        return userService.deleteUser(userId);
    }

    @Operation(summary = "Search user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_USER)
    public ResponseEntity<?> searchUser(@Valid @RequestBody QueryRequest<SearchUserRequest> searchUserRequest) {
        return userService.searchUser(searchUserRequest);
    }
}
