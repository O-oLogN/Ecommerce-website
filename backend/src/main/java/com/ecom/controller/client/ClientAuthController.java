package com.ecom.controller.client;

import com.ecom.constant.AppRoutes;
import com.ecom.constant.CoreConstants;
import com.ecom.dto.request.auth.CreateUserRequest;
import com.ecom.dto.request.auth.SignInRequest;
import com.ecom.entities.Role;
import com.ecom.helper.ResponseHelper;
import com.ecom.repository.RoleRepository;
import com.ecom.service.AuthService;
import com.ecom.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.AUTH)
@Tag(name = "CLIENT - Authentication", description = "CLIENT - Authentication")
public class ClientAuthController {
    private final AuthService authService;
    private final UserService userService;

    private final RoleRepository roleRepository;

    @Operation(summary = "Sign in")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SIGN_IN)
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) throws Exception {
        return authService.signIn(signInRequest);
    }

    @Operation(summary = "Sign up")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SIGN_UP)
    public ResponseEntity<?> signUp(@Valid @RequestParam("username") String username,
                                     @Valid @RequestParam("password") String password,
                                     @Valid @RequestParam("email") String email
    ) throws Exception {
        List<Role> roles = roleRepository.findByName(CoreConstants.ROLE.USER);
        CreateUserRequest createUserRequest = CreateUserRequest.builder()
                .username(username)
                .password(password)
                .email(email)
                .roleIds(Collections.singletonList(roles.getFirst().getRoleId()))
                .build();

        return userService.createUser(createUserRequest);
    }

    @Operation(summary = "Verify token")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.VERIFY_TOKEN)
    public ResponseEntity<?> verifyToken() {
        return ResponseHelper.ok("", HttpStatus.OK, "");
        // To reach here, request should pass Jwt filter where token has been verified
    }
}
