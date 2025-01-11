package com.client.controller;

import com.client.constant.AppRoutes;
import com.client.dto.request.user.UpdateUserRequest;
import com.client.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_MAPPING.USER)
@Tag(name = "CLIENT - User", description = "CLIENT - Update user profile")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Update client profile")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_USER)
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest updateUserRequest) throws Exception {
        return userService.updateUser(updateUserRequest);
    }
}
