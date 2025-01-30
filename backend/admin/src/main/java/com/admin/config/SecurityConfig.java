package com.admin.config;

import com.admin.constant.CoreConstants;
//import com.admin.filter.ExceptionHandlerFilter;
import com.admin.filter.JwtFilter;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
//    private final ExceptionHandlerFilter exceptionHandlerFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        String permittedPathValue = Dotenv.load().get("PERMITTED_PATHS");
        String adminRolePathValue = Dotenv.load().get("ADMIN_ROLE_PATHS");
        List<String> permittedPaths = permittedPathValue != null
                ? Arrays.asList(permittedPathValue.split(","))
                : Collections.emptyList();
        List<String> adminRolePaths = adminRolePathValue != null
                ? Arrays.asList(adminRolePathValue.split(","))
                : Collections.emptyList();

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                            permittedPaths.forEach(path -> auth.requestMatchers(path).permitAll());
//                            adminRolePaths.forEach(path -> auth.requestMatchers(path).hasRole(CoreConstants.ADMINISTRATOR.ADMIN));
                            auth.anyRequest().permitAll();
                        }
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(exceptionHandlerFilter, CorsFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((_, response, _) ->
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                        )

                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
