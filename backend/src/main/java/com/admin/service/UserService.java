package com.admin.service;

import com.admin.dto.request.auth.CreateUserRequest;
import com.admin.dto.request.user.SearchUserRequest;
import com.admin.dto.request.user.UpdateUserRequest;
import com.admin.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> createUser(CreateUserRequest createUserRequest) throws Exception;
    ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception;
    ResponseEntity<?> deleteUser(String userId) throws Exception;
    ResponseEntity<?> searchUser(QueryRequest<SearchUserRequest> searchUserRequest);
}
