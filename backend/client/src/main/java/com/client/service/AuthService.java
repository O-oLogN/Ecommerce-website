package com.client.service;

import com.client.dto.request.auth.SignUpRequest;
import com.client.dto.request.auth.SignInRequest;
import jakarta.xml.bind.ValidationException;
import org.springframework.http.ResponseEntity;


public interface AuthService {
    ResponseEntity<?> signIn(SignInRequest signinRequest) throws Exception;
    ResponseEntity<?> signUp(SignUpRequest signUpRequest) throws Exception;
    ResponseEntity<?> signOut(String sessionId) throws Exception;
}
