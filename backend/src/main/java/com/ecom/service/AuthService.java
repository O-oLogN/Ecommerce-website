package com.ecom.service;

import com.ecom.dto.request.auth.SignInRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> signIn(SignInRequest signinRequest) throws Exception;
    ResponseEntity<?> signOut(String sessionId) throws Exception;
}
