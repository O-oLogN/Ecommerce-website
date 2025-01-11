package com.client.service;

import com.client.dto.request.user.UpdateUserRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> updateUser(UpdateUserRequest updateUserRequest) throws Exception;
}
