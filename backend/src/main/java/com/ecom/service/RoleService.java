package com.ecom.service;

import com.ecom.dto.role.SearchRoleRequest;
import com.ecom.dto.role.UpdateRoleRequest;
import com.ecom.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {
    ResponseEntity<?> searchRole(QueryRequest<SearchRoleRequest> searchRoleRequest);
    ResponseEntity<?> createRole(String roleName) throws Exception;
    ResponseEntity<?> updateRole(UpdateRoleRequest updateRoleRequest) throws Exception;
    ResponseEntity<?> deleteRole(String roleId) throws Exception;
}
