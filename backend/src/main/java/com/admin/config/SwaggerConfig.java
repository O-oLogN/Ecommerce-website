package com.admin.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // Define the security scheme
        SecurityScheme securityScheme = new SecurityScheme()
                .name("Authorization")
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        // Add the security scheme to the components
        Components components = new Components().addSecuritySchemes("bearer-key", securityScheme);

        // Apply the security scheme globally
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearer-key");

        return new OpenAPI()
                .components(components)
                .addSecurityItem(securityRequirement)
                .info(new Info()
                        .title("API Documentation")
                        .description("API documentation with JWT authentication")
                        .version("1.0.0"));
    }
}
