package com.admin.controller;

import com.admin.constant.AppRoutes;
import com.admin.dto.request.auth.SignInRequest;
import com.admin.service.AuthService;
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
@RequestMapping(AppRoutes.REQUEST_MAPPING.AUTH)
@Tag(name = "ADMIN - Authentication", description = "ADMIN - Authentication")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "Sign in")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SIGN_IN)
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) throws Exception {
        return authService.signIn(signInRequest);
    }

    @Operation(summary = "Sign out")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SIGN_OUT)
    public ResponseEntity<?> signOut(@Valid @RequestParam("sessionId") String sessionId) throws Exception {
        return authService.signOut(sessionId);
    }
}
