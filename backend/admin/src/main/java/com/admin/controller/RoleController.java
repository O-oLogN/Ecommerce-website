package com.admin.controller;

import com.admin.constant.AppRoutes;
import com.admin.dto.role.SearchRoleRequest;
import com.admin.dto.role.UpdateRoleRequest;
import com.admin.model.QueryRequest;
import com.admin.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping(AppRoutes.REQUEST_MAPPING.ROLE)
@Tag(name = "ADMIN - Role management", description = "ADMIN - Role management")
public class RoleController {
    private final RoleService roleService;

    @Operation(summary = "Search role")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.SEARCH_ROLE)
    public ResponseEntity<?> searchRole(@Valid @RequestBody QueryRequest<SearchRoleRequest> searchRoleRequest) {
        return roleService.searchRole(searchRoleRequest);
    }

    @Operation(summary = "Create role")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.CREATE_ROLE)
    public ResponseEntity<?> createRole(@Valid @RequestParam("roleName") String roleName) throws Exception {
        return roleService.createRole(roleName);
    }

    @Operation(summary = "Update role")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.UPDATE_ROLE)
    public ResponseEntity<?> updateRole(@Valid @RequestBody UpdateRoleRequest updateRoleRequest) throws Exception {
        return roleService.updateRole(updateRoleRequest);
    }

    @Operation(summary = "Delete role")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Fail")
    })
    @PostMapping(AppRoutes.REQUEST_PATH.DELETE_ROLE)
    public ResponseEntity<?> deleteRole(@Valid @RequestParam("roleId") String roleId) throws Exception {
        return roleService.deleteRole(roleId);
    }
}
