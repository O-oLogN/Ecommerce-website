package com.ecom.service;

import com.ecom.dto.request.auth.CreateUserRequest;
import com.ecom.dto.request.user.SearchUserRequest;
import com.ecom.dto.request.user.UpdateUserRequest;
import com.ecom.model.QueryRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> createUser(CreateUserRequest createUserRequest) throws Exception;
    ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception;
    ResponseEntity<?> deleteUser(String userId) throws Exception;
    ResponseEntity<?> searchUser(QueryRequest<SearchUserRequest> searchUserRequest);
}
