package com.ecom.filter;

import com.ecom.constant.AppRoutes;
import com.ecom.service.impl.CustomUserDetailsService;
import com.ecom.utils.JwtUtils;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (path.equals(AppRoutes.REQUEST_BRANCH.ADMIN + AppRoutes.REQUEST_MAPPING.AUTH + AppRoutes.REQUEST_PATH.SIGN_IN)
            || path.equals(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.AUTH + AppRoutes.REQUEST_PATH.SIGN_IN)
            || path.equals(AppRoutes.REQUEST_BRANCH.CLIENT + AppRoutes.REQUEST_MAPPING.AUTH + AppRoutes.REQUEST_PATH.SIGN_UP)
//            || path.equals(AppRoutes.REQUEST_BRANCH.USER + AppRoutes.REQUEST_PATH.CREATE_USER)
//            || path.equals(AppRoutes.REQUEST_BRANCH.USER + AppRoutes.REQUEST_PATH.UPDATE_USER)
//            || path.equals(AppRoutes.REQUEST_BRANCH.ROLE + AppRoutes.REQUEST_PATH.CREATE_ROLE)
            || path.startsWith("/swagger-ui")
            || path.startsWith("/v3/api-docs")){

            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication header is missing or Invalid JWT");
            return;
        }
        String jwt = authHeader.substring(7);

        try {
            DecodedJWT decodedJWT = jwtUtils.validateToken(jwt);
            String username = decodedJWT.getSubject();

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = customUserDetailsService.loadUserByUsername(username);
                String roleClaim = decodedJWT.getClaim("role").asString();
                String[] roles = roleClaim.split(",");
                List<SimpleGrantedAuthority> authorities = Arrays.stream(roles)
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                        .toList();
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        catch (JWTVerificationException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT");
            return;
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
