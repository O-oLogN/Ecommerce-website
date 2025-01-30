package com.admin.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component
//public class ExceptionHandlerFilter extends OncePerRequestFilter {
//    @Override
//    public void doFilterInternal(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
//        try {
//            filterChain.doFilter(request, response);
//        } catch (RuntimeException | ServletException e) {
//            ErrorResponse errorResponse = new ErrorResponse() {
//                @NotNull
//                @Override
//                public HttpStatusCode getStatusCode() {
//                    return HttpStatus.INTERNAL_SERVER_ERROR;
//                }
//
//                @NotNull
//                @Override
//                public ProblemDetail getBody() {
//                    ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
//                    problemDetail.setTitle("Internal Server Error");
//                    problemDetail.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//
//                    return problemDetail;
//                }
//            };
//
//            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//            response.getWriter().write(convertObjectToJson(errorResponse));
//        }
//    }
//
//    public String convertObjectToJson(Object object) throws JsonProcessingException {
//        if (object == null) {
//            return null;
//        }
//        ObjectMapper mapper = new ObjectMapper();
//        return mapper.writeValueAsString(object);
//    }
//}