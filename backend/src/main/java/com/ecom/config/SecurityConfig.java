package com.ecom.config;

//import com.admin.filter.ExceptionHandlerFilter;
import com.ecom.constant.CoreConstants;
import com.ecom.filter.JwtFilter;
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

        import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;

//    private final ExceptionHandlerFilter exceptionHandlerFilter;

    private final Dotenv dotenv = Dotenv.load();

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        String permittedPathValue = dotenv.get("PERMITTED_PATHS");
        String adminRolePathValue = dotenv.get("ADMIN_ROLE_PATHS");
        String userRolePathValue = dotenv.get("USER_ROLE_PATHS");

        List<String> permittedPaths = splitRolesString(permittedPathValue);
        List<String> adminRolePaths = splitRolesString(adminRolePathValue);
        List<String> userRolePaths = splitRolesString(userRolePathValue);

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                            permittedPaths.forEach(path -> auth.requestMatchers(path).permitAll());
                            adminRolePaths.forEach(path -> auth.requestMatchers(path).hasRole(CoreConstants.ROLE.ADMIN));
                            userRolePaths.forEach(path -> auth.requestMatchers(path).hasRole(CoreConstants.ROLE.USER));
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

    private List<String> splitRolesString(String rolesStr) {
        return rolesStr != null
                ? Arrays.asList(rolesStr.split(","))
                : Collections.emptyList();
    }
}
