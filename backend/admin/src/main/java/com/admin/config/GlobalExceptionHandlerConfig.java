package com.admin.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandlerConfig extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public void handleRuntimeException(RuntimeException ex, HttpServletResponse response) throws Exception {
        response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Runtime error occurred: " + ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public void handleException(Exception ex, HttpServletResponse response) throws Exception {
        response.sendError(HttpStatus.BAD_REQUEST.value(), "Bad request: " + ex.getMessage());
    }
}
