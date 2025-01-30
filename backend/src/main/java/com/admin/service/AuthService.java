package com.admin.service;

import com.admin.dto.request.auth.SignInRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> signIn(SignInRequest signinRequest) throws Exception;
    ResponseEntity<?> signOut(String sessionId) throws Exception;
}
