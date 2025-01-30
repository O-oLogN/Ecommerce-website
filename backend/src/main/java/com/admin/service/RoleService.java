package com.admin.service;

import com.admin.dto.role.SearchRoleRequest;
import com.admin.dto.role.UpdateRoleRequest;
import com.admin.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    ResponseEntity<?> searchRole(QueryRequest<SearchRoleRequest> searchRoleRequest);
    ResponseEntity<?> createRole(String roleName) throws Exception;
    ResponseEntity<?> updateRole(UpdateRoleRequest updateRoleRequest) throws Exception;
    ResponseEntity<?> deleteRole(String roleId) throws Exception;
}
